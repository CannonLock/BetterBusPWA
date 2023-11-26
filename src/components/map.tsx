'use client'

import {MapContainer, TileLayer, LayerGroup, Polyline, Marker, Popup} from "react-leaflet";
import Leaflet from 'leaflet';
import {useEffect, useState, FC, useMemo} from "react";
import {LatLngExpression} from "leaflet";
import styles from "@/src/app/page.module.css";
import leafletIcon from "@/public/images/signpost-split-fill.svg";

interface StopPopupProps {
    stop_id: number
}

const BusPopup: FC<StopPopupProps> = ({stop_id}) => {

    useEffect(() => {

    }, [])

    return (
        <Popup>
            {}
        </Popup>
    )
}


interface ShapeGroups {
    [index: string]: LatLngExpression[]
}

interface MapProps {
    route: number
}

const Map = ({route}: MapProps) => {

    let [shapes, setShapes] = useState<ShapeGroups>({});
    let [stops, setStops] = useState([]);
    let [trips, setTrips] = useState([]);

    useEffect(() => {

        console.log("I mounted")
        let getShapes = async () => {

            interface Shape {
                "shape_id": number,
                "shape_code": string,
                "shape_pt_lat":number,
                "shape_pt_lon":number,
                "shape_pt_sequence":number,
                "shape_dist_traveled":number
            }

            let response = await fetch("/data/mmt_gtfs/shapes.json")
            let data = await response.json()

            let shapes: ShapeGroups = {}
            data.forEach((shape: Shape) => {
                if(shape['shape_id'] in shapes){
                    shapes[shape['shape_id']].push([shape['shape_pt_lat'], shape['shape_pt_lon']])
                } else {
                    shapes[shape['shape_id']] = [[shape['shape_pt_lat'], shape['shape_pt_lon']]]
                }
            })

            setShapes(shapes)
        }

        let getStops = async () => {
            let response = await fetch("/data/mmt_gtfs/stops.json")
            let data = await response.json()

            setStops(data)
        }

        let getTrips = async () => {
            let response = await fetch("/data/mmt_gtfs/trips.json")
            let data = await response.json()

            setTrips(data)
        }

        getShapes()
        getStops()
        getTrips()
    }, [])

    const routeTrips = useMemo(() => trips.filter(trip => trip['route_id'] == route), [trips, route])
    const routeShapes = useMemo(() => [...new Set(Object.entries(routeTrips).map(([key, trip]) => shapes[trip.shape_id]))], [routeTrips, shapes])

    return (
        <MapContainer className={styles.map} center={[43.074652337832255, -89.3842493815019]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayerGroup>
                {routeShapes.map((latlng, index) => <Polyline key={index} positions={latlng}></Polyline>)}
            </LayerGroup>
            {/*<LayerGroup>*/}
            {/*    {stops.map(stop => {*/}
            {/*        return (*/}
            {/*            <Marker icon={Leaflet.icon({iconUrl: leafletIcon.src})} key={stop['stop_id']} position={[stop['stop_lat'], stop['stop_lon']]}>*/}
            {/*                <Popup>*/}
            {/*                    {JSON.stringify(stop)}*/}
            {/*                </Popup>*/}
            {/*            </Marker>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</LayerGroup>*/}
        </MapContainer>
    )
}

export default Map