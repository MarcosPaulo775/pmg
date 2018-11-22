import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Color, FormColor } from '../../../shared/models/os';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogColorComponent {

  colors: Color[];
  filteredColors: Observable<Color[]>;
  form: FormGroup;
  lineatura: string[];
  angulo: string[];
  color: Color;

  private _filter(value: string): Color[] {
    const filterValue = value.toLowerCase();

    return this.colors.filter(color => color.Color.toLowerCase().indexOf(filterValue) === 8);
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogColorComponent>,
    @Inject(MAT_DIALOG_DATA) public formColor: FormColor) {

    this.form = this.formBuilder.group({
      lineatura_1: [null, []],
      lineatura_2: [null, []],
      espessura: [null, []],
      camada: [null, []],
      local: [null, []],
      angulo: [null, []],
      jogos: [null, []],
      color: [null, []],
      fotocelula: [null, []],
      unitario: [null, []],
      camerom: [null, []]
    });

    this.color = formColor.color;
    if (!formColor.color._id) {
      this.colors = formColor.colors;
    }
    this.lineatura = formColor.lineatura;
    this.angulo = formColor.angulo;

    this.getColor();

    this.filteredColors = this.form.get('color').valueChanges
      .pipe(
        startWith(''),
        map(color => color ? this._filter(color) : this.colors.slice())
      );

  }

  getColor() {

    this.form.get('color').setValue(this.color.Color);
    this.form.get('lineatura_1').setValue(this.color.lineatura1);
    this.form.get('lineatura_2').setValue(this.color.lineatura2);
    this.form.get('angulo').setValue(this.color.angulo);
    this.form.get('fotocelula').setValue(this.color.fotocelula);
    this.form.get('unitario').setValue(this.color.unitario);
    this.form.get('camerom').setValue(this.color.camerom);
    this.form.get('jogos').setValue(this.color.jogos);

  }

  getForm() {
    this.color.Color = this.form.get('color').value;
    this.color.lineatura1 = this.form.get('lineatura_1').value;
    this.color.lineatura2 = this.form.get('lineatura_2').value;
    this.color.angulo = this.form.get('angulo').value;
    this.color.fotocelula = this.form.get('fotocelula').value;
    this.color.unitario = this.form.get('unitario').value;
    this.color.camerom = this.form.get('camerom').value;
    this.color.jogos = String(this.form.get('jogos').value);

  }

  onAdd(): void {

    this.getForm();

    this.dialogRef.close(this.color);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}