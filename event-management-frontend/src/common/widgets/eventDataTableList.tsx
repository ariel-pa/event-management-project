import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../themes";
import { WidgetWrapper } from "../components/WidgetWrapper";
import { EventCRUDType } from "../types/eventsCRUDTypes";

import { useSelector } from "react-redux";
import { Constant } from '../../config';
import { CreateEventModal } from './createEventModal';

interface Column {
    id: 'name' | 'description' | 'place' | 'event_date';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
    {
        id: 'place',
        label: 'Place',
        minWidth: 170,
    },
    {
        id: 'event_date',
        label: 'Event Date',
        minWidth: 170,
    },
];

interface Data {
    name: string;
    description: string;
    place: string;
    event_date: string;
}


export interface EventDataTableType {
    event: EventCRUDType
}

export const EventsDataTable = () => {

    const theme: CustomTheme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);
    const medium = theme.palette.neutral.medium;
    const main = theme.palette.neutral.main;

    const [events, setEvents] = React.useState<EventCRUDType[]>([])
    const [open, setOpen] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    /*Event Modal */
    const handleOpen = async () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function createData(
        name: string,
        description: string,
        place: string,
        event_date: string,
    ): Data {
        return { name, description, place, event_date };
    }

    const rows = convertEventsToRows(events);

    function convertEventsToRows(events: EventCRUDType[]) {
        return events.map((event, key) => {
            return createData(
                event.name,
                event.description,
                event.place,
                new Date(event.event_date).toLocaleDateString()
            );
        });
    }

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

    React.useEffect(() => {
        getEvents()
    }, [open])

    return (
        <WidgetWrapper>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Nuevo
            </Button><br /><br />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <CreateEventModal
                open={open}
                handleClose={handleClose}
            />
        </WidgetWrapper>
    )
};