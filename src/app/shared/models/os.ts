export class Os {
  _id?: string;
  os?: string;
  versao?: number;
  nome?: string;
  cliente?: string;
  pedido?: string;
  data?: string;
  codigo?: string;
  barra?: string;
  deleted?: string;
  status?: string;

  //cliche
  tecnologia?: string;
  varicacao?: string;
  material?: string;
  lineatura?: string;
  espessura?: string;
  camada?: string;
  local?: string;
  obs_cliche?: string;

  //cores
  colors?: Color[];
  obs_color?: string;
  perfil?: string;

  //montagem
  fechamento?: boolean;
  desenvolvimento?: string;
  pistas?: string;
  peso?: string;
  gap?: string;
  largura?: number;
  altura?: number;
  largura_material?: number;

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

  //Prova

  tinta?: string;
  substrato?: string;
  velocidade?: string;
  dupla_face?: string;
  temperatura?: string;
  horario?: string;
  error_code?: string;
  error?: string;
}

export class Color {
  _id?: number;
  Color?: string;
  Hex?: string;
  Blue?: string;
  Green?: string;
  Red?: string;
  lineatura1?: string;
  lineatura2?: string;
  angulo?: string;
  jogos?: string;
  fotocelula?: boolean;
  unitario?: boolean;
  camerom?: boolean;
}