'use client'

import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import Map from "@mui/icons-material/Map";


import {stringToColor} from "@/src/helpers/util";
import {SidebarDrawer} from "@/src/components/layout/sidebar";

import routes from "@/public/data/mmt_gtfs/routes.json";

interface MapButtonProps {
    route_short_name: string;
    route_color: string;
    route_text_color: string;
    onClick: () => void;
}

function MapButton({route_short_name, route_color, route_text_color, onClick}: MapButtonProps){

    return (
        <Box mb={"2px"}>
            <Button onClick={onClick} style={{backgroundColor: stringToColor(route_color), color: stringToColor(route_text_color)}}>
                <span color={stringToColor(route_text_color)}>{route_short_name}</span>
            </Button>
        </Box>
    )
}

export function MapSelector({onSelect}: {onSelect: (route_id: number) => void}) {
    return (
        <Box sx={{overflowY:"scroll", overflowX:"hidden"}}>
            {routes.map((route, index) => {
                return (
                    <MapButton key={index} onClick={() => onSelect(route.route_id)} route_short_name={route.route_short_name} route_color={route.route_color} route_text_color={route.route_text_color}></MapButton>
                )
            })
            }
        </Box>
    )
}