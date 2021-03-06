export class Company {
    _id?: string;

    solicitante?: string;
    novo?: boolean;
    fisica?: boolean;
    juridica?: boolean;
    principal?: string;

    razao?: string;
    fantasia?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    n?: string;
    uf?: string;
    cep?: string;
    tel?: string;
    fax?: string;
    cnpj_cpf?: string;
    ie_rg?: string;
    comercial?: string;
    tel_comercial?: string;
    email_comercial?: string;
    financeiro?: string;
    tel_financeiro?: string;
    email_financeiro?: string;
    endereco_cobranca?: string;

    nf?: boolean;
    prazo?: string;
    faturamento?: string;
    nota?: boolean;
    boleto?: boolean;
    obs?: string;

    top_flat_114?: string;
    top_flat_170?: string;
    digital_284?: string;
    kodak_114?: string;
    kodak_170?: string;
    margem_u?: string;
    margem_d?: string;
    margem_l?: string;
    margem_r?: string;

    email_nf?: string;
    email_materiais?: string;
    email_pedido?: string;

    deleted?: boolean;

    error_code?: string;
    error?: string;
}

export class City {
    _id?: string;
    ID?: string;
    name?: string;
    state?: string;
}

export class State {
    _id?: string;
    ID?: string;
    name?: string;
    abbreviation?: string;
}

