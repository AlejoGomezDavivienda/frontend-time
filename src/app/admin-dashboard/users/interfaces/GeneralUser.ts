export interface GeneralUser
{
    email: string;
    name: string;
    state?: boolean;
    country?: string;
    rol?: string;
}

export enum Countries {
    CO = 'CO',
    HN = 'HN',
    CR = 'CR',
    SV = 'SV',
    PA = 'PA',
    MA = 'MA'
};

export enum Roles {
    ADMIN_ROLE = 'ADMIN_ROLE',
    USER_ROLE = 'USER_ROLE'
};