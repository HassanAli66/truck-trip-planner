# 🚛 RouteWise

> Intelligent Truck Trip Planning & FMCSA Hours of Service (HOS) Route Simulator

RouteWise is a full-stack web application that helps truck drivers and dispatchers plan trips by generating optimized routes, estimating driving time and distance, and automatically creating an FMCSA-compliant Hours of Service (HOS) schedule.

The application combines geocoding, route optimization, HOS calculations, and an interactive map into a clean dashboard that visualizes an entire trip from departure to destination.

---

# ✨ Features

## Route Planning

- Convert addresses into geographic coordinates using OpenStreetMap Nominatim
- Generate optimized truck routes using the OSRM Routing API
- Interactive map powered by Leaflet
- Animated route visualization
- Automatic map fitting to generated routes

---

## FMCSA Hours of Service Planning

Automatically generates a complete HOS schedule including:

- Driving periods
- Pickup events
- Dropoff events
- Fuel stops
- Mandatory breaks
- 10-hour resets
- Remaining cycle hours
- Multi-day trip planning

---

## Dashboard

The application provides a complete trip overview including:

- Total distance
- Estimated drive time
- Trip duration (days)
- Fuel stops
- Rest breaks
- Remaining cycle hours

---

## Interactive Route Map

- OpenStreetMap tiles
- Animated route drawing
- Current location marker
- Pickup marker
- Dropoff marker
- Automatic zoom-to-route

---

## Driver Timeline

Visual representation of:

- Daily activities
- Start & end times
- Driving events
- Fuel stops
- Breaks
- Reset periods

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Leaflet
- Lucide React Icons
- Axios

---

## Backend

- Django
- Django REST Framework
- Python

---

## APIs

### OpenStreetMap Nominatim

Used for geocoding addresses.

https://nominatim.openstreetmap.org

### OSRM (Open Source Routing Machine)

Used for generating optimized driving routes.

https://router.project-osrm.org

---

# 📂 Project Structure

```
RouteWise/
│
├── backend/
│   ├── api/
│   ├── routing.py
│   ├── hos.py
│   ├── views.py
│   ├── urls.py
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── logs/
│   │   ├── map/
│   │   ├── planner/
│   │   └── summary/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/RouteWise.git

cd RouteWise
```

---

# Backend Setup

## Create virtual environment

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Windows

```bash
python -m venv venv

venv\Scripts\activate
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

## Run migrations

```bash
python manage.py migrate
```

---

## Start backend

```bash
python manage.py runserver
```

Backend runs on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📡 API

## Generate Route

```
POST /api/generate-route/
```

Example Request

```json
{
    "current_location": "Dallas, TX",
    "pickup_location": "Austin, TX",
    "dropoff_location": "Houston, TX",
    "cycle_used_hours": 23
}
```

Example Response

```json
{
    "route": {
        "distance_miles": 345.6,
        "duration_hours": 6.4,
        "geometry": { ... }
    },
    "hos": {
        "trip_days": 1,
        "fuel_stops": 1,
        "rest_stops": 1,
        "cycle_remaining": 47,
        "timeline": [ ... ]
    }
}
```

---

# 🧠 Hours of Service Logic

The HOS engine simulates a realistic truck driver's workday based on FMCSA regulations.

The planner automatically schedules:

- Pickup
- Driving
- Mandatory 30-minute breaks
- Fuel stops
- 10-hour resets
- Dropoff

while tracking:

- Remaining cycle hours
- Daily driving limits
- Trip duration

---

# 🎨 UI Highlights

- Modern dashboard layout
- Responsive design
- Animated route generation
- Interactive map
- Driver timeline
- Clean card-based interface
- Sticky navigation bar
- Professional color palette

---

# 📈 Future Improvements

Potential enhancements include:

- User authentication
- Save trip history
- PDF ELD log export
- Printable reports
- Weather integration
- Fuel price integration
- Truck restriction routing
- Multi-stop optimization
- Live GPS tracking
- Driver profiles
- Fleet management dashboard

---

# 📸 Screenshots

Add screenshots of:

- Dashboard
- Interactive Map
- Driver Timeline
- Generated Route

---

# 🌐 Live Demo

Add your deployed application URL here.

Example

```
https://routewise.vercel.app
```

---

# 👨‍💻 Author

**Hassan Hassan**

Software Engineer

GitHub:
https://github.com/YOUR_USERNAME

LinkedIn:
https://linkedin.com/in/YOUR_PROFILE

---

# 📄 License

This project is licensed under the MIT License.
