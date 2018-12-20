import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { MatSnackBar, MatDialog } from '@angular/material';

import { ApiService } from '../../../core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { ProductionComponent } from '../../production/component/production.component';
import { DialogProvaComponent } from '../dialogProva/dialog.component';
import { DialogColorComponent } from '../dialogColor/dialog.component';
import { DialogMedidasComponent } from '../dialogMedidas/dialog.component';
import { DialogFinanceiroComponent } from '../dialogFinanceiro/dialog.component';
import { OS, Color, FormColor } from '../../../shared/models/os';
import {
  Count,
  Result_OS,
  Result_Item,
  Result_Color,
  Result_Company,
  Flow,
  Workable,
  Result_DimensionColor
} from '../../../shared/models/api';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  form: FormGroup;
  os: OS;
  details_view: boolean;
  details: FormGroup;
  progress: Subject<number>;

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

  filteredColors: Observable<Color[]>;

  color: Color;

  colors: Color[];
  disabled = true;
  t: number = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    private production: ProductionComponent,
    private apiService: ApiService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.os = new OS();
    this.os.colors = new Array<Color>();
    this.production.title = 'Ordem de serviço';
    this.production.dashboard = '';
    this.production.print = '';
    this.production.jobs = '';
    this.production.storage = '';

    this.initForms();
  }

  /** Inicializa os formularios */
  initForms() {
    this.details = this.formBuilder.group({
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

    this.form = this.formBuilder.group({
      clientes: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      pedidos: [null, [Validators.required]],
      codigo: [null, []],
      data: [null, []],
      barra: [null, []]
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

  /** Desabilita alguns itens do formulario */
  fechado() {
    this.disabled = !this.details.get('fechado').value;
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
          this.details_view = true;
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        this.appService.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /**Busca os detalhes da ordem de serviço no banco de dados */
  getDetail() {
    this.apiService.custom_objects_list('technology', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.tecnologia = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.tecnologia.push(data.results[i].name);
          }
          this.details.get('tecnologia').setValue(this.os.tecnologia);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('variation', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.variacao = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.variacao.push(data.results[i].name);
          }
          this.details.get('variacao').setValue(this.os.variacao);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('material', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.material = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.material.push(data.results[i].name);
          }
          this.details.get('material').setValue(this.os.material);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('substrate', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.substrato = new Array<string>();
          this.substrato_prova = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.substrato.push(data.results[i].name);
            this.substrato_prova.push(data.results[i].name);
          }
          this.details.get('substrato').setValue(this.os.substrato);
          this.details.get('substrato_prova').setValue(this.os.substrato_prova);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('thickness', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.espessura = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.espessura.push(data.results[i].name);
          }
          this.details.get('espessura').setValue(this.os.espessura);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('layer', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.camada = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.camada.push(data.results[i].name);
          }
          this.details.get('camada').setValue(this.os.camada);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('local', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.local = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.local.push(data.results[i].name);
          }
          this.details.get('local').setValue(this.os.local);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('lineatura', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.lineatura = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.lineatura.push(data.results[i].name);
          }
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('angle', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.angulo = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.angulo.push(data.results[i].name);
          }
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('profile', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.perfil = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.perfil.push(data.results[i].name);
          }
          this.details.get('perfil').setValue(this.os.perfil);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('face', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.face = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.face.push(data.results[i].name);
          }
          this.details.get('face').setValue(this.os.face);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('pantone', '', null)
      .subscribe((data: Result_Color) => {
        if (!data.error_code) {
          this.colors = new Array<Color>();
          this.colors.push({ color: 'Cyan', hex: '00aeef' });
          this.colors.push({ color: 'Magenta', hex: 'ec008c' });
          this.colors.push({ color: 'Yellow', hex: 'fff200' });
          this.colors.push({ color: 'Black', hex: "231f20" });
          this.colors.push({ color: 'White', hex: 'ffffff' });
          this.colors = this.colors.concat(data.results);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('double', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (!data.error_code) {
          this.dupla = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.dupla.push(data.results[i].name);
          }
          this.details.get('dupla').setValue(this.os.dupla);
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

    this.details.get('substrato_prova').setValue(this.os.substrato_prova);
    this.details.get('velocidade').setValue(this.os.velocidade);
    this.details.get('temperatura').setValue(this.os.temperatura);
    this.details.get('horario').setValue(this.os.horario);
    this.details.get('obs_prova').setValue(this.os.obs_prova);
    this.disabled = this.os.fechado;

    this.details.get('terceiro').setValue(this.os.terceiro);
    this.details.get('cobranca').setValue(this.os.cobranca);
    this.details.get('compra').setValue(this.os.compra);
    this.details.get('cobrar').setValue(this.os.cobrar);
    this.details.get('obs_financeiro').setValue(this.os.obs_financeiro);
  }

  /** Adiciona as cores padrão */
  onAddCMYK() {
    this.addColor({ color: 'Cyan', hex: '00ffff' });
    this.addColor({ color: 'Magenta', hex: 'ff00ff' });
    this.addColor({ color: 'Yellow', hex: 'ffff00' });
    this.addColor({ color: 'Black', hex: "000000" });
    this.addColor({ color: 'White', hex: 'ffffff' });
  }

  /** Cria um ordem de serviço com os dados do formulario */
  getForm() {
    this.os.nome = this.form.get('nome').value;
    this.os.cliente = this.form.get('clientes').value;
    this.os.pedido = this.form.get('pedidos').value;
    this.os.data = this.form.get('data').value;
    this.os.codigo = this.form.get('codigo').value;
    this.os.barra = this.form.get('barra').value;

    this.os.tecnologia = this.details.get('tecnologia').value;
    this.os.variacao = this.details.get('variacao').value;
    this.os.material = this.details.get('material').value;
    this.os.substrato = this.details.get('substrato').value;
    this.os.espessura = this.details.get('espessura').value;
    this.os.camada = this.details.get('camada').value;
    this.os.local = this.details.get('local').value;
    this.os.face = this.details.get('face').value;
    this.os.obs_cliche = this.details.get('observacoes_cliche').value;

    this.os.perfil = this.details.get('perfil').value;
    this.os.obs_color = this.details.get('observacoes_cores').value;

    this.os.fechado = this.details.get('fechado').value;
    this.os.z = this.details.get('z').value;
    this.os.desenvolvimento = this.details.get('desenvolvimento').value;
    this.os.fechamento = this.details.get('fechamento').value;
    this.os.qtpistas = this.details.get('qtpistas').value;
    this.os.entre_pistas = this.details.get('entre_pistas').value;
    this.os.qtpasso = this.details.get('qtpasso').value;
    this.os.entre_passos = this.details.get('entre_passos').value;
    this.os.manta = this.details.get('manta').value;
    this.os.faca = this.details.get('faca').value;
    this.os.esquerda = this.details.get('esquerda').value;
    this.os.direita = this.details.get('direita').value;
    this.os.topo = this.details.get('topo').value;
    this.os.base = this.details.get('base').value;
    this.os.esquerda_mm = this.details.get('esquerda_mm').value;
    this.os.direita_mm = this.details.get('direita_mm').value;
    this.os.topo_mm = this.details.get('topo_mm').value;
    this.os.base_mm = this.details.get('base_mm').value;
    this.os.refile = this.details.get('refile').value;
    this.os.corte = this.details.get('corte').value;
    this.os.cameron = this.details.get('cameron').value;
    this.os.microponto = this.details.get('microponto').value;
    this.os.largura = this.details.get('largura').value;
    this.os.altura = this.details.get('altura').value;
    this.os.largura_material = this.details.get('largura_material').value;
    this.os.obs_montagem = this.details.get('obs_montagem').value;

    this.os.substrato_prova = this.details.get('substrato_prova').value;
    this.os.velocidade = this.details.get('velocidade').value;
    this.os.dupla = this.details.get('dupla').value;
    this.os.temperatura = this.details.get('temperatura').value;
    this.os.horario = this.details.get('horario').value;
    this.os.obs_prova = this.details.get('obs_prova').value;

    this.os.deleted = false;

    this.os.terceiro = this.details.get('terceiro').value;
    this.os.cobranca = this.details.get('cobranca').value;
    this.os.compra = this.details.get('compra').value;
    this.os.cobrar = this.details.get('cobrar').value;
    this.os.obs_financeiro = this.details.get('obs_financeiro').value;
  }

  /** Dispara quando aperta o botão salvar
   * Caso não tenha um id no localstorage ele cria uma Ordem de servico nova
   * Caso tenha um id no localstorage ele atualiza a Ordem de servico
   */
  onSubmit() {

    if (this.form.valid) {
      this.getForm();

      if (!localStorage.getItem("_id")) {
        this.os.versao = 1;
        this.os.os = '';
        this.save();
      } else {
        this.update();
      }
    }

  }

  /** Adiciona um cor */
  addColor(color: Color) {

    this.color = new Color();
    this.color = color;

    if (this.color.color) {
      if (this.color.jogos == undefined || this.color.jogos == null || this.color.jogos == "undefined") {
        this.color.jogos = '0';
      } else {
        this.color.jogos = color.jogos;
      }
      if (this.os.colors == undefined) {
        this.os.colors = new Array<Color>();
        this.color._id = 1;
      }
      else if (this.os.colors[0] == null) {
        this.os.colors = new Array<Color>();
        this.color._id = 1;
      } else {
        this.color._id = this.os.colors[this.os.colors.length - 1]._id + 1;
      }

      if (!this.color.hex) {
        for (let i = 0; i < this.colors.length; i++) {
          if (this.color.color === this.colors[i].color) {
            this.color.hex = this.colors[i].hex;
          }
        }
      }
      this.os.colors.push(this.color);
    }
  }

  /** Deleta uma cor */
  onDeleteColor(_id) {

    let temp = new Array<Color>();

    for (let i = 0; i < this.os.colors.length; i++) {
      if (_id != this.os.colors[i]._id) {
        temp.push(this.os.colors[i]);
      }
    }
    this.os.colors = temp;
    this.update();
  }

  /** Salva uma Ordem de serviço nova no banco de dados*/
  save() {

    this.details_view = true;

    // Salva uma versao nova
    if (localStorage.getItem('version') == 'true') {
      let os = this.os.os.split(' ');
      let versao = Number(os[2]);
      this.os.versao = versao + 1;
      this.os.os = os[0] + ' - ' + this.os.versao.toString();

      this.apiService.custom_objects_create('os', this.os)
        .subscribe((data: OS) => {
          if (!data.error) {
            localStorage.setItem('_id', data._id);
            localStorage.setItem('version', 'false');
            this.getOs();
            this.appService.openSnackBar('Nova Versão criada', 'OK');
          } else {
            this.appService.session(data.error_code);
          }
        }, (data) => {
          console.log(data);
          this.appService.openSnackBar('Erro ao salvar', 'OK');
        });
    }

    // Salva uma totalmente nova
    else {
      this.apiService.custom_objects_create('os', this.os)
        .subscribe((data: OS) => {
          if (!data.error) {
            this.os = data;
            this.nOs();
            localStorage.setItem('_id', this.os._id);
            localStorage.setItem('version', 'false');
            //this.openSnackBar('Salvo', 'OK');
          } else {
            this.appService.session(data.error_code);
          }
        }, (data) => {
          console.log(data);
          this.appService.openSnackBar('Erro ao salvar', 'OK');
        });
    }
  }

  /** Cria um numero para Ordem de servico */
  nOs() {
    this.apiService.custom_objects_list('os', '', { '_id': '_id' })
      .subscribe((data: Result_OS) => {
        if (!data.error) {

          for (let i = 0; i < data.results.length; i++) {
            if (this.os._id == data.results[i]._id) {
              let os = i + 1;
              this.os.os = os.toString() + " - " + this.os.versao.toString();
              this.update();
              break;
            }
          }
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
        this.appService.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /** Atualiza os dados de uma ordem de servico existente */
  update() {
    this.apiService.custom_objects_update('os', this.os)
      .subscribe((data: Count) => {
        if (!data.error) {
          this.getOs();
          this.appService.openSnackBar('Salvo', 'OK');
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
        this.appService.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /** Atualiza dados de uma cor */
  updateColor(color: Color) {
    this.color = new Color();
    for (let i = 0; i < this.os.colors.length; i++) {
      if (this.os.colors[i]._id == color._id) {
        this.os.colors[i] = color;
      }
    }
    this.onSubmit();
  }

  /** Janela de dialogo para editar cores da prova */
  editProva(color: Color): void {
    const dialogRef = this.dialog.open(DialogProvaComponent, {
      width: '800px',
      data: color
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateColor(result);
      }
    });
  }

  /** janela de dialogo para editar tamanho das cores */
  editFinanceiro(color: Color): void {
    const dialogRef = this.dialog.open(DialogFinanceiroComponent, {
      width: '800px',
      data: color
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateColor(result);
      }
    });
  }

  /** Abre janela de dialogo para adicionar cor */
  onAdd(): void {
    let formColor = new FormColor();
    formColor.color = new Color();
    formColor.colors = this.colors;
    formColor.angulo = this.angulo;
    formColor.lineatura = this.lineatura;
    const dialogRef = this.dialog.open(DialogColorComponent, {
      width: '1000px',
      data: formColor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addColor(result);
      }
    });
  }

  /** janela de dialogo para editar cor */
  editColor(color: Color): void {
    let formColor = new FormColor();
    formColor.color = color;
    formColor.colors = this.colors;
    formColor.angulo = this.angulo;
    formColor.lineatura = this.lineatura;
    const dialogRef = this.dialog.open(DialogColorComponent, {
      width: '800px',
      data: formColor
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateColor(result);
      }
    });
  }

  /** janela de Upload de arquivo */
  upload(): void {
    const dialogRef = this.dialog.open(DialogMedidasComponent, {
      width: '800px',
      data: this.os.os
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dimensionColor(result);
      }
    });
  }

  /** Inicia Fluxo do servidor para medir cores do PDF */
  dimensionColor(file: string) {
    this.spinner = true;
    this.apiService.hub_start_from_whitepaper_with_files_and_variables('medidas_os', 'input', ['cloudflow://PP_FILE_STORE/dimensionColor/' + file])
      .subscribe((data: Flow) => {

        if (!data.error) {

          this.workable(data.workable_id);
        }
      }, (data) => {
        console.log(data);
      })
  }

  /** Verifica a cada 2 segundos se o fluxo de medidas do servidor terminou*/
  workable(workable_id) {
    this.apiService.hub_get_waiting_room_of_workable(workable_id)
      .pipe(delay(2 * 1000)).subscribe((data: Workable) => {
        this.t = this.t + 2;

        console.log(this.t + ' segundos');

        if (!data.error) {
          if (data.collar == 'com.nixps.quantum.end.0') {
            this.getDimension();
          } else {
            this.workable(workable_id);
          }
        }
      }, (data) => {
        console.log(data);
      })
  }

  /** Busca no banco de dados as medidas geras pelo Fluxo de medidas */
  getDimension() {
    let temp = this.os.os.split(' ');

    let os = temp[0] + temp[1] + temp[2];
    this.apiService.custom_objects_list('dimensionColor', ['os', 'equal to', os], ' ')
      .subscribe((data: Result_DimensionColor) => {
        if (!data.error && data.results.length != 0) {

          let colors = data.results[data.results.length - 1].color;

          for (let i = 0; i < colors.length; i++) {
            colors[i].valor = '0.00';
            if (this.os.colors.length != 0) {
              let j;
              for (j = 0; j < this.os.colors.length; j++) {
                if (this.os.colors[j].color == colors[i].color) {
                  this.os.colors[j].altura = colors[i].altura;
                  this.os.colors[j].largura = colors[i].largura;
                  break;
                }
              }
              if (j == this.os.colors.length && this.os.colors[j - 1].color != colors[i].color) {
                this.addColor(colors[i]);
              }
            } else {
              this.addColor(colors[i]);
            }
          }

          this.calcular(this.details.get('cobrar').value);

          this.apiService.custom_objects_delete('dimensionColor', data.results[data.results.length - 1]._id)
            .subscribe((data) => {
            }, (data) => {
              console.log(data);
            });

          this.spinner = false;
        }
      }, (data) => {
        console.log(data);
      });
  }


  /** Faz um busca no preço no cadastro do cliente e calcula o valor do material com o tamnhanho das cores */
  calcular(checked: boolean) {
    let moeda = 0;
    if (this.os.colors != null && this.os.colors != undefined) {
      if (checked) {
        this.apiService.custom_objects_list('company', ['razao', 'equal to', this.os.cliente],
          {
            'kodak_114': 'kodak_114',
            'kodak_170': 'kodak_170',
            'digital_284': 'digital_284',
            'top_flat_170': 'top_flat_170',
            'top_flat_114': 'top_flat_114',
            'margem_u': 'margem_u',
            'margem_d': 'margem_d',
            'margem_l': 'margem_l',
            'margem_r': 'margem_r'
          })
          .subscribe((data: Result_Company) => {
            if (!data.error) {

              if (this.os.tecnologia === 'Kodak NX' && this.os.espessura === '1.14') {
                moeda = Number(data.results[0].kodak_114);
              } else if (this.os.tecnologia === 'Kodak NX' && this.os.espessura === '1.7') {
                moeda = Number(data.results[0].kodak_170);
              } else if (this.os.tecnologia === 'Digital' && this.os.espessura === '2.84') {
                moeda = Number(data.results[0].digital_284);
              } else if (this.os.tecnologia === 'Top Flat PMG' && this.os.espessura === '1.7') {
                moeda = Number(data.results[0].top_flat_170);
              } else if (this.os.tecnologia === 'Top Flat PMG' && this.os.espessura === '1.14') {
                moeda = Number(data.results[0].top_flat_114);
              } else {
                moeda = 0;
                this.appService.openSnackBar('Falta cadastrar a tecnologia e espessura e salvar', 'ok');
              }

              moeda = moeda * 0.001;
              let total = 0;

              for (let i = 0; i < this.os.colors.length; i++) {
                let altura = (Number(this.os.colors[i].altura) * 0.1) + Number(data.results[0].margem_u) + Number(data.results[0].margem_d);
                let largura = (Number(this.os.colors[i].largura) * 0.1) + Number(data.results[0].margem_l) + Number(data.results[0].margem_r);
                let area = altura * largura;
                let valor = moeda * area;
                if (valor) {
                  this.os.colors[i].valor = valor.toFixed(2);
                  total = total + valor;
                } else {
                  this.os.colors[i].valor = '0.00';
                }
              }
              this.os.valor = total.toFixed(2);
            }

          }, (data) => {
            console.log(data);
          });
      } else {
        for (let i = 0; i < this.os.colors.length; i++) {
          this.os.colors[i].valor = '0.00';
        } this.os.valor = '0.00';
      }
    }
  }

  /** Dispara quando aperta o botao de criar uma nova versao */
  onVersion() {
    this.os.versao++;
    localStorage.removeItem('_id');
    localStorage.setItem('version', 'true');
    this.save();
  }

  /** Download do Layout */
  downloadPDF() {
    this.appService.downloadOS(this.os);
  }

  /** Imprime Layout */
  print() {
    this.appService.printOS(this.os);
  }

}
