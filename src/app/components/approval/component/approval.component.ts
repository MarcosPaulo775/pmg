import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadService } from '../upload.service';

import { ApprovalService } from '../../../core/http/approval.service';
import { Result } from '../../../core/http/cliente';
import { ProductionComponent } from '../../production/component/production.component';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  
  clientes: string[];
  cliente: string;
  form: FormGroup;

  fileName: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private approvalService: ApprovalService,
    private production: ProductionComponent,
    public dialog: MatDialog,
    public uploadService: UploadService
  ) { }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }
  
  onSubmit(){
    if(this.form.valid){
      this.fileName = new Array<string>();
      this.fileName = this.uploadService.getName;
      console.log(this.fileName);
      this.uploadService.setName = [];
  
      this.uploadService.start_from_whitepaper(
        this.form.get('cliente').value,
        this.form.get('email').value,
        this.form.get('os').value,
        this.form.get('versao').value,
        this.fileName[0],
      ).subscribe((data) => {
        console.log(data);
      }, (data) => {});
    }
  }
  
  ngOnInit() {

    this.production.title = 'Aprovação';

    this.form = this.formBuilder.group({
      cliente: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      versao: [null, [Validators.required]],
      os: [null, [Validators.required]]
    });

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
    }, (data) => {});

  }

}
