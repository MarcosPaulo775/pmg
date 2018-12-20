import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Color, FormColor } from '../../../shared/models/os';

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

  /** Filtro de cores */
  private _filter(value: string): Color[] {
    const filterValue = value.toLowerCase();
    return this.colors.filter(color => color.color.toLowerCase().indexOf(filterValue) === 8);
  }

  constructor(
    private formBuilder: FormBuilder,

    public dialogRef: MatDialogRef<DialogColorComponent>,
    @Inject(MAT_DIALOG_DATA) public formColor: FormColor
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** inicializa o formulario */
  initForm() {
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

    this.color = this.formColor.color;
    if (!this.formColor.color._id) {
      this.colors = this.formColor.colors;
    }
    this.lineatura = this.formColor.lineatura;
    this.angulo = this.formColor.angulo;

    this.getColor();

    this.filteredColors = this.form.get('color').valueChanges
      .pipe(
        startWith(''),
        map(color => color ? this._filter(color) : this.colors.slice())
      );
  }

  /** Preenche dados do formulario */
  getColor() {
    this.form.get('color').setValue(this.color.color);
    this.form.get('lineatura_1').setValue(this.color.lineatura1);
    this.form.get('lineatura_2').setValue(this.color.lineatura2);
    this.form.get('angulo').setValue(this.color.angulo);
    this.form.get('fotocelula').setValue(this.color.fotocelula);
    this.form.get('unitario').setValue(this.color.unitario);
    this.form.get('camerom').setValue(this.color.camerom);
    this.form.get('jogos').setValue(this.color.jogos);
  }

  /** Busca dados do formulario */
  getForm() {
    this.color.color = this.form.get('color').value;
    this.color.lineatura1 = this.form.get('lineatura_1').value;
    this.color.lineatura2 = this.form.get('lineatura_2').value;
    this.color.angulo = this.form.get('angulo').value;
    this.color.fotocelula = this.form.get('fotocelula').value;
    this.color.unitario = this.form.get('unitario').value;
    this.color.camerom = this.form.get('camerom').value;
    this.color.jogos = String(this.form.get('jogos').value);
    this.color.valor = '0.00';
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