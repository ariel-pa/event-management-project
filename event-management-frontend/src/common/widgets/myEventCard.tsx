import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { CustomTheme } from "../../themes";
import { WidgetWrapper } from "../components/WidgetWrapper";
import FlexBetween from "../components/FlexBetween";
import { Constant } from "../../config";
import { EventModal } from "./eventModal";
import { MyEventCRUDType } from "../types/eventsCRUDTypes";

export interface MyEventCardType {
    event: MyEventCRUDType
}

export const MyEventCard = ({ event }: MyEventCardType) => {

    const theme: CustomTheme = useTheme();
    const [eventId, setEventId] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const medium = theme.palette.neutral.medium;
    const main = theme.palette.neutral.main;

    // const fecha = new Date(event.Event.event_date);

    // const mes = format(fecha, "MMMM");
    // const año = format(fecha, "yyyy");
    // const dia = format(fecha, "dd");

    /*Event Modal */
    const handleOpen = async (event_id: number) => {
        setOpen(true);
        setEventId(event_id)
    }

    const handleClose = () => setOpen(false);

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
                        src={`${Constant.baseUrl}/storage/${event?.Event?.imagen}`}
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
                        <h3>{event?.Event?.name}</h3>
                    </Typography>
                    <Typography
                        fontSize="1rem"
                        color={main}
                        fontWeight="500"
                        mb="1rem"
                    >
                        Date: {`${new Date(event.Event.event_date).toLocaleDateString()}`}
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
                    </FlexBetween>
                    <EventModal
                        open={open}
                        eventId={eventId}
                        handleClose={handleClose}
                    />
                </Box>
            </WidgetWrapper>
        </>
    )
};