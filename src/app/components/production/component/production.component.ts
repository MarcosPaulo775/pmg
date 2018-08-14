import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.onTitle('Fluxo de Serviço');
  }

  showFiller = false;

  title: string;

  onTitle(title: string){
    this.title = title;
  }

}
