import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';

@Component({
  selector: 'app-new-preset',
  templateUrl: './new-preset.component.html',
  styleUrls: ['./new-preset.component.css']
})
export class NewPresetComponent implements OnInit {

  constructor(
    private production: ProductionComponent
    ) { }

  ngOnInit() {
    this.production.title = 'Nova Predefinição';
    this.production.dashboard = '';
    this.production.preset = '';
    this.production.jobs = '';
    this.production.storage = '';
  }

}
