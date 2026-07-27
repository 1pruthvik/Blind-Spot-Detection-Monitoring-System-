import serial
import requests
import re
import time

SERIAL_PORT = "COM5"      # Change this
BAUD_RATE = 115200

ser = serial.Serial(SERIAL_PORT, BAUD_RATE)

pattern = r"A:(\d+\.?\d*) B:(\d+\.?\d*) C:(\d+\.?\d*)"

print("Listening...")

while True:

    line = ser.readline().decode(errors="ignore").strip()

    print(line)

    m = re.search(pattern, line)

    if not m:
        continue

    A = float(m.group(1))
    B = float(m.group(2))
    C = float(m.group(3))

    requests.post(
        "http://127.0.0.1:8001/sensor",
        json={
            "sensorA": A,
            "sensorB": B,
            "sensorC": C
        },
        timeout=2
    )