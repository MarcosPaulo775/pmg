import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

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
    this.onTitle("Ordem de Serviço");
  }

  showFiller = false;

  title: string;

  onTitle(title: string) {
    this.title = title;

    document.getElementById("Dashboard").classList.remove('selected');
    document.getElementById("Trabalhos").classList.remove('selected');
    document.getElementById("Inbox").classList.remove('selected');
    document.getElementById("Orçamentos").classList.remove('selected');
    document.getElementById("Sequencia de Impressão").classList.remove('selected');
    document.getElementById("Ordem de Serviço").classList.remove('selected');
    document.getElementById("Fluxo de Serviço").classList.remove('selected');
    document.getElementById("RIP").classList.remove('selected');
    document.getElementById("Aprovação").classList.remove('selected');
    document.getElementById("Relatório").classList.remove('selected');


    document.getElementById(title).classList.toggle('selected');
  }

}
