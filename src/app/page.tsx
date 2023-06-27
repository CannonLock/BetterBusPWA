'use client'

import Image from 'next/image'
import 'leaflet/dist/leaflet.css';
import styles from './page.module.css'
import {MapContainer, TileLayer, LayerGroup, Polyline, Marker, Popup} from "react-leaflet";
import Leaflet from 'leaflet';
import {useEffect, useState} from "react";
import leafletIcon from "../public/images/signpost-split-fill.svg"
import {LatLngExpression} from "leaflet";

interface ShapeGroups {
    [index: string]: LatLngExpression[]
}

const Map = () => {

    let [shapes, setShapes] = useState<ShapeGroups>({});
    let [stops, setStops] = useState([]);
    useEffect(() => {
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
            console.log(data)
        }
        getShapes()
        getStops()
    }, [])

    console.log()

    return (
        <MapContainer className={styles.map} center={[43.074652337832255, -89.3842493815019]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayerGroup>
                {Object.entries(shapes).map(([key, latlon]) => <Polyline key={key} positions={latlon}></Polyline>)}
            </LayerGroup>
            <LayerGroup>
                {stops.map(stop => {
                    return (
                        <Marker icon={Leaflet.icon({iconUrl: leafletIcon.src})} key={stop['stop_id']} position={[stop['stop_lat'], stop['stop_lon']]}>
                            <Popup>
                                {JSON.stringify(stop)}
                            </Popup>
                        </Marker>
                    )
                })}
            </LayerGroup>
        </MapContainer>
    )
}

export default function Home() {

    return (
        <main className={styles.main}>
            <Map/>
        </main>
    )
}
