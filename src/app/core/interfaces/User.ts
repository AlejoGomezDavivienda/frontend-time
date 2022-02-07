export interface User
{
    id: string;
    name: string;
    email: string;
    role: Role;
    img: string;
    area: Area;
    // Para los que son supervisados
    supervised_by: any
}

export interface Role {
    code: string,
    name: string
}

export interface Area {
    code: number,
    name: string
    country: Country
}

export interface Country {
    code: string,
    name: string
}