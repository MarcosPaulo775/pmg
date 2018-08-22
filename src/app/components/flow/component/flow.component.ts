import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

export interface PeriodicElement {
  position: number;
  cor: string;
  lineatura_1: number;
  lineatura_2: number;
  angulo: number;
  jogos: number;
  configs: string;
};

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
  {position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla'},
];

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  displayedColumns: string[] = ['position', 'cor', 'lineatura_1', 'lineatura_2', 'angulo', 'jogos', 'configs', 'excluir'];
  dataSource = ELEMENT_DATA;

  loading: boolean;

  constructor( private _router: Router) {
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
  }

}
