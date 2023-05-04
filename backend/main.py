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
from joblib import load

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
    socket.start_background_task(data_streamer)

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
        selected_cols_for_frontend = [
            'TotalFwdPackets', 'TotalBackwardPackets','PacketLengthStd', 
            'PacketLengthVariance', 'Init_Win_bytes_forward', 'BwdPacketLengthMax', 
            'AveragePacketSize', 'PacketLengthMean', 
            'BwdPacketLengthMean', 'Down/UpRatio',
            'FlowBytes/s', 'FlowPackets/s', 'TotalLengthofFwdPackets',
            'TotalLengthofBwdPackets', 'BwdPacketLengthStd'
            ]
        dataset_to_be_emitted = dataset.iloc[ : number_of_records]

        # prediction
        selected_cols_for_prediction = [
            'DestinationPort',
            'ACKFlagCount',
            'FlowPackets/s',
            'FwdIATTotal',
            'FlowPackets/s',
            'FwdIATMean',
            'PacketLengthVariance',
            'FlowDuration',
            'FlowIATMax',
            'BwdPacketLengthStd',
            'FwdIATStd',
            'BwdPackets/s',
            'FlowIATStd',
            'Init_Win_bytes_forward'
        ]

        # loading models
        binary_model = load("/Users/yobahbertrandyonkou/Projects/standarddeviants/backend/models/iseeu_binary.pickle")
        multiclass_model = load("/Users/yobahbertrandyonkou/Projects/standarddeviants/backend/models/iseeu_multiclass.pickle")

        # binary prediction
        binary_prediction = binary_model.predict(dataset_to_be_emitted[selected_cols_for_prediction].iloc[-1].values.reshape(1, -1))
        print(binary_prediction, dataset_to_be_emitted.Label.values[-1])
        
        # checking whether data is malicious or not
        multiclass_prediction = None
        if binary_prediction[0] == "MALICIOUS":
            multiclass_prediction = multiclass_model.predict(dataset_to_be_emitted[selected_cols_for_prediction].iloc[-1].values.reshape(1, -1))
            print("Multiclass - ", multiclass_prediction, dataset_to_be_emitted.Label.values[-1])

        # compiling data to be sent
        data = {
            "alarms": alarm,
            "packets_fwd": str(dataset_to_be_emitted['TotalFwdPackets'].sum()),
            "packets_bwd": str(dataset_to_be_emitted['TotalBackwardPackets'].sum()),
            "uptime": str(datetime.datetime.now()),
            "top-10-hosts": top_10_hosts,
            "data": dataset_to_be_emitted[selected_cols_for_frontend].round(2).to_dict(),
            "ram": random.randint(50, 100),
            "cpu": random.randint(50, 100),
            "binary-class": binary_prediction[0],
            "malicious-class": multiclass_prediction[0] if multiclass_prediction != None else None
        }

        # sending data to the fronted
        socket.emit("data-stream", { "data": json.dumps(data)}, namespace="/data-streamer")

        socket.sleep(1)
        print(number_of_records)
        number_of_records += 1

# disconnecting socket
@socket.on("disconnect_client", namespace="/data-streamer")
def disconnect_client():
    print("Disconnecting")
    socket.stop()


# sends alert to admin
@app.route("/alert", methods=['POST'])
@cross_origin()
def alert_sender():
    """
    Receives a trigger with information to send alerts
    Return: return_description
    """

    # send alert
    data = json.loads(request.data.decode("utf8").replace("'", '"'))
    data["sendto"] = "ybertrandyonkou@gmail.com"
    data[ "severity"] = "high"
    print(data)

    # write alarm
    alarms = open("/Users/yobahbertrandyonkou/Projects/standarddeviants/backend/data/alarm.csv", "a")
    alarms.write(f"{data['number'] + 1},{data['sendto']},{data['severity']},{data['attacktype']},{data['datetime']},pending\n")
    alarms.close()
    
    return alert_emailer(data)
    # return "Email Sent"

# sends alert to admin
@app.route("/alarms", methods=['GET'])
@cross_origin()
def alarm_handler():
    """
    Request for all alarms.
    Return: alarms ordered by status and datetime
    """

    # reading alarms
    alarms = pd.read_csv("/Users/yobahbertrandyonkou/Projects/standarddeviants/backend/data/alarm.csv")
    
    return alarms.sort_values(['datetime', 'status']).to_dict("records")

# Route for handing data streaming
@app.route("/", methods=["GET"])
@cross_origin()
def home():
    return "Server active and running :)"

# executing app with debug mode turned on
socket.run(app, port=3001, host="0.0.0.0", debug=True)