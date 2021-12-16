import { GeneralUser } from "./GeneralUser";

export interface ResponseGetUsers
{
    users: GeneralUser[];
    total?: number;
}