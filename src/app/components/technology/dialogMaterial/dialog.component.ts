import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';

import { OS, Technology } from '../../../shared/models/os';
import { Result_OS } from 'src/app/shared/models/api';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { DialogConfirmComponent } from '../../confirm/confirm.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogMaterialComponent {

  form: FormGroup;
  materiais: string[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

    public dialogRef: MatDialogRef<DialogMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public tecnologia: Technology,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    private apiService: ApiService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.initForm();
    this.materiais = this.tecnologia.material;
  }
  
  initForm(){
    this.form = this.formBuilder.group({
      material: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.getForm();
    this.apiService.custom_objects_update('technology', this.tecnologia)
      .subscribe((data: Technology) => {
        if (!data.error) {
          this.appService.openSnackBar('Adicionado novo material', 'ok');
          this.initForm();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  getForm() {
    this.tecnologia.material.push(this.form.value.material);
  }

  onDeleted(material) {
    for (let i = 0; i < this.materiais.length; i++) {
      if(this.materiais[i] == material){
        this.materiais.splice(i, 1);
        break;
      }
    }
    this.tecnologia.material = this.materiais;
    this.apiService.custom_objects_update('technology', this.tecnologia)
      .subscribe((data: Technology) => {
        if (!data.error) {
          this.appService.openSnackBar('Material removido', 'ok');
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