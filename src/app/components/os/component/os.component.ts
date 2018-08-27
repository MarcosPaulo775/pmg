import { Component, OnInit } from '@angular/core';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { ProductionComponent } from '../../production/component/production.component';

export interface PeriodicElement {
  position: number;
  cor: string;
  lineatura_1: number;
  lineatura_2: number;
  angulo: number;
  jogos: number;
  configs: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
];

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  loading: boolean;

  displayedColumns: string[] = ['position', 'cor', 'lineatura_1', 'lineatura_2', 'angulo', 'jogos', 'configs', 'excluir'];
  dataSource = ELEMENT_DATA;

  constructor(
    private _router: Router,
    private production: ProductionComponent
  ) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.production.title = 'Ordem de serviço';
  }

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  tecnologia: string[] = [
    'Digital',
    'Kodak NX',
    'Letter Press',
    'OffSet',
    'Top Flat PMG'
  ];

  variacao: string[] = [
    'Normal',
    'Digicap',
    'Advanced 01',
    'Advanced 02',
    'Advanced 03',
    'Advanced 04',
    'Advanced 05',
    '5000 dpi'
  ];

  material: string[] = [
    'Macdermid',
    'Flint',
    'Kodak NX',
    'Kodak',
    'Chapa Off-Set'
  ];

  lineatura: string[] = [
    '20',
    '24',
    '26',
    '28',
    '30',
    '33',
    '34',
    '36',
    '38',
    '39',
    '40',
    '42',
    '43',
    '44',
    '46',
    '48',
    '52',
    '54',
    '56',
    '59',
    '60',
    '64',
    '68',
    '70',
    '74',
    '80'
  ];

  espessura: string[] = [
    '0.76',
    '1.14',
    '1.7',
    '2.84',
    '6'
  ];

  camada: string[] = [
    'Interna',
    'Externa'
  ];

  local: string[] = [
    'Goiânia'
  ];

  substrato: string[] = [
    'BOPP + Metalizado',
    'BOPP Cristal',
    'BOPP Matte',
    'BOPP Matte + Metalizado',
    'BOPP Metalizado',
    'BOPP Pérola',
    'BOPP Transparente',
    'Clysar Transparente',
    'Couché',
    'Couché Adesivo',
    'Couché Brilho',
    'Fita Adesiva',
    'InMoid',
    'Metalizado',
    'Nylon Transparente',
    'Papel',
    'Papel 5kg',
    'Papel Branco Fosco',
    'Papel Branco Monolúcido Liso',
    'Papel Kraft Fosco',
    'Papel Poly',
    'Papel Premium Fosco',
    'Papel Premium Monolúcido Liso',
    'PE Transparente',
    'PEAD',
    'PET + Metalizado',
    'PET + PE Pig LAM',
    'PET + PE Trans LAM',
    'PET Transparente',
    'Poliolefínico',
    'PP Transparente',
    'PVC Transparente',
    'ROLL LABEL Adesivo',
    'Shrink'
  ];

  face: string[] = [
    'Baixa',
    'Média',
    'Alta'
  ]

}
