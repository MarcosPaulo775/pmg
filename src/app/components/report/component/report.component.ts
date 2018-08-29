import { Component } from '@angular/core';
import { User } from '../../../shared/models/user';
import { ProductionComponent } from '../../production/component/production.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  // Pie
  pieChartLabels: string[] = ['Leonardo', 'Vital', 'Thiago', 'Daniel', 'Fernado'];
  pieChartData: number[] = [20, 30, 40, 100, 200];
  pieChartType: string = 'pie';

  users: User[];
  user: User;

  constructor(
    private production: ProductionComponent
  ) { }

  ngOnInit() {
    this.oneLine();
    this.production.title = 'Relatório';
  }

  oneLine(): void {
    this.users = new Array<User>();
    for (let i = 0; i < 5; i++) {
      this.user = new User();
      this.user.createOs = this.pieChartData[i];
      this.user.username = this.pieChartLabels[i];
      this.users.push(this.user);
    } this.pieChartType = 'pie';
  }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
