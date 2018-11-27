import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OS, Color } from '../../../shared/models/os';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogFinanceiroComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFinanceiroComponent>,
    @Inject(MAT_DIALOG_DATA) public color: Color) {

    this.form = this.formBuilder.group({
      altura: [null, []],
      largura: [null, []]
    });

    this.color = color;
    this.getColor();
  }

  getColor() {

    this.form.get('altura').setValue(this.color.altura);
    this.form.get('largura').setValue(this.color.largura);

  }

  getForm() {
    this.color.altura = this.form.get('altura').value;
    this.color.largura = this.form.get('largura').value;
    //this.color.valor = Number(this.color.altura) * Number(this.color.largura);
  }

  onAdd(): void {

    this.getForm();

    this.dialogRef.close(this.color);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}