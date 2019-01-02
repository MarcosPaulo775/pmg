import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { OS, Details } from 'src/app/shared/models/os';
import { Result_Item, Result_Company } from 'src/app/shared/models/api';

@Component({
  selector: 'app-new-preset',
  templateUrl: './new-preset.component.html',
  styleUrls: ['./new-preset.component.css']
})
export class NewPresetComponent implements OnInit {

  form: FormGroup;
  orm: FormGroup;
  os: OS;
  details_view: boolean;
  details_spinner: boolean;
  details: FormGroup;

  spinner: boolean;

  clientes: string[];
  pedidos: string[];
  tecnologia: string[];
  variacao: string[];
  material: string[];
  lineatura: string[];
  espessura: string[];
  camada: string[];
  local: string[];
  substrato: string[];
  face: string[];
  angulo: string[];
  perfil: string[];
  dupla: string[];

  substrato_prova: string[];

  constructor(
    private formBuilder: FormBuilder,

    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    private production: ProductionComponent,
    private apiService: ApiService,
    private appService: AppService
    ) { }

  ngOnInit() {
    this.production.title = 'Nova Predefinição';
    this.production.dashboard = '';
    this.production.preset = '';
    this.production.jobs = '';
    this.production.storage = '';

    this.initForms();
  }

  /** Inicializa os formularios */
  initForms() {
    this.form = this.formBuilder.group({
      tecnologia: [null, []],
      variacao: [null, []],
      material: [null, []],
      substrato: [null, []],
      lineatura_1: [null, []],
      lineatura_2: [null, []],
      espessura: [null, []],
      camada: [null, []],
      local: [null, []],
      angulo: [null, []],
      jogos: [null, []],
      perfil: [null, []],
      face: [null, []],
      observacoes_cores: [null, []],
      observacoes_cliche: [null, []],

      color: [null, []],
      fotocelula: [null, []],
      unitario: [null, []],
      camerom: [null, []],

      fechado: [null, []],
      z: [null, []],
      desenvolvimento: [null, []],
      fechamento: [null, []],
      qtpistas: [null, []],
      entre_pistas: [null, []],
      qtpasso: [null, []],
      entre_passos: [null, []],
      manta: [null, []],
      faca: [null, []],
      esquerda: [null, []],
      direita: [null, []],
      topo: [null, []],
      base: [null, []],
      esquerda_mm: [null, []],
      direita_mm: [null, []],
      topo_mm: [null, []],
      base_mm: [null, []],
      refile: [null, []],
      corte: [null, []],
      cameron: [null, []],
      microponto: [null, []],
      largura: [null, []],
      altura: [null, []],
      largura_material: [null, []],
      obs_montagem: [null, []],

      substrato_prova: [null, []],
      velocidade: [null, []],
      dupla: [null, []],
      temperatura: [null, []],
      horario: [null, []],
      obs_prova: [null, []],

      terceiro: [null, []],
      cobranca: [null, []],
      compra: [null, []],
      cobrar: [null, []],
      obs_financeiro: [null, []],

    });

    if (localStorage.getItem('_id')) {
      this.getOs();
    }
    else {

      this.apiService.custom_objects_list('request', '', { '': 'name' })
        .subscribe((data: Result_Item) => {
          if (!data.error_code) {
            this.pedidos = new Array<string>();
            for (let i = 0; i < data.results.length; i++) {
              this.pedidos.push(data.results[i].name);
            }
          }
        }, (data) => {
          console.log(data);
        });

      this.apiService.custom_objects_list('company', ['deleted', 'equal to', false], { '': 'razao' })
        .subscribe((data: Result_Company) => {
          if (!data.error_code) {
            this.clientes = new Array<string>();
            for (let i = 0; i < data.results.length; i++) {
              this.clientes.push(data.results[i].razao);
            }
          }
        }, (data) => {
          console.log(data);
        });
    }
  }

