import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../themes";
import { WidgetWrapper } from "../components/WidgetWrapper";
import FlexBetween from "../components/FlexBetween";
import { AddEventCRUDType, EventCRUDType } from "../types/eventsCRUDTypes";
import { Constant } from "../../config";
import { EventModal } from "./eventModal";
import { UserModal } from "./userModal";
import { useSelector } from "react-redux";

export interface EventCardType {
    event: EventCRUDType
}

export const EventCard = ({ event }: EventCardType) => {

    const theme: CustomTheme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);
    const medium = theme.palette.neutral.medium;
    const main = theme.palette.neutral.main;


    const [eventId, setEventId] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [openUser, setOpenUser] = useState(false);

    /*Event Modal */
    const handleOpen = async (event_id: number) => {
        setOpen(true);
        setEventId(event_id)
    }

    const handleClose = () => setOpen(false);

    /* User Modal */
    const handleOpenUser = async (event_id: number) => {
        setOpenUser(true);
        setEventId(event_id)
    }

    const handleCloseUser = () => setOpenUser(false);

    /* add evento */
    const addEventWithUser = async (event_id: number) => {

        const jsonData: AddEventCRUDType = {
            user_id: user.id,
            event_id: event_id,
        };

        console.log(jsonData);
        const createEvent = await fetch(
            `${Constant.baseUrl}/api/events/event-logs`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            }
        );
        const saveEvent = await createEvent.json()
        console.log(saveEvent);

        if (saveEvent.message) {
            alert(saveEvent.message);
        } else {
            alert(saveEvent.error);
        }
    }

    return (
        <>
            <WidgetWrapper>

                {/* img */}
                <FlexBetween
                    gap="0.5rem"
                    pb="1.1rem"
                >
                    <img
                        style={{ objectFit: "cover" }}
                        width="100%"
                        height="100%"
                        alt="movie"
                        src={`${Constant.baseUrl}/storage/${event.imagen}`}
                    />
                </FlexBetween>
                <Divider />

                {/* information event */}
                <Box p="1rem 0">
                    <Typography
                        fontSize="1rem"
                        color={main}
                        fontWeight="500"
                        mb="1rem"
                    >
                        <h3>{event.name}</h3>
                    </Typography>
                    <Typography
                        fontSize="1rem"
                        color={main}
                        fontWeight="500"
                        mb="1rem"
                    >
                        Date: {`${new Date(event.event_date).toLocaleDateString()}`}
                    </Typography>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <Box >
                                <Typography
                                    color={medium}
                                    onClick={() => handleOpen(event.id)}
                                    sx={{
                                        "&:hover": {
                                            color: main,
                                            cursor: "pointer",
                                        },
                                    }}
                                >More information...</Typography>
                            </Box>
                        </FlexBetween>

                        {user ? (
                            <Button variant="contained" color="primary" onClick={() => addEventWithUser(event.id)}>
                                add
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={() => handleOpenUser(event.id)}>
                               check in
                            </Button>
                        )}

                    </FlexBetween>
                    <EventModal
                        open={open}
                        eventId={eventId}
                        handleClose={handleClose}
                    />
                    <UserModal
                        open={openUser}
                        estado={true}
                        eventId={eventId}
                        handleClose={handleCloseUser}
                    />
                </Box>
            </WidgetWrapper>
        </>
    )
};