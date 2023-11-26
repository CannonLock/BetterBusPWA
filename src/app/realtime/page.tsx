'use client'

import 'leaflet/dist/leaflet.css';
import styles from '../page.module.css'
import dynamic from 'next/dynamic'
import {Box} from "@mui/material";
import Sidebar, {SidebarDrawer} from "@/src/components/layout/sidebar";
import {MapSelector} from "@/src/app/realtime/components/Drawer";
import React, {createContext} from "react";
import {default as MapIcon} from "@mui/icons-material/Map";

import Map from "@/src/components/map";

export default function Home() {

    const MapContext = createContext<undefined | number>(undefined)
    const [route, setRoute] = React.useState<undefined | number>(undefined)

    return (
        <MapContext.Provider value={route}>
            <Box display={"flex"} flexDirection={"row"}>
                <Box>
                    <Sidebar>
                        <SidebarDrawer icon={<MapIcon/>}>
                            <MapSelector onSelect={setRoute}/>
                        </SidebarDrawer>
                    </Sidebar>
                </Box>
                <Box>
                    <main className={styles.main}>
                        <Map route={route}/>
                    </main>
                </Box>
            </Box>
        </MapContext.Provider>
    )
}
