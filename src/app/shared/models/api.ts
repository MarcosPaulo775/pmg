import { OS, Color } from "./os";
import { Company, State, City } from "./company";
import { Avatar } from "./user";

export interface Session {
    session: string;
    error_code: string;
    error: string;
}

export interface Result_OS {
    results: Array<OS>;
    error_code: string;
    error: string;
}

export interface Count {
    count: number;
    error_code: string;
    error: string;
}

export interface Item {
    _id: string,
    name: string;
}

export interface Technology {
    _id: string,
    name: string;
    variation: Item[];
    material: Item[];
}
export interface Result_Technology {
    results: Technology[];
    error_code: string;
    error: string;
}

export interface Result_States {
    results: State[];
    error_code: string;
    error: string;
}

export interface Result_Cities {
    results: City[];
    error_code: string;
    error: string;
}

export interface Result_Item {
    results: Item[];
    error_code: string;
    error: string;
}

export interface Result_Color {
    results: Color[];
    error_code: string;
    error: string;
}

export interface Result_Company {
    results: Company[];
    error_code: string;
    error: string;
}

export interface Data {
    data: string;
    error_code: string;
    error: string;
}

export interface Result_Avatar{
    results: Avatar[];
    error_code: string;
    error: string;
}

export interface Result_Delete{
    results: Delete[];
    error_code: string;
    error: string;
}

export class Delete{
    ok?: number;
}