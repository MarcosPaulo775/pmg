import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(
    private production: ProductionComponent,
  ) { }

  ngOnInit() {
    this.production.title = 'Seguência de impressão';
    this.production.dashboard = '';
    this.production.print = 'rgb(0, 90, 176)';
    this.production.jobs = ''
  }

  downloadPDF() {
    var doc = new jsPDF()

    doc.text('Hello world!', 10, 10);
    doc.autoPrint();
    //doc.save('a4.pdf')
    //doc.output('datauri');



    var string = doc.output('datauristring');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }

}
