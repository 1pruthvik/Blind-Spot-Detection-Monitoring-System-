from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from pathlib import Path
from datetime import datetime
import json
print("************ MY UPDATED BACKEND IS RUNNING ************")

# =====================================================
# FastAPI App
# =====================================================

app = FastAPI(
    title="Blind Spot Detection API",
    version="1.0",
    description="Backend Server for Blind Spot Detection System"
)

# =====================================================
# CORS
# =====================================================

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    

# =====================================================
# Paths
# =====================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_FOLDER = BASE_DIR / "data"
DATA_FOLDER.mkdir(exist_ok=True)

DATA_FILE = DATA_FOLDER / "sensor_data.csv"

# =====================================================
# Create CSV if missing
# =====================================================

if not DATA_FILE.exists():
    df = pd.DataFrame(columns=[
        "Timestamp",
        "SensorA",
        "SensorB",
        "SensorC",
        "Status"
    ])
    df.to_csv(DATA_FILE, index=False)

# =====================================================
# Sensor Model
# =====================================================

class SensorData(BaseModel):
    sensorA: float
    sensorB: float
    sensorC: float

# =====================================================
# Connected WebSocket Clients
# =====================================================

clients = []

# =====================================================
# Home
# =====================================================

@app.get("/")
def home():
    return {
        "message": "Blind Spot Detection Backend Running"
    }

# =====================================================
# Status Logic
# =====================================================

def calculate_status(a, b, c):

    if a < 30 or b < 30 or c < 30:
        return "DANGER"

    elif a < 50 or b < 50 or c < 50:
        return "WARNING"

    return "SAFE"

# =====================================================
# Receive Sensor Data
# =====================================================

@app.post("/sensor")
async def receive_sensor_data(data: SensorData):

    status = calculate_status(
        data.sensorA,
        data.sensorB,
        data.sensorC
    )

    row = {
        "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "SensorA": data.sensorA,
        "SensorB": data.sensorB,
        "SensorC": data.sensorC,
        "Status": status
    }

    pd.DataFrame([row]).to_csv(
        str(DATA_FILE),
        mode="a",
        header=False,
        index=False
    )

    disconnected_clients = []

    for client in clients:
        try:
            await client.send_text(json.dumps(row))
        except Exception:
            disconnected_clients.append(client)

    for client in disconnected_clients:
        if client in clients:
            clients.remove(client)

    return {
        "success": True,
        "status": status,
        "data": row
    }

# =====================================================
# History
# =====================================================

@app.get("/history")
def history():
    try:
        if not DATA_FILE.exists():
            return []

        df = pd.read_csv(DATA_FILE)

        if df.empty:
            return []

        df = df.fillna(0)

        return df.tail(100).to_dict(orient="records")

    except Exception as e:
        print("History Error:", e)
        return []
# =====================================================
# WebSocket
# =====================================================

# =====================================================
# WebSocket
# =====================================================

import asyncio

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()
    clients.append(websocket)

    try:
        while True:
            await asyncio.sleep(1)

    except WebSocketDisconnect:
        if websocket in clients:
            clients.remove(websocket)

    except Exception:
        if websocket in clients:
            clients.remove(websocket)