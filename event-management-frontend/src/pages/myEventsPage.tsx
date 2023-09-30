import { Box, useMediaQuery } from "@mui/material";
import { MyEventCard, Navbar } from "../common/widgets";
import { useEffect, useState } from "react";
import { Constant } from "../config";
import { useSelector } from "react-redux";
import { MyEventCRUDType } from "../common/types/eventsCRUDTypes";

export const MyEventsPage = () => {
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);

    const [events, setEvents] = useState<MyEventCRUDType[]>([])
    const getEvents = async () => {
        const myEventsResponse = await fetch(
            `${Constant.baseUrl}/api/events/my-events/${user.id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const myEvents = await myEventsResponse.json()
        
        if(myEvents.message){
            setEvents(myEvents.eventsLogsUser)
        }else{
            alert(myEvents.error)
        }

    }

    console.log(events);

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <Box>
            <Navbar />
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                padding={"2rem 6%"}
            >
                {events.map((event) => (
                    < MyEventCard key={event.id} event={event} />
                ))}

            </Box>
        </Box>
    )
};