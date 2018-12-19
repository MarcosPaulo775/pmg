import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Color } from '../../../shared/models/os';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogProvaComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProvaComponent>,
    @Inject(MAT_DIALOG_DATA) public color: Color
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** inicializa formulario */
  initForm() {
    this.form = this.formBuilder.group({
      anilox: [null, []],
      densidade: [null, []],
      ganho: [null, []],
      bcm: [null, []]
    });
    this.getColor();
  }

  /** Preenche formulario */
  getColor() {
    this.form.get('anilox').setValue(this.color.anilox);
    this.form.get('densidade').setValue(this.color.densidade);
    this.form.get('ganho').setValue(this.color.ganho);
    this.form.get('bcm').setValue(this.color.bcm);
  }

  /** Busca dados do formulario */
  getForm() {
    this.color.anilox = this.form.get('anilox').value;
    this.color.densidade = this.form.get('densidade').value;
    this.color.ganho = this.form.get('ganho').value;
    this.color.bcm = this.form.get('bcm').value;
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