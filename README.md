# Blind-Spot-Detection-Monitoring-System
 Blind Spot Detection & Monitoring System

A Full-Stack IoT-Based Blind Spot Detection System using Arduino, FastAPI, React, Vite, and Material UI for Real-Time Vehicle Safety Monitoring.
<img width="1919" height="897" alt="Screenshot 2026-07-28 021507" src="https://github.com/user-attachments/assets/7f97e897-d75d-4359-a4da-f464a57c2242" />

<img width="1668" height="858" alt="Screenshot 2026-07-27 134407" src="https://github.com/user-attachments/assets/decbda9a-b4f1-492e-a1f4-2d16db5fe495" />

<img width="1652" height="841" alt="Screenshot 2026-07-27 134430" src="https://github.com/user-attachments/assets/2bab7779-3490-4931-a854-a7c073c9c68e" />
<img width="1712" height="819" alt="Screenshot 2026-07-27 134445" src="https://github.com/user-attachments/assets/c4225a74-b529-47e6-8697-282fa3e76939" />



<img width="683" height="857" alt="Screenshot 2026-07-28 024047" src="https://github.com/user-attachments/assets/e4359c0a-5551-4b86-98eb-87fd10fe1678" />







Overview

Blind Spot Detection & Monitoring System is an IoT-enabled vehicle safety solution designed to assist drivers in detecting vehicles or obstacles located in their blind spots. The system combines ultrasonic sensors, an Arduino-based controller, a FastAPI backend, and a React dashboard to provide real-time monitoring, visual alerts, analytics, and historical sensor data.

Unlike traditional blind spot indicators, this project also supports live monitoring, sensor analytics, historical logging, and a responsive dashboard suitable for demonstrations, research, and educational purposes.

Key Features
🚗 Real-Time Blind Spot Detection
📡 Three Ultrasonic Sensor Monitoring
🔴 Visual LED Alerts
🔊 Audio Buzzer Warning
📈 Live Distance Charts
📊 Analytics Dashboard
📋 Historical Data Table
💾 CSV Data Logging
📤 Export Sensor Data
🌐 FastAPI REST API
⚡ WebSocket Support
🎨 Modern Material UI Dashboard
📱 Responsive User Interface
🚦 Traffic Mode Detection (Optional Enhancement)
System Architecture
                     Blind Spot Detection System

               +------------------------------+
               |  HC-SR04 Ultrasonic Sensors  |
               +--------------+---------------+
                              |
                       Distance Measurement
                              |
                              ▼
                  +-----------------------+
                  |       Arduino         |
                  |-----------------------|
                  | Read Sensors          |
                  | Blind Spot Logic      |
                  | Traffic Detection     |
                  | LED & Buzzer Control  |
                  | Send Sensor Data      |
                  +-----------+-----------+
                              |
                       Serial / USB
                              |
                              ▼
                  +-----------------------+
                  |     FastAPI Server    |
                  |-----------------------|
                  | Receive Sensor Data   |
                  | Store CSV             |
                  | REST APIs             |
                  | WebSocket             |
                  +-----------+-----------+
                              |
                     HTTP / WebSocket
                              |
                              ▼
                  +-----------------------+
                  | React + Vite Frontend |
                  |-----------------------|
                  | Dashboard             |
                  | Analytics             |
                  | Live Charts           |
                  | History Table         |
                  +-----------------------+
Technology Stack
Embedded System
Arduino Mega / Uno
HC-SR04 Ultrasonic Sensors
LEDs
Piezo Buzzer

Programming Language

C++
Backend
Python
FastAPI
Uvicorn
Pandas
WebSockets

Responsibilities

Receive sensor data
Store sensor history
Read CSV
Convert data into JSON
Serve REST APIs
Real-time WebSocket communication
Frontend
React
Vite
Material UI
Axios
JavaScript (ES6)
JSX

Responsibilities

Live Dashboard
Sensor Monitoring
Charts
Vehicle Visualization
Notifications
Export Data
Storage
CSV File

Current storage format:

Timestamp
SensorA
SensorB
SensorC
Status
Project Structure
BlindSpotDetection/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── data/
│   │     sensor_data.csv
│   └── ...
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   │      SensorCard.jsx
│   │      StatusCard.jsx
│   │      AnalyticsCards.jsx
│   │      HistoryTable.jsx
│   │      LiveChart.jsx
│   │      VehicleVisualization.jsx
│   │      NotificationPanel.jsx
│   │      CloudStatus.jsx
│   │      ExportButton.jsx
│   │
│   ├── pages/
│   │      Dashboard.jsx
│   │
│   ├── services/
│   │      api.js
│   │      websocket.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── Arduino/
│      BlindSpotDetection.ino
│
└── README.md
Working Principle
Step 1

Three ultrasonic sensors continuously measure the distance between the vehicle and nearby obstacles.

↓

Step 2

The Arduino processes the sensor readings and determines whether the surroundings are:

SAFE
WARNING
DANGER

↓

Step 3

Depending on the detected risk level:

Green LED indicates safe conditions.
Yellow LED indicates caution.
Red LED and buzzer indicate a dangerous blind spot.

↓

Step 4

Sensor readings are transmitted to the FastAPI backend through serial communication (or simulated input during development).

↓

Step 5

The backend stores every reading inside a CSV file and exposes REST APIs and WebSocket endpoints.

↓

Step 6

The React dashboard retrieves the latest sensor readings and displays:

Live sensor values
Blind spot status
Vehicle visualization
Historical logs
Analytics
Charts
Dashboard Features
Live Sensor Cards

Displays:

Sensor A
Sensor B
Sensor C
Status Card

Shows

SAFE
WARNING
DANGER
Analytics

Displays

Average Distance
Nearest Object
Objects Detected
System Uptime
Live Chart

Real-time visualization of sensor distances.

Vehicle Visualization

Graphical representation of surrounding obstacles.

History Table

Displays all previous sensor readings with timestamps.

CSV Export

Download sensor history for further analysis.
hmmm
