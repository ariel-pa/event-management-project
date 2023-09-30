import { Box, useMediaQuery } from "@mui/material";
import { EventCard, Navbar } from "../common/widgets";
import { useEffect, useState } from "react";
import { Constant } from "../config";
import { EventCRUDType } from "../common/types/eventsCRUDTypes";

export const MyContentPage = () => {
    const isNonMobile = useMediaQuery("(min-width:1000px)");

    const [events, setEvents] = useState<EventCRUDType[]>([])
    const getEvents = async () => {
        const eventsResponse = await fetch(
            `${Constant.baseUrl}/api/events`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const { eventsWithUsers } = await eventsResponse.json()
        setEvents(eventsWithUsers)

    }

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
                    <EventCard key={event.id} event={event} />
                ))}

            </Box>
        </Box>
    )
};