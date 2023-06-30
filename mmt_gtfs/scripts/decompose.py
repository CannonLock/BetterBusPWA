import pandas as pd
import json
from collections import defaultdict
from pathlib import Path


def get_routes():
    data = json.load(open("../json/routes.json"))

    trips = {}
    for trip in data:
        trips[trip['route_id']] = trip

    return trips


def get_trips():
    data = json.load(open("../json/trips.json"))

    routes = {}
    for route in data:
        routes[route['route_id']] = route

    return routes


def decompose_stop_times():
    data = json.load(open("../json/stop_times.json"))

    stop_times_by_stop = defaultdict(lambda: [])
    for stop_time in data:
        hours, minutes, seconds = [*map(lambda x: int(x), stop_time['arrival_time'].split(":"))]
        time_key_minutes = (((hours * 60) + minutes) // 15) * 15  # Get number of minutes rounded down to nearest 15
        time_key = f"{str(time_key_minutes // 60).zfill(2)}{time_key_minutes % 60}"

        stop_times_by_stop[f"{stop_time['stop_id']}-{time_key}"].append(stop_time)

    for key, stop_time_by_stop in stop_times_by_stop.items():
        stop_id, stop_key = key.split("-")

        path = f"../preprocessed/stop_times_by_stop/{stop_id}"

        Path(path).mkdir(parents=True, exist_ok=True)

        json.dump(stop_time_by_stop, open(f"{path}/{stop_key}.json", "w"))



decompose_stop_times()