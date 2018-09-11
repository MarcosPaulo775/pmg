import { Os } from "./os";

export interface Session{
    session: string;
    error_code: string;
    error: string;
}

export interface Cliente{
    _id: string,
    nome: string;
}

export interface Result_Cliente{
    results: Cliente[];
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