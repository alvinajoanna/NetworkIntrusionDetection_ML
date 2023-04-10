"""
This program is responsible for performing ISEEU backend operations;
- Data streaming and data aggregation.
- Model deployment.
- Alert sender.
"""

from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
import json
import datetime
import pandas as pd
import random
from iseeu_modules.alert_sender import alert_emailer

# instantiating flask application
app = Flask("iseeu")

# handling cross origin resource access
CORS(app)

# Wrapping app with socket
socket = SocketIO(app, cors_allowed_origins="*")

# listening to request form client to create a socket
@socket.on("connect", namespace="/data-streamer")
def handle_client_connect():
    """
    Handles the client's (frontend) request to initiate a socket. After the socket is successfully
    created, a background task i started to continuously stream data to the client (frontend).
    """
    
    print("Client connected")

    # start streaming data
    # socket.start_background_task(data_streamer)

# data streamer
def data_streamer():
    """
    Aggregating and Streaming data to the front end after every 5 seconds.

    - Read data from excel file
    - Aggregate data
    - Convert data to json format
    - Send data to frontend
    """

    # loading dataset
    dataset = pd.read_csv("data/dataset.csv")
    
    # tracks the current number of packets/records sent
    number_of_records = 1
    while True:
        # read from alarm file
        alarm = pd.read_csv("data/alarm.csv").shape[0]

        # Frequency distribution of source IP
        top_10_hosts = dataset['SourceIP'].iloc[ : number_of_records].value_counts().sort_values(ascending=False)[:10].to_dict()

        # dataset to be sent
        selected_cols = [
            'TotalFwdPackets', 'TotalBackwardPackets','PacketLengthStd', 
            'PacketLengthVariance', 'Init_Win_bytes_forward', 'BwdPacketLengthMax', 
            'AveragePacketSize', 'PacketLengthStd', 'PacketLengthMean', 
            'BwdPacketLengthMean', 'Down/UpRatio', 'AveragePacketSize',
            'FlowBytes/s', 'FlowPackets/s', 'TotalLengthofFwdPackets',
            'TotalLengthofBwdPackets'
            ]
        dataset_to_be_emitted = dataset[selected_cols].iloc[ : number_of_records]

        # sending data to the fronted
        socket.emit("data-stream", {
            "alarms": alarm,
            "packets_fwd": str(dataset_to_be_emitted['TotalFwdPackets'].sum()),
            "packets_bwd": str(dataset_to_be_emitted['TotalBackwardPackets'].sum()),
            "uptime": str(datetime.datetime.now()),
            "top-10-hosts": top_10_hosts,
            "data": dataset_to_be_emitted.to_dict(),
            "ram": random.randint(50, 100),
            "cpu": random.randint(50, 100)
        }, namespace="/data-streamer")

        socket.sleep(5)
        number_of_records += 1

# Classification of records
@app.route("/model", methods=['POST'])
def model():
    """
    Receives a record from the front end and classify's the record.
    Return: return_description
    """

    # retrieving data from client
    data = json.loads(request.data.decode("utf8").replace("'", '"'))

    # add model.predict here

    print(data)
    return True


# sends alert to admin
@app.route("/alert", methods=['POST'])
def alert_sender():
    """
    Receives a trigger with information to send alerts
    Return: return_description
    """

    # retrieving data from client
    data = json.loads(request.data.decode("utf8").replace("'", '"'))
    print(data)

    # return alert_emailer(data)
    return "Email Sent"

# Route for handing data streaming
@app.route("/", methods=["GET"])
@cross_origin()
def home():
    return "Server active and running :)"


# executing app with debug mode turned on
socket.run(app, port=5001, host="0.0.0.0")