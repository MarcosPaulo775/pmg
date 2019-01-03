import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../../stock/component/stock.component';
import { Chapa } from 'src/app/shared/models/chapa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { Result_Chapa } from 'src/app/shared/models/api';

@Component({
  selector: 'app-out',
  templateUrl: './out.component.html',
  styleUrls: ['./out.component.css']
})
export class OutComponent implements OnInit {

  tipo: string;
  marca: string;
  chapas: Chapa[];
  form: FormGroup;
  chapa: Chapa;

  constructor(
    private stockComponent: StockComponent,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.stockComponent.title = 'Entrada';
    this.stockComponent.dashboard = '';
    this.stockComponent.setIn = '';
    this.stockComponent.setOut = 'rgb(0, 90, 176)';
    this.stockComponent.setGraphic = '';
    this.stockComponent.setTechnology = '';

    this.initForm();
    this.updateTable();
  }

  /** Inicializa Formulario */
  initForm() {
    this.form = this.formBuilder.group({
      tipo: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      altura: [null, [Validators.required]],
      largura: [null, [Validators.required]]
    });
  }

  /** Salva uma nova chapa */
  onSubmit() {
    if (this.form.valid) {
      this.getForm();
      this.apiService.custom_objects_create('chapa', this.chapa)
        .subscribe((data: Chapa) => {
          if (!data.error) {
            this.updateTable();
            this.initForm();
          } else {
            this.appService.session(data.error_code);
          }
        }, (data) => {
          console.log(data);
        })
    }
  }

  /** Busca dados do formulario */
  getForm() {
    let data = new Date();
    this.chapa = new Chapa();
    this.chapa.deleted = false;
    this.chapa.tipo = this.form.value.tipo;
    this.chapa.marca = this.form.value.marca;
    this.chapa.status = 'out';
    this.chapa.data = String(data.getFullYear()) + '-' + String(data.getMonth() + 1) + '-' + String(data.getDay());

    if (this.form.value.largura.split('').length == 4) {
      this.chapa.largura = String((Number(this.form.value.largura) * 0.1).toFixed(1));
      this.form.value.largura = this.chapa.largura;
    } else {
      this.chapa.largura = String(Number(this.form.value.largura).toFixed(1));
    }

    if (this.form.value.altura.split('').length == 4) {
      this.chapa.altura = String((Number(this.form.value.altura) * 0.1).toFixed(1));
      this.form.value.altura = this.chapa.altura;
    } else {
      this.chapa.altura = String(Number(this.form.value.altura).toFixed(1));
    }

    this.chapa.area = String((Number(this.form.value.largura) * Number(this.form.value.altura)).toFixed(1));
  }

  /** Aturaliza dados da tabela */
  updateTable() {
    this.apiService.custom_objects_list('chapa', ['deleted', 'equal to', false, 'and', 'status', 'equal to', 'out'], ' ')
      .subscribe((data: Result_Chapa) => {
        if (!data.error) {
          this.chapas = data.results;
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      })
  }

  /** Marca item como deletado */
  onDeleted(id: string) {
    this.apiService.custom_objects_set_keys('chapa', id, { 'deleted': true })
      .subscribe((data: Chapa) => {
        if (!data.error) {
          this.appService.openSnackBar('Excluido', 'ok');
          this.updateTable();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  onIn(id){
    this.apiService.custom_objects_set_keys('chapa', id, { 'status': 'in' })
      .subscribe((data: Chapa) => {
        if (!data.error) {
          this.appService.openSnackBar('Excluido', 'ok');
          this.updateTable();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }
}