  /** Busca a ordem de serviço no banco de dados */
  getOs() {
    this.apiService.custom_objects_get('os', localStorage.getItem('_id'))
      .subscribe((data: OS) => {
        if (!data.error_code) {
          this.os = data;
          this.form.get('nome').setValue(this.os.nome);
          this.form.get('data').setValue(this.os.data);
          this.form.get('codigo').setValue(this.os.codigo);
          this.form.get('barra').setValue(this.os.barra);

          this.apiService.custom_objects_list('company', ['deleted', 'equal to', false], { '': 'razao' })
            .subscribe((data: Result_Company) => {
              if (!data.error_code) {
                this.clientes = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.clientes.push(data.results[i].razao);
                }
                if (this.clientes.indexOf(this.os.cliente)) {
                  this.clientes.push(this.os.cliente);
                }
                this.form.get('clientes').setValue(this.os.cliente);
              }
            }, (data) => {
              console.log(data);
            });

          this.apiService.custom_objects_list('request', '', { '': 'name' })
            .subscribe((data: Result_Item) => {
              if (!data.error_code) {
                this.pedidos = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.pedidos.push(data.results[i].name);
                }
                this.form.get('pedidos').setValue(this.os.pedido);
              }
            }, (data) => {
              console.log(data);
            });

          this.getDetail();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        this.appService.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /**Busca os detalhes da ordem de serviço no banco de dados */
  getDetail() {

    this.details_spinner = true;

    this.apiService.custom_objects_get('details', '5c24fb37440b001700000003')
      .subscribe((data: Details) => {
        if (!data.error_code) {

          this.tecnologia = data.technology;
          this.variacao = data.variation;
          this.material = data.material;
          this.substrato = data.substrate;
          this.substrato_prova = data.substrate;
          this.espessura = data.thickness;
          this.camada = data.layer;
          this.local = data.local;
          this.lineatura = data.lineatura;
          this.angulo = data.angle;
          this.perfil = data.profile;
          this.face = data.face;
          this.dupla = data.double;
          this.details.get('tecnologia').setValue(this.os.tecnologia);
          this.details.get('variacao').setValue(this.os.variacao);
          this.details.get('material').setValue(this.os.material);
          this.details.get('substrato').setValue(this.os.substrato);
          this.details.get('substrato_prova').setValue(this.os.substrato_prova);
          this.details.get('espessura').setValue(this.os.espessura);
          this.details.get('camada').setValue(this.os.camada);
          this.details.get('local').setValue(this.os.local);
          this.details.get('perfil').setValue(this.os.perfil);
          this.details.get('face').setValue(this.os.face);
          this.details.get('dupla').setValue(this.os.dupla);
          this.details_view = true;
          this.details_spinner = false;
        }
      }, (data) => {
        console.log(data);
      });

    this.details.get('observacoes_cliche').setValue(this.os.obs_cliche);
    this.details.get('observacoes_cores').setValue(this.os.obs_color);

    this.details.get('fechado').setValue(this.os.fechado);
    this.details.get('z').setValue(this.os.z);
    this.details.get('desenvolvimento').setValue(this.os.desenvolvimento);
    this.details.get('fechamento').setValue(this.os.fechamento);
    this.details.get('qtpistas').setValue(this.os.qtpistas);
    this.details.get('entre_pistas').setValue(this.os.entre_pistas);
    this.details.get('qtpasso').setValue(this.os.qtpasso);
    this.details.get('entre_passos').setValue(this.os.entre_passos);
    this.details.get('manta').setValue(this.os.manta);
    this.details.get('faca').setValue(this.os.faca);
    this.details.get('esquerda').setValue(this.os.esquerda);
    this.details.get('direita').setValue(this.os.direita);
    this.details.get('topo').setValue(this.os.topo);
    this.details.get('base').setValue(this.os.base);
    this.details.get('esquerda_mm').setValue(this.os.esquerda_mm);
    this.details.get('direita_mm').setValue(this.os.direita_mm);
    this.details.get('topo_mm').setValue(this.os.topo_mm);
    this.details.get('refile').setValue(this.os.refile);
    this.details.get('corte').setValue(this.os.corte);
    this.details.get('cameron').setValue(this.os.cameron);
    this.details.get('microponto').setValue(this.os.microponto);
    this.details.get('largura').setValue(this.os.largura);
    this.details.get('altura').setValue(this.os.altura);
    this.details.get('largura_material').setValue(this.os.largura_material);
    this.details.get('obs_montagem').setValue(this.os.obs_montagem);
  }

}
