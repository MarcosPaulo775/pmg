import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OsService } from 'src/app/core/http/os.service';
import { Item, Result_Item } from '../../../shared/models/api';
import { Os, Detail } from 'src/app/shared/models/os';

export interface PeriodicElement {
  position: number;
  cor: string;
  lineatura_1: number;
  lineatura_2: number;
  angulo: number;
  jogos: number;
  configs: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 0, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla' },
  { position: 1, cor: 'Verde', lineatura_1: 2, lineatura_2: 2, angulo: 2, jogos: 2, configs: 'bla' },
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'cor', 'lineatura_1', 'lineatura_2', 'angulo', 'jogos', 'configs', 'excluir'];
  dataSource = ELEMENT_DATA;

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep(n: string) {
    this.save(n);
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  tecnologia: string[];
  variacao: string[];
  material: string[];
  lineatura: string[];
  espessura: string[];
  camada: string[];
  local: string[];
  substrato: string[];
  face: string[];
  cliche: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private osService: OsService,
  ) { }

  ngOnInit() {
    this.cliche = this.formBuilder.group({
      tecnologia: [null, []],
      variacao: [null, []],
      material: [null, []],
      lineatura: [null, []],
      espessura: [null, []],
      camada: [null, []],
      local: [null, []],
      observacoes: [null, []],
    });

    if(localStorage.getItem('_id_Detail')){
      this.getDetail();
    }

  }

  getDetail() {
    this.osService.custom_objects_get('Detail', localStorage.getItem('_id_Detail'))
      .subscribe((data: Detail) => {

        if (data.error_code == null) {
          this.detail = data;

          this.osService.custom_objects_list('technology', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.tecnologia = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.tecnologia.push(data.results[i].name);
                }
                this.cliche.get('tecnologia').setValue(this.detail.tecnologia);
              }
            }, (data) => {
            });

          this.osService.custom_objects_list('variation', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.variacao = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.variacao.push(data.results[i].name);
                }
                this.cliche.get('variacao').setValue(this.detail.varicacao);
              }
            }, (data) => {
            });

          this.osService.custom_objects_list('material', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.material = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.material.push(data.results[i].name);
                }
                this.cliche.get('material').setValue(this.detail.material);
              }
            }, (data) => {
            });

          this.osService.custom_objects_list('lineatura', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.lineatura = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.lineatura.push(data.results[i].name);
                }
                this.cliche.get('lineatura').setValue(this.detail.lineatura);
              }
            }, (data) => {
            });

          this.osService.custom_objects_list('thickness', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.espessura = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.espessura.push(data.results[i].name);
                }
                this.cliche.get('espessura').setValue(this.detail.espessura);
              }
            }, (data) => {
            });

          this.osService.custom_objects_list('layer', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.camada = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.camada.push(data.results[i].name);
                }
                this.cliche.get('camada').setValue(this.detail.camada);
              }
            }, (data) => {
            });

          this.osService.custom_objects_list('local', '', 'name')
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.local = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.local.push(data.results[i].name);
                }
                this.cliche.get('local').setValue(this.detail.local);
              }
            }, (data) => {
            });

          this.cliche.get('observacoes').setValue(this.detail.obs_cliche);
        }
      }, (data) => { });
  }

  detail: Detail;
  save(n: string) {

    if (n = 'cliche') {
      this.detail.tecnologia = this.cliche.get('tecnologia').value;
      this.detail.varicacao = this.cliche.get('variacao').value;
      this.detail.material = this.cliche.get('material').value;
      this.detail.lineatura = this.cliche.get('lineatura').value;
      this.detail.espessura = this.cliche.get('espessura').value;
      this.detail.camada = this.cliche.get('camada').value;
      this.detail.local = this.cliche.get('local').value;
      this.detail.obs_cliche = this.cliche.get('observacoes').value;
      this.osService.custom_objects_update('Detail', this.detail)
        .subscribe((data) => {
        }, (data) => { }
        );
    }
  }

}
