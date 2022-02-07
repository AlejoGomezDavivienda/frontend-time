import { User } from "src/app/core/interfaces/User";
import { GeneralUser } from "./GeneralUser";

export interface ResponseGetUsers
{
    users: User[];
    total?: number;
}