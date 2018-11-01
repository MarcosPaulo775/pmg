import { Os, Color } from "./os";

export interface Session{
    session: string;
    error_code: string;
    error: string;
}

export interface Result_OS{
    results: Array<Os>;
    error_code: string;
    error: string;
}

export interface Count{
    count: number;
    error_code: string;
    error: string;
}

export interface Item{
    _id: string,
    name: string;
}

export interface Result_Item{
    results: Item[];
    error_code: string;
    error: string;
}

export interface Result_Color{
    results: Color[];
    error_code: string;
    error: string;
}