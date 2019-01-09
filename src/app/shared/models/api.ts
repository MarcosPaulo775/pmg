import { OS, Color, Technology } from "./os";
import { Company, State, City } from "./company";
import { Avatar } from "./user";
import { Chapa } from './chapa';

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

export interface Result_Technology {
    results: Technology[];
    error_code: string;
    error: string;
}

export interface Result_Chapa {
    results: Chapa[];
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

export interface Result_Avatar {
    results: Avatar[];
    error_code: string;
    error: string;
}

export interface Result_Delete {
    results: Delete[];
    error_code: string;
    error: string;
}

export interface Result_DimensionColor {
    results: DimensionColor[];
    error_code: string;
    error: string;
}

export interface DimensionColor {
    _id?: string,
    color?: Color[];
    os?: string;
    error_code?: string;
    error?: string;
}

export class Delete {
    ok?: number;
    error_code?: string;
    error?: string;
}

export class Flow {
    workable_id?: string;
    workable_name?: string;
    jacket_name?: string;
    jacket_id?: string;
    error_code?: string;
    error?: string;
}


export interface is_admin {
    user_id?: string;
    is_admin?: number;
    error_code?: string;
    error?: string;
}

export interface User_id {
    user_id?: string;
    error_code?: string;
    error?: string;
}

export interface _id {
    _id?: string;
    error_code?: string;
    error?: string;
}


/** workable */
export class Waiting_room {
    collar?: string;
    connector?: string;
    node?: string;
    error_code?: string;
    error?: string;
}

export class Workable {
    _id?: string;
    id?: string;
    birth?: string;
    do_schedule?: boolean;
    jacket?: string;
    modification?: string;
    name?: string;
    node_name?: string;
    priority?: number;
    run_state?: string;
    save_id?: string;
    schedule?: number;
    state?: string;
    system?: boolean;
    whitepaper?: string;
    whitepaper_name?: string;
    instructions?: any[];
    log?: any[];
    roles?: any;
    variables?: any;
    waiting_room?: Waiting_room;
    hold_in_kiosk?: boolean
}

export interface Result_Workable {
    results: Workable[];
    error_code: string;
    error: string;
}


