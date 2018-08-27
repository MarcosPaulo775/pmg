import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ApprovalService } from '../../../core/http/approval.service';
import { Cliente, Result } from '../../../core/http/cliente';
import { ProductionComponent } from '../../production/component/production.component';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  
  clientes: string[];
  cliente: string;
  myControl = new FormControl();
  
  constructor(
    private approvalService: ApprovalService,
    private production: ProductionComponent
  ) { }
  
  ngOnInit() {

    this.production.title = 'Aprovação';

    this.approvalService.getClientes().subscribe((data: Result) => {
      
      if (data.error != 'invalid_username_or_password' && data.results != null) {
        this.clientes = new Array<string>();
        for(let i=0; i< data.results.length; i++){
          this.cliente = data.results[i].nome;
          this.clientes.push(this.cliente);
        }
        
      } else {
        
        if (localStorage.getItem('session')) {
          localStorage.removeItem('session');
        }
        
      }

    }, (data) => {
      
    });

  }
  
  options: string[] = ['One', 'Two', 'Three'];

}
