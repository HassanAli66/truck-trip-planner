import requests

HEADERS = {
    "User-Agent": "RouteWise/1.0"
}


def geocode(location):
    response = requests.get(
        "https://nominatim.openstreetmap.org/search",
        params={
            "q": location,
            "format": "json",
            "limit": 1,
        },
        headers=HEADERS,
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    if not data:
        raise Exception(f"Location not found: {location}")

    return {
        "lat": float(data[0]["lat"]),
        "lng": float(data[0]["lon"]),
    }


def calculate_route(current, pickup, dropoff):

    current_pos = geocode(current)
    pickup_pos = geocode(pickup)
    dropoff_pos = geocode(dropoff)

    coordinates = (
        f'{current_pos["lng"]},{current_pos["lat"]};'
        f'{pickup_pos["lng"]},{pickup_pos["lat"]};'
        f'{dropoff_pos["lng"]},{dropoff_pos["lat"]}'
    )

    response = requests.get(
        f"https://router.project-osrm.org/route/v1/driving/{coordinates}",
        params={
            "overview": "full",
            "geometries": "geojson",
        },
        timeout=15,
    )

    response.raise_for_status()

    route = response.json()["routes"][0]

    return {

        "distance_miles": round(route["distance"] * 0.000621371, 2),

        "duration_hours": round(route["duration"] / 3600, 2),

        "current": current_pos,

        "pickup": pickup_pos,

        "dropoff": dropoff_pos,

        "geometry": route["geometry"]

    }
