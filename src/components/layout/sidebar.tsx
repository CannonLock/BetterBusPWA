import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Map from '@mui/icons-material/Map';
import {stringToColor} from "@/src/helpers/util";

import { styled } from '@mui/material/styles';

import routes from "@/public/data/mmt_gtfs/routes.json"
import Button, { ButtonProps } from '@mui/material/Button';
import {Box, IconButton} from "@mui/material"

interface IconDrawerProps {
    children: React.ReactNode
}

function IconDrawer({children}: IconDrawerProps){
    return (
        <Box>
            {children}
        </Box>
    )
}

interface MapButtonProps {
    route_short_name: string;
    route_color: string;
    route_text_color: string;
}

function MapButton({route_short_name, route_color, route_text_color}: MapButtonProps){

    return (
        <ColorButton backgroundColor={route_color} color={route_text_color}>
            <span color={stringToColor(route_text_color)}>{route_short_name}</span>
        </ColorButton>
    )
}


function MapDrawer(){

    return (
        <Box sx={{overflowY:"scroll", overflowX:"hidden"}}>
            {routes.map((route) => {
                    return (
                        <MapButton key={route.route_short_name} route_short_name={route.route_short_name} route_color={route.route_color} route_text_color={route.route_text_color}></MapButton>
                    )
                })
            }
        </Box>
    )
}



export default function Sidebar(){



    return (
        <Box display={"flex"} flexDirection={"row"} bgcolor={"primary.main"} p={1} borderRadius={1} mr={"-2px"} zIndex={999}>
            <IconDrawer>
                <DirectionsBusIcon></DirectionsBusIcon>
                <IconButton>
                    <Map></Map>
                </IconButton>
            </IconDrawer>
            <Box>
                <MapDrawer></MapDrawer>
            </Box>
        </Box>
    )
}