export interface Cliente{
    _id: string,
    nome: string;
}

export interface Result{
    results: Cliente[];
    error_code: string;
    error: string;
}