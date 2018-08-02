import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/models/user';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  // Pie
  pieChartLabels: string[];
  pieChartData: number[];
  pieChartType: string = 'pie';

  fileText: any;
  names: string[];
  numbers: number[];
  users: User[];
  pessoas: string[];

  visivel: boolean;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.pieChartLabels = new Array<string>();
    this.pieChartData = new Array<number>();
    this.visivel = false;
  }

  fileUpload(event) {
    let reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    let me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }

  oneLine(): void {
    this.users = this.reportService.splitLine(this.fileText);
    for (let i = 0; i < this.users.length; i++) {
      this.pieChartLabels.push(this.users[i].nome);
      this.pieChartData.push(this.users[i].createOs);
    } this.pieChartType = 'pie';
    this.visivel = true;
  }

  // events
  public chartClicked(e: any): void {
    this.oneLine();
  }


  public chartHovered(e: any): void {
    console.log(e);
  }
}
