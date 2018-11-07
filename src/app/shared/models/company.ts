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

    nf?: string;
    boleto?: string;
    prazo?: string;

    digital_114?: string;
    digital_170?: string;
    digital_284?: string;
    kodak_114?: string;
    kodak_170?: string;
    margem?: string;
    
    email_nf?: string;
    email_materiais?: string;
    email_pedido?: string;
    serasa?: boolean;
    cartao_cnpj?: boolean;
    obs_financeiro?: string;
    obs_diretoria?: string;

    deleted?: boolean;

    error_code?: string;
    error?: string;
}

