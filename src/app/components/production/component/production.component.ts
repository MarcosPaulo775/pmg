import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  title: string;

  @Input()
  set setTitle(title: string) {
    this.title = title;
  }

  constructor() {
  }

  ngOnInit() {
    this.title = '';
  }

}
