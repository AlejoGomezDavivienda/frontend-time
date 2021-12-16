export interface Activity
{
    id?: string;
    name: string;
    open_state: boolean;
    initial_date: Date;
    end_date: Date;
    estimated_hours: number;
    is_general: boolean;
    user?: SortUser;
}


export interface SortUser
{
    _id: string;
    name: string;
}