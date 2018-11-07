import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  title: string;
  dashboard: string;
  jobs: string;
  print: string;

  @Input()
  set setDashboard(color: string) {
    this.dashboard = color;
  }

  @Input()
  set setJobs(color: string) {
    this.jobs = color;
  }

  @Input()
  set setPrint(color: string) {
    this.print = color;
  }

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
