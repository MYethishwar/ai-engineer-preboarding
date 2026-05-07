from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# ============ SETUP ============

app = FastAPI(title="VoltStream API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ MOCK DATA ============

dashboard_data = {
    "grid_power_kw": 3.4,
    "solar_generation_kw": 2.1,
    "net_consumption_kw": 1.3,
    "battery_percent": 72,
    "today_usage_kwh": 14.8,
    "today_solar_kwh": 9.2,
    "today_cost_inr": 142.5,
    "co2_saved_kg": 4.6,
    "grid_status": "connected",
    "solar_status": "active",
}

analytics_data = {
    "daily": [
        {"label": "Mon", "usage": 12.4, "solar": 8.1, "cost": 118},
        {"label": "Tue", "usage": 15.2, "solar": 9.4, "cost": 142},
        {"label": "Wed", "usage": 11.8, "solar": 7.6, "cost": 108},
        {"label": "Thu", "usage": 14.1, "solar": 8.9, "cost": 132},
        {"label": "Fri", "usage": 16.3, "solar": 10.2, "cost": 156},
        {"label": "Sat", "usage": 18.7, "solar": 11.4, "cost": 178},
        {"label": "Sun", "usage": 17.2, "solar": 10.8, "cost": 164},
    ],
    "weekly": [
        {"label": "Week 1", "usage": 98.2, "solar": 62.1, "cost": 934},
        {"label": "Week 2", "usage": 104.5, "solar": 68.4, "cost": 996},
        {"label": "Week 3", "usage": 91.8, "solar": 59.2, "cost": 874},
        {"label": "Week 4", "usage": 112.3, "solar": 72.6, "cost": 1068},
    ],
    "monthly": [
        {"label": "Jan", "usage": 420, "solar": 260, "cost": 3990},
        {"label": "Feb", "usage": 380, "solar": 240, "cost": 3610},
        {"label": "Mar", "usage": 410, "solar": 280, "cost": 3895},
        {"label": "Apr", "usage": 390, "solar": 310, "cost": 3705},
        {"label": "May", "usage": 445, "solar": 340, "cost": 4228},
        {"label": "Jun", "usage": 480, "solar": 360, "cost": 4560},
    ]
}

devices_data = [
    {"id": 1, "name": "Air Conditioner", "room": "Living Room", "power_w": 1500, "status": True,  "icon": "ac"},
    {"id": 2, "name": "Air Conditioner", "room": "Bedroom",     "power_w": 1200, "status": False, "icon": "ac"},
    {"id": 3, "name": "Ceiling Fan",     "room": "Living Room", "power_w": 75,   "status": True,  "icon": "fan"},
    {"id": 4, "name": "Ceiling Fan",     "room": "Bedroom",     "power_w": 75,   "status": True,  "icon": "fan"},
    {"id": 5, "name": "Washing Machine", "room": "Utility",     "power_w": 500,  "status": False, "icon": "washer"},
    {"id": 6, "name": "Refrigerator",    "room": "Kitchen",     "power_w": 150,  "status": True,  "icon": "fridge"},
    {"id": 7, "name": "Water Heater",    "room": "Bathroom",    "power_w": 2000, "status": False, "icon": "heater"},
    {"id": 8, "name": "TV",              "room": "Living Room", "power_w": 120,  "status": True,  "icon": "tv"},
]

billing_data = {
    "current_month_kwh": 312.4,
    "current_month_cost_inr": 2968,
    "projected_month_cost_inr": 3850,
    "last_month_cost_inr": 3420,
    "budget_inr": 4000,
    "budget_used_percent": 74,
    "solar_savings_inr": 890,
    "rate_per_kwh": 9.5,
    "breakdown": [
        {"category": "Air Conditioning", "kwh": 124.8, "cost_inr": 1186, "percent": 40},
        {"category": "Water Heating",    "kwh": 62.4,  "cost_inr": 593,  "percent": 20},
        {"category": "Refrigeration",    "kwh": 46.8,  "cost_inr": 445,  "percent": 15},
        {"category": "Lighting",         "kwh": 31.2,  "cost_inr": 297,  "percent": 10},
        {"category": "Other Appliances", "kwh": 46.8,  "cost_inr": 445,  "percent": 15},
    ]
}

# ============ MODELS ============

class DeviceUpdate(BaseModel):
    status: bool

# ============ ROUTES ============

@app.get("/")
def root():
    return {"message": "VoltStream API is running!"}

@app.get("/dashboard")
def get_dashboard():
    """Returns live dashboard metrics"""
    return dashboard_data

@app.get("/analytics")
def get_analytics(period: str = "daily"):
    """Returns energy analytics for daily, weekly, or monthly period"""
    if period not in analytics_data:
        return {"error": "Invalid period. Use daily, weekly, or monthly"}
    return {"period": period, "data": analytics_data[period]}

@app.get("/devices")
def get_devices():
    """Returns all smart devices and their current status"""
    return devices_data

@app.patch("/devices/{device_id}")
def update_device(device_id: int, update: DeviceUpdate):
    """Toggle device ON or OFF"""
    for device in devices_data:
        if device["id"] == device_id:
            device["status"] = update.status
            return {"message": f"Device {device_id} updated", "device": device}
    return {"error": "Device not found"}

@app.get("/billing")
def get_billing():
    """Returns billing summary and expense breakdown"""
    return billing_data