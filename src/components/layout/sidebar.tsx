'use client'

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import {Box, IconButton} from "@mui/material"
import React, {ReactElement} from "react";

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



interface SidebarDrawerProps {
    icon: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
}

export function SidebarDrawer({icon, children, open}: SidebarDrawerProps){
    return (
        <Box display={open ? "block" : "none"} p={1} overflow={"scroll"}>
            {children}
        </Box>
    )
}

interface SidebarProps {
    children: ReactElement<SidebarDrawerProps>[];
}

export default function Sidebar({children}: SidebarProps) {

    children = React.Children.toArray(children) as ReactElement<SidebarDrawerProps>[];

    const [openDrawer, setOpenDrawer] = React.useState<undefined | number>(undefined);

    return (
        <Box display={"flex"} height={"100vh"} flexDirection={"row"} bgcolor={"primary.main"} p={0} borderRadius={1} mr={"-2px"} zIndex={999}>
            <IconDrawer>
                <Box p={1}>
                    <DirectionsBusIcon sx={{color: "black"}}></DirectionsBusIcon>
                </Box>
                {children.map((child, index) => {
                    return (
                        <IconButton key={index} onClick={() => {
                            setOpenDrawer(index == openDrawer ? undefined : index)
                        }}>
                            {child.props.icon}
                        </IconButton>
                    )
                })}
            </IconDrawer>
            <>
                {children.map((child, index) => {
                    return React.cloneElement(child, { key: index, open: index === openDrawer})
                })}
            </>
        </Box>
    )
}
