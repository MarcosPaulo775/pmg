import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OS, Color } from '../../../shared/models/os';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogProvaComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogProvaComponent>,
    @Inject(MAT_DIALOG_DATA) public color: Color) {

    this.form = this.formBuilder.group({
      anilox: [null, []],
      densidade: [null, []],
      ganho: [null, []],
      bcm: [null, []]
    });

    this.color = color;
    this.getColor();
  }

  getColor() {

    this.form.get('anilox').setValue(this.color.anilox);
    this.form.get('densidade').setValue(this.color.densidade);
    this.form.get('ganho').setValue(this.color.ganho);
    this.form.get('bcm').setValue(this.color.bcm);

  }

  getForm() {
    this.color.anilox = this.form.get('anilox').value;
    this.color.densidade = this.form.get('densidade').value;
    this.color.ganho = this.form.get('ganho').value;
    this.color.bcm = this.form.get('bcm').value;
  }

  onAdd(): void {

    this.getForm();

    this.dialogRef.close(this.color);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}