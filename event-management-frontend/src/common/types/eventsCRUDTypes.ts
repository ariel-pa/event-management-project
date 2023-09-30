export interface EventCRUDType {
    id: number,
    name: string,
    description: string,
    event_date: string,
    place: string,
    imagen: string,
    user_id: number,
};

export interface CreateEventCRUDType {
    name: string,
    description: string,
    event_date: string,
    place: string,
    imagen: string,
    user_id: number,
};

export interface MyEventCRUDType {
    id: number,
    registration_date: string,
    user_id: number,
    Event: EventCRUDType,
};

export interface AddEventCRUDType {
    event_id: number,
    user_id: number,
};