import math

# -----------------------------
# FMCSA Assumptions
# -----------------------------
AVERAGE_SPEED = 60.0          # mph
MAX_DRIVING_PER_DAY = 11.0    # hours
BREAK_AFTER = 8.0             # hours driving
BREAK_DURATION = 0.5          # 30 minutes
RESET_DURATION = 10.0         # 10 hours off duty

PICKUP_DURATION = 1.0
DROPOFF_DURATION = 1.0

FUEL_INTERVAL = 1000.0        # miles
FUEL_DURATION = 0.25          # 15 minutes

CYCLE_LIMIT = 70.0            # 70 hour / 8 day


# ---------------------------------
# Helpers
# ---------------------------------

def format_time(hour):
    total_minutes = round(hour * 60)

    h = (total_minutes // 60) % 24
    m = total_minutes % 60

    return f"{h:02}:{m:02}"


def add_event(timeline, day, clock, duration, activity):
    timeline.append({
        "day": day,
        "start": format_time(clock),
        "end": format_time(clock + duration),
        "activity": activity,
        "hours": round(duration, 2)
    })

    return clock + duration


# ---------------------------------
# Main Scheduler
# ---------------------------------

def generate_hos(distance_miles, cycle_used):

    timeline = []

    day = 1
    clock = 8.0        # Driver starts at 08:00

    miles_remaining = distance_miles
    miles_since_fuel = 0

    fuel_stops = 0
    break_stops = 0

    # Pickup
    clock = add_event(
        timeline,
        day,
        clock,
        PICKUP_DURATION,
        "Pickup"
    )

    while miles_remaining > 0:

        driving_today = 0

        # ---------- First Driving Block (max 8h)

        first_drive = min(
            BREAK_AFTER,
            MAX_DRIVING_PER_DAY,
            miles_remaining / AVERAGE_SPEED,
        )

        if first_drive > 0:

            clock = add_event(
                timeline,
                day,
                clock,
                first_drive,
                "Driving"
            )

            driving_today += first_drive

            miles = first_drive * AVERAGE_SPEED

            miles_remaining -= miles
            miles_since_fuel += miles

        # ---------- Mandatory Break

        if (
            driving_today >= BREAK_AFTER
            and miles_remaining > 0
        ):

            clock = add_event(
                timeline,
                day,
                clock,
                BREAK_DURATION,
                "30 Minute Break"
            )

            break_stops += 1

        # ---------- Remaining Driving (up to 3h)

        second_drive = min(
            MAX_DRIVING_PER_DAY - driving_today,
            miles_remaining / AVERAGE_SPEED,
        )

        if second_drive > 0:

            clock = add_event(
                timeline,
                day,
                clock,
                second_drive,
                "Driving"
            )

            miles = second_drive * AVERAGE_SPEED

            miles_remaining -= miles
            miles_since_fuel += miles

        # ---------- Fuel

        if (
            miles_since_fuel >= FUEL_INTERVAL
            and miles_remaining > 0
        ):

            clock = add_event(
                timeline,
                day,
                clock,
                FUEL_DURATION,
                "Fuel Stop"
            )

            fuel_stops += 1
            miles_since_fuel = 0

        # ---------- Next Day

        if miles_remaining > 0:

            clock = add_event(
                timeline,
                day,
                clock,
                RESET_DURATION,
                "10 Hour Reset"
            )

            day += 1

        # Start every new day at 08:00
        clock = 8.0

    # ---------- Dropoff

    clock = add_event(
        timeline,
        day,
        clock,
        DROPOFF_DURATION,
        "Dropoff"
    )

    driving_hours = distance_miles / AVERAGE_SPEED

    cycle_remaining = max(
        0,
        round(
            CYCLE_LIMIT
            - cycle_used
            - driving_hours
            - PICKUP_DURATION
            - DROPOFF_DURATION,
            2
        )
    )

    return {

        "trip_days": day,

        "fuel_stops": fuel_stops,

        "rest_stops": break_stops,

        "cycle_remaining": cycle_remaining,

        "timeline": timeline,

    }
