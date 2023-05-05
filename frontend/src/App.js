import './css/dashboard/dashboard-light.css';
import React from 'react';
import { useEffect, useState } from 'react';
// import darkStyles from './dashboard.dark.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBell, faClock, faGift, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';

function ApexChart(props) {
  const [Chart, setChart] = useState();
  const hasType = typeof props?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
}

function App() {
  // Initializing theme as light mode
  // const [styles, setStyles] = useState(lightStyles);

  // dark-light mode icon
  const [modeIcon, setModeIcon] = useState("");

  // theme mode
  const [themeMode, setThemeMode] = useState("");

  // top 10 hosts data
  const [topHosts, setTopHosts] = useState({});

  // alarms
  const [alarms, setAlarms] = useState([]);
  const [showAlarms, setShowAlarms] = useState(false);

  // initializing first row card vales
  const [firstRowCardValues, setFirstRowCardValues] = useState({
    alarms: 0,
    packets_bwd: 0,
    packets_fwd: 0,
    uptime: 0
  });

  // Initializing RAM and CPU Utilization 
  const [utilizationValues, setUtilizationValues] = useState({
    ram: 0,
    cpu: 0
  });

  // socket io object
  const [socketIoObject, setSocketIoObject] = useState(null);

  // Data for other line graphs
  const [dataMap, setData] = useState({});

  // chart
  var Charts = (id, title, data, width = 520, height = 315) => <ApexChart
    options={{
      chart: {
        id: id,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
      },
      xaxis: {
        type: 'number',
        range: 100,
        min: 0,
        max: 100,
        labels: {
          show: false
        }
      },
      title: {
        text: title
      },
      noData: {
        text: "NO DATA",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#d4d4d9",
          fontSize: '24px',
          fontFamily: undefined
        }
      },
      theme: {
        mode: themeMode,
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
      yaxis: {
        // min: -100000,
        // max: 100000,
        labels: {
          formatter: (value) => { return value.toFixed(1) },
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
      }
    }}

    series={data}
    height={height}
    width={width}
    type='line'
  />;

  var RadialChart = (id, title, value) => <ApexChart
    options={{
      colors: [value <= 74 ? '#255aee' : 'red'],
      chart: {
        id: id,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: value <= 74 ? '#255aee' : 'red',
              formatter: function (val) {
                return val;
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 4
      },
      labels: [title],
      theme: {
        mode: themeMode,
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
    }}
    height={385}
    series={[value]}
    type='radialBar'
  />;

  var BarCharts = (
    id,
    title,
    name,
    data,
    plotOptions = {},
    xaxis = {
      type: 'number',
      range: 10,
      min: 0,
      max: 10
    },
    height = 310
  ) => <ApexChart
      options={{
        chart: {
          id: id,
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
        },

        noData: {
          text: "NO DATA",
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#d4d4d9",
            fontSize: '24px',
            fontFamily: undefined
          }
        },
        xaxis: xaxis,
        plotOptions: plotOptions,
        theme: {
          mode: themeMode,
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          },
        },
        title: {
          text: title
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 2,
          dashArray: 0,
        }
      }}

      series={data}
      width={800}
      height={height}
      type='bar'
    />;

  var setCss = (themeMode) => {
    if (themeMode === "dark-mode") {
      window.document.querySelector(".outtermost-container").style.backgroundColor = "#20244C";
      window.document.querySelector(".title-text").style.color = "white";
      window.document.querySelector(".top-nav").style.backgroundColor = "#141B34";
      window.document.querySelector(".dark-light-button").style.backgroundColor = "white";
      window.document.querySelector(".dark-light-button").style.color = "#141B34";
      window.document.querySelector(".bread-crumbs").style.color = "white";
      window.document.querySelectorAll(".first-row-card").forEach(element => {
        element.style.backgroundColor = "#141B34";
        element.style.color = "white";
      });
      window.document.querySelectorAll(".second-row-card").forEach(element => {
        element.style.backgroundColor = "#141B34";
        element.style.color = "white";
      });
      window.document.querySelectorAll(".third-row-card").forEach(element => {
        element.style.backgroundColor = "#141B34";
        element.style.color = "white";
      });
      window.document.querySelectorAll(".icon-holder").forEach(element => {
        element.style.backgroundColor = "#20244C";
        element.style.color = "white";
      });

      window.document.querySelectorAll(".card-title").forEach(element => {
        element.style.color = "white";
      });
    } else if (themeMode === "light-mode") {
      window.document.querySelector(".outtermost-container").style.backgroundColor = "#f5f5f8";
      window.document.querySelector(".title-text").style.color = "#141B34";
      window.document.querySelector(".top-nav").style.backgroundColor = "white";
      window.document.querySelector(".dark-light-button").style.backgroundColor = "#141B34";
      window.document.querySelector(".dark-light-button").style.color = "white";
      window.document.querySelector(".bread-crumbs").style.color = "#141B34";
      window.document.querySelectorAll(".first-row-card").forEach(element => {
        element.style.backgroundColor = "white";
        element.style.color = "#141B34";

      });
      window.document.querySelectorAll(".second-row-card").forEach(element => {
        element.style.backgroundColor = "white";
        element.style.color = "#141B34";
      });
      window.document.querySelectorAll(".third-row-card").forEach(element => {
        element.style.backgroundColor = "white";
        element.style.color = "#141B34";
      });
      window.document.querySelectorAll(".icon-holder").forEach(element => {
        element.style.backgroundColor = "#f5f5f8";
        element.style.color = "#141B34";
      });

      window.document.querySelectorAll(".card-title").forEach(element => {
        element.style.color = "#141B34";
      });
    }

  }

  // theme changer
  var themeChanger = () => {
    let theme = window.localStorage.getItem('iseeu-theme');

    if (theme === null || theme === 'light-mode') {
      window.localStorage.setItem('iseeu-theme', 'dark-mode');
      setCss("dark-mode");
      window.document.getElementById('theme-btn-text').textContent = 'Light mode';
      setModeIcon(faSun);
      setThemeMode('dark');

      window.document.body.setAttribute("bgcolor", "#20244C")
    } else {
      window.localStorage.setItem('iseeu-theme', 'light-mode');
      setCss("light-mode")
      window.document.getElementById('theme-btn-text').textContent = 'Dark mode';
      setModeIcon(faMoon);
      setThemeMode('light');

    }
  }

  // theme initializer
  var themeInitializer = () => {
    let theme = window.localStorage.getItem('iseeu-theme');

    if (theme === null || theme === 'light-mode') {
      window.localStorage.setItem('iseeu-theme', 'light-mode');
      setCss('light-mode');
      window.document.getElementById('theme-btn-text').textContent = 'Dark mode';
      setModeIcon(faMoon);
      setThemeMode('light');

    } else {
      window.localStorage.setItem('iseeu-theme', 'dark-mode');
      setCss('dark-mode');
      window.document.getElementById('theme-btn-text').textContent = 'Light mode';
      setModeIcon(faSun);
      setThemeMode('dark');
    }
  }

  // Defining function to handle socket
  var socketHandler = () => {
    var socket = window.io("http://127.0.0.1:3001/data-streamer")
    // listening for keys to start connect
    window.onkeydown = (event) => {
      console.log(event);
      
      if (event.metaKey && event.shiftKey && event.key === 's') {
        socket.connect();

        console.log(socket);
        setSocketIoObject(socket);
        socket.on("connect", () => {
          console.log("Connected to server...");
          setSocketIoObject(socket);
        });

        socket.on("connect_error", () => {
          console.log("Connection to server failed...");
          socket.disconnect();
          setSocketIoObject(null);
        });

        socket.on("disconnect", () => {
          console.log("Disconnected from server...");
          setSocketIoObject(null);
        });
        socket.on("data-stream", (dataObj) => {
          // parsing data from str to json
          try {
            var data = JSON.parse(dataObj.data);
            // Updating row one Card values
            setFirstRowCardValues({
              alarms: data.alarms,
              packets_bwd: data.packets_bwd,
              packets_fwd: data.packets_fwd,
              uptime: data.uptime
            });

            // updating utilization values
            setUtilizationValues({ ram: data.ram, cpu: data.cpu });

            // updating top 10 host data
            setTopHosts(data['top-10-hosts']);

            // updating data
            setData(data.data);

            // send alert
            if (data['malicious-class'] !== null) {
              alertHandler(data);
            }
          } catch (error) {
            console.log(error);
          }
        });
      } else if (event.metaKey && event.shiftKey && event.key === 'e') {
        console.log("Disconnect");
        socket.emit("disconnect_client");
        socket.disconnect();
      }
    }

  }

  var alertHandler = (data) => {
    // checking whether email
    console.log(data['alamrs'] + 1);
    console.log(parseInt(localStorage.getItem("alert-id")));
    console.log(data['alarms'] + 1 === parseInt(localStorage.getItem("alert-id")));
    if (data['alarms'] + 1 === parseInt(localStorage.getItem("alert-id"))) return

    console.log("Here");
    console.log(data);
    fetch("http://127.0.0.1:3001/alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "number": data['alarms'],
        "attacktype": data['malicious-class'],
        "datetime": new Date()
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Email sent");
        console.log(data);
      }).catch(error => console.log(error));

    localStorage.setItem("alert-id", data['alarms'] + 1);
  }


  useEffect(() => {
    themeInitializer();
    try {
      socketHandler();
    } catch (error) {
      console.log(error);
    }

    // alarms card click event handler
    let alarmCard = document.querySelector(".alarms");
    alarmCard.onclick = () => {
      console.log("Alarms");
      setShowAlarms(!showAlarms);

      // fetch alarms
      fetch("http://127.0.0.1:3001/alarms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Email sent");
          console.log(data);
          setAlarms(data);
        }).catch(error => console.log(error));

    }
  }, []);

  return (
    <div className="outtermost-container">
      <div className="top-nav">
        <div className="top-nav-left">
          <div className="bread-crumbs">
            {/* <Image width={50} height={20} className={styles.eye_logo} src="https://static.vecteezy.com/system/protected/files/009/393/680/vecteezy_eye-icon-sign-symbol-design_9393680_670.png" alt="eye-image" /> */}
            <FontAwesomeIcon icon={faEye} size='xl' />
            {/* <img alt="__" className={styles.eye_logo} src="https://static.vecteezy.com/system/protected/files/011/015/345/vecteezy_security-concept-secure-information-3d-render-personal-data_11015345_332.png" alt="eye-image" /> */}
          </div>
          <div className="title-text" onClick={() => { window.location = "http://localhost:3000/" }}>ISEEU</div>
        </div>
        <div className="top-nav-right">
          <div id='theme-btn' className="dark-light-button"
            onClick={themeChanger}>
            <div id="theme-btn-icon">
              <FontAwesomeIcon icon={modeIcon} />
            </div>
            <div className="dark-list-btn-text" id="theme-btn-text">Dark mode</div>
          </div>
        </div>
      </div>
      <div className="main-body">
        {/* First row */}
        <div className="container-fluid first-row-container">
          <div className="row">
            {/* Card 1 start */}
            <div className="col-lg-3">
              <div className="first-row-card alarms">
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faBell} />
                </div>
                <div className="card-value">{firstRowCardValues.alarms.toString().padStart(2, '0')}</div>
                <div className="card-title">ALARMS</div>
              </div>
            </div>
            {/* Card 1 end */}
            {/* Card 1 start */}
            <div className=" col-lg-3">
              <div className="first-row-card">
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faGift} />
                </div>
                <div className="card-value">{firstRowCardValues.packets_fwd.toString().padStart(2, '0')}</div>
                <div className="card-title">PACKETS (fwd)</div>
              </div>
            </div>
            {/* Card 1 end */}
            {/* Card 1 start */}
            <div className="col-lg-3">
              <div className="first-row-card">
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faGift} />
                </div>
                <div className="card-value">{firstRowCardValues.packets_bwd.toString().padStart(2, '0')}</div>
                <div className="card-title">PACKETS (bwd)</div>
              </div>
            </div>
            {/* Card 1 end */}
            {/* Card 1 start */}
            <div className="col-lg-3">
              <div className="first-row-card">
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="card-value">{(new Date(firstRowCardValues.uptime.toString()).getMinutes() / 60).toFixed(1)}</div>
                <div className="card-title">UPTIME (hours)</div>
              </div>
            </div>
            {/* Card 1 end */}
          </div>
        </div>

        {/* Second row */}
        <div className="second-row-container container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="second-row-card">
                {Charts("AveragePacketSize", "AVERAGE PACKET SIZE", [{ name: "AveragePacketSize", data: dataMap.AveragePacketSize != null ? Object.values(dataMap.AveragePacketSize).slice(-100) : [] }])}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="second-row-card">
                {Charts("BwdPacketLengthMax", "BACKWARD PACKET LENGTH MAX", [{ name: "BwdPacketLengthMax", data: dataMap.BwdPacketLengthMax != null ? Object.values(dataMap.BwdPacketLengthMax).slice(-100) : [] }])}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="second-row-card">
                {Charts("BwdPacketLengthMean", "BACKWARD PACKET LENGTH MEAN", [{ name: "BwdPacketLengthMean", data: dataMap.BwdPacketLengthMean != null ? Object.values(dataMap.BwdPacketLengthMean).slice(-100) : [] }])}
              </div>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="third-row-container container-fluid">
          <div className="row">
            {/* left */}
            <div className="third-row-left-container col-lg-6 container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="third-row-card">
                    {Charts("Init_Win_bytes_forward", "INIT WIN BYTES FORWARD", [{ name: "Init_Win_bytes_forward", data: dataMap.Init_Win_bytes_forward != null ? Object.values(dataMap.Init_Win_bytes_forward).slice(-100) : [] }], 800, 322)}
                  </div>
                </div>
                <div className="col-12">
                  <div className="third-row-card">
                    {Charts("PacketLengthVariance", "PACKET LENGTH VARIANCE", [{ name: "PacketLengthVariance", data: dataMap.PacketLengthVariance != null ? Object.values(dataMap.PacketLengthVariance).slice(-100) : [] }], 800, 322)}
                  </div>
                </div>
                <div className="col-12">
                  <div className="third-row-card">
                    {BarCharts("TotalBackwardPackets/TotalFwdPackets", "TOTAL BACKWARD AND FORWARD PACKETS", "TotalBackwardPackets/TotalFwdPackets", [
                      {
                        name: "TotalBackwardPackets",
                        data: dataMap.TotalBackwardPackets != null ? Object.values(dataMap.TotalBackwardPackets).slice(-10) : []
                      },
                      {
                        name: "TotalFwdPackets",
                        data: dataMap.TotalFwdPackets != null ? Object.values(dataMap.TotalFwdPackets).slice(-10) : []
                      }
                    ])}
                  </div>
                </div>
                <div className="col-12">
                  <div className="third-row-card">
                    {Charts("TotalLengthofBwdPackets", "TOTAL LENGTH OF BACKWARD PACKETS", [{ name: "TotalLengthofBwdPackets", data: dataMap.TotalLengthofBwdPackets != null ? Object.values(dataMap.TotalLengthofBwdPackets).slice(-100) : [] }], 800, 310)}

                  </div>
                </div>
              </div>
            </div>


            {/* Right */}
            <div className="third-row-right-container col-lg-6">

              {/* Third row (tr) first row */}
              <div style={{ paddingLeft: 0 }} className="tr-right-first-row container-fluid">
                <div className="row">
                  <div style={{ paddingRight: 0 }} className="col-lg-6">
                    <div className="third-row-card">
                      {RadialChart("ram-utilization", "RAM Utilization", utilizationValues.ram.toString().padStart(2, '0'))}
                    </div>
                  </div>
                  <div style={{ margin: 0, paddingRight: 0 }} className="col-lg-6">
                    <div className="third-row-card">
                      {RadialChart("cpu-utilization", "CPU Utilization", utilizationValues.cpu.toString().padStart(2, '0'))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ paddingLeft: 0, paddingRight: "12px" }} className="container-fluid">
                <div className="row">
                  {/* tr second row */}
                  <div className="col-12">
                    <div className="third-row-card">
                      {
                        BarCharts(
                          "top-hosts",
                          "TOP 10 HOSTS",
                          "Requests",
                          [{ name: 'top-hosts', data: Object.values(topHosts) }],
                          { bar: { borderRadius: 4, horizontal: true } },
                          {
                            categories: Object.keys(topHosts),
                          },
                          322
                        )
                      }
                    </div>
                  </div>

                  {/* tr third row */}
                  <div className="col-12">
                    <div className="third-row-card">
                      {Charts("FlowBytes/FlowPackets", "FLOW BYTES AND FLOW PACKETS", [
                        {
                          name: "FlowBytes",
                          data: dataMap['FlowBytes/s'] != null ? Object.values(dataMap['FlowBytes/s']).slice(-100) : []
                        },
                        {
                          name: "FlowPackets",
                          data: dataMap['FlowPackets/s'] != null ? Object.values(dataMap['FlowPackets/s']).slice(-100) : []
                        }
                      ], 800, 310)}
                    </div>
                  </div>

                  {/* tr fourth row */}
                  <div className="col-12">
                    <div className="third-row-card">
                      {BarCharts("AveragePacketSize/Down/UpRatio", "AVERAGE PACKET SIZE AND DOWN/UP RATIO", "AveragePacketSize/Down/UpRatio", [
                        {
                          name: "AveragePacketSize",
                          data: dataMap.AveragePacketSize != null ? Object.values(dataMap.AveragePacketSize).slice(-10) : []
                        },
                        {
                          name: "Down/UpRatio",
                          data: dataMap['Down/UpRatio'] != null ? Object.values(dataMap['Down/UpRatio']).slice(-10) : []
                        }
                      ])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAlarms &&
        <div className="alarms-dim-bg">
          <div className="alarms-container">
            <div className="alarms-container-header">
              <div className="alarms-title">Alarms</div>
              <div className="alarms-count">{alarms.length.toString().padStart(2, '0')}</div>
            </div>
            <div className="alarms-holder">

              {/* No alarms */}
              {alarms.length === 0 && <div>No Data</div>}

              {/* Alarm card start */}
              {
                alarms.map(alarm => {
                  return (
                    <div className="alarm-card">
                      <div className="alarm-number">{alarm.number.toString().padStart(2, '0')}</div>
                      <div className="alarm-card-left">
                        <div className="alarm-attacktype">{alarm.attachtype}</div>
                        <div className="alarm-datetime">{new Date(alarm.datetime).toDateString()}</div>
                      </div>
                      <div className="alarm-status">
                        <FontAwesomeIcon style={{ color: "#f54242" }} icon={faWarning} />
                      </div>
                    </div>
                  );
                })
              }
              {/* Alarm card end */}
            </div>
            <div className="close-btn btn btn-dark align-right" onClick={() => { setShowAlarms(false) }}>
              CLOSE
            </div>
          </div>
        </div>}

    </div>
  );
}

export default App;
