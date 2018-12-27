import { Item } from "./api";

export class OS {
  _id?: string;
  os?: string;
  versao?: number;
  nome?: string;
  cliente?: string;
  pedido?: string;
  data_inicio?: string;
  data?: string;
  codigo?: string;
  barra?: string;
  deleted?: boolean;
  status?: string;

  //cliche
  tecnologia?: string;
  variacao?: string;
  material?: string;
  substrato?: string;
  lineatura?: string;
  espessura?: string;
  camada?: string;
  local?: string;
  face?: string;
  obs_cliche?: string;

  //cores
  colors?: Color[];
  obs_color?: string;
  perfil?: string;

  //montagem
  fechado?: boolean;
  z?: string;
  desenvolvimento?: string;
  fechamento?: string;
  qtpistas?: string;
  entre_pistas?: string;
  qtpasso?: string;
  entre_passos?: string;
  manta?: number;
  faca?: number;

  esquerda?: boolean;
  direita?: boolean;
  topo?: boolean;
  base?: boolean;

  esquerda_mm?: number;
  direita_mm?: number;
  topo_mm?: number;
  base_mm?: number;

  refile?: boolean;
  corte?: boolean;
  cameron?: boolean;
  microponto?: boolean;

  largura?: string;
  altura?: string;
  largura_material?: string;
  obs_montagem?: string;

  //Prova

  substrato_prova?: string;
  velocidade?: string;
  dupla?: string;
  temperatura?: string;
  horario?: string;
  obs_prova?: string;

  //financeiro

  terceiro?: string;
  cobranca?: string;
  compra?: string;
  cobrar?: string;
  obs_financeiro?: string;

  valor?: string;
  valor_cm?: string;
  area?: string;

  cnpj?: string;

  error_code?: string;
  error?: string;
}

export class Color {
  _id?: number;
  color?: string;
  hex?: string;
  blue?: string;
  green?: string;
  red?: string;
  lineatura1?: string;
  lineatura2?: string;
  angulo?: string;
  jogos?: string;
  fotocelula?: boolean;
  unitario?: boolean;
  camerom?: boolean;
  anilox?: string;
  ganho?: string;
  densidade?: string;
  bcm?: string;
  altura?: string;
  largura?: string;
  valor?: string;
}

export class FormColor {
  color: Color;
  colors: Color[];
  lineatura: string[];
  angulo: string[];
}

export class XmlOs {
  cnpj?: string;
  core?: string;
  value?: number;
  n?: number;
}

export class Details{

  technology?: string[];
  variation?: string[];
  material?: string[];
  substrate?: string[];
  thickness?: string[];
  layer?: string[];
  local?: string[];
  lineatura?: string[];
  angle?: string[];
  profile?: string[];
  face?: string[];
  double?: string[];

  error_code?: string;
  error?: string;
}