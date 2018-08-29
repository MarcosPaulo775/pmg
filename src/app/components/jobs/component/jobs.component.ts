import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(
    private production: ProductionComponent
  ) { }

  ngOnInit() {
    this.production.title = 'Trabalhos';
  }

}
