import { User } from "src/app/core/interfaces/User";

export interface ResponseGetUsers
{
    users: User[];
    total?: number;
}