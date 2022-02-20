import { Area, Role } from "src/app/core/interfaces/User";

export interface GeneralUser
{
    email: string;
    // area?: string
    rol?: any,
    area?: any
}

export interface CreateUser {
    email: string,
    areaCode: number,
    roleCode: string
}
