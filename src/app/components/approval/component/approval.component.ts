import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  clientes: string[] = [
    'Digital',
    'Kodak NX',
    'Letter Press',
    'OffSet',
    'Top Flat PMG'
  ];

}
