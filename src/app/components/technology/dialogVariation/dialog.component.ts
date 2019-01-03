import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';

import { OS, Technology } from '../../../shared/models/os';
import { Result_OS } from 'src/app/shared/models/api';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { DialogConfirmComponent } from '../../confirm/confirm.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogVariationComponent {

  form: FormGroup;
  variacoes: string[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

    public dialogRef: MatDialogRef<DialogVariationComponent>,
    @Inject(MAT_DIALOG_DATA) public tecnologia: Technology,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    private apiService: ApiService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.initForm();
    this.variacoes = this.tecnologia.variation;
  }
  
  initForm(){
    this.form = this.formBuilder.group({
      variacao: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.getForm();
    this.apiService.custom_objects_update('technology', this.tecnologia)
      .subscribe((data: Technology) => {
        if (!data.error) {
          this.appService.openSnackBar('Adicionado nova variação', 'ok');
          this.initForm();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  getForm() {
    this.tecnologia.variation.push(this.form.value.variacao);
  }

  onDeleted(variacao) {
    for (let i = 0; i < this.variacoes.length; i++) {
      if(this.variacoes[i] == variacao){
        this.variacoes.splice(i, 1);
        break;
      }
    }
    this.tecnologia.variation = this.variacoes;
    this.apiService.custom_objects_update('technology', this.tecnologia)
      .subscribe((data: Technology) => {
        if (!data.error) {
          this.appService.openSnackBar('Variação removida', 'ok');
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Fecha a caixa de dialogo */
  onNoClick(): void {
    this.dialogRef.close();
  }
}