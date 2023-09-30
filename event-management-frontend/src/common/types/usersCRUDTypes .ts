export interface UsersCRUDType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    event_id: number,
};

export interface CreateUsersCRUDType {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    event_id: number,
};