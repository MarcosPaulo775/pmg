import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Color } from '../../../shared/models/os';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogFinanceiroComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFinanceiroComponent>,
    @Inject(MAT_DIALOG_DATA) public color: Color
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** Inicializa formulario */
  initForm() {
    this.form = this.formBuilder.group({
      altura: [null, []],
      largura: [null, []]
    });
    this.getColor();
  }

  /** Preenche formulario */
  getColor() {
    this.form.get('altura').setValue(this.color.altura);
    this.form.get('largura').setValue(this.color.largura);
  }

  /** Busca dados do formulario */
  getForm() {
    this.color.altura = this.form.get('altura').value;
    this.color.largura = this.form.get('largura').value;
  }

  /** Busca dados do formulario e fecha a janela */
  onAdd(): void {
    this.getForm();
    this.dialogRef.close(this.color);
  }

  /** Fecha a janela */
  onNoClick(): void {
    this.dialogRef.close();
  }

}