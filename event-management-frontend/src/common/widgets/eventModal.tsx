import { Box, useTheme, Modal, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../themes";
import { WidgetWrapper } from "../components/WidgetWrapper";
import { EventCRUDType } from "../types/eventsCRUDTypes";
import { Constant } from "../../config";
import { useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface EventModalType {
    open: boolean,
    eventId: number,
    handleClose: () => void
}

export const EventModal = ({ open, eventId, handleClose }: EventModalType) => {

    const theme: CustomTheme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const [event, setEvent] = useState<EventCRUDType>()

    const getEvent = async () => {
        const eventResponse = await fetch(
            `${Constant.baseUrl}/api/events/${eventId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const { event } = await eventResponse.json()
        setEvent(event)
    }

    useEffect(() => {
        getEvent()
    }, [eventId])

    return (
        <WidgetWrapper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <Box sx={{ flex: 2.5 }}>
                            <img src={`${Constant.baseUrl}/storage/${event?.imagen}`} alt="Imagen" style={{ width: '100%', height: "100%" }} />
                        </Box>

                        <Box sx={{ flex: 2, paddingLeft: 2 }}>
                            <Typography id="modal-modal-title" variant="h2" component="h2">
                                {event?.name}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Date:
                            </Typography>
                            {`${new Date(event?.event_date!).toLocaleDateString()}`}<br />
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Place:
                            </Typography>
                            {event?.place}<br />

                        </Box>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {event?.description}
                    </Typography>
                    <Divider /><br />

                </Box>
            </Modal>
        </WidgetWrapper>
    )
};