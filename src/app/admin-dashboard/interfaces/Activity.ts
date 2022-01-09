export interface Activity {
    id?: string;
    name: string;
    open_state: boolean;
    initial_date: Date;
    end_date: Date;
    estimated_hours: number;
    is_general: boolean;
    users?: [SortUser];
}


export interface SortUser {
    user: {
        _id: string;
        name: string;
    };

    logs: [
        {
            log: {
                date: Date,
                description: string
            }

        }
    ]

    end_date?: Date;
    worked_hours?: number;
    estimated_hours?: number;
    is_active: boolean;
}


