import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/http/api.service';
import { Os, Color } from '../../../shared/models/os';
import { Count, Result_OS, Result_Item, Result_Color } from '../../../shared/models/api';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as URL from '../../../core/http/url';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  form: FormGroup;
  os: Os;
  details_view: boolean;
  details: FormGroup;
  progress: Subject<number>;

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

  filteredColors: Observable<Color[]>;

  color: Color;

  colors: Color[];
  disabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private production: ProductionComponent,
    private apiService: ApiService,
    public snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) { }

  private _filter(value: string): Color[] {
    const filterValue = value.toLowerCase();

    return this.colors.filter(color => color.Color.toLowerCase().indexOf(filterValue) === 8);
  }

  ngOnInit() {
    this.os = new Os();
    this.production.title = 'Ordem de serviço';

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
      obs_prova: [null, []]
    });

    this.filteredColors = this.details.get('color').valueChanges
      .pipe(
        startWith(''),
        map(color => color ? this._filter(color) : this.colors.slice())
      );

    this.form = this.formBuilder.group({
      cliente: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      pedidos: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      data: [null, [Validators.required]],
      barra: [null, [Validators.required]]
    });

    if (localStorage.getItem('_id')) {
      this.getOs();
    }
    else {

      this.apiService.custom_objects_list('request', '', { '': 'name' })
        .subscribe((data: Result_Item) => {
          if (data.error_code == null) {
            this.pedidos = new Array<string>();
            for (let i = 0; i < data.results.length; i++) {
              this.pedidos.push(data.results[i].name);
            }
          }
        }, (data) => {
        });
    }

  }

  /** Upload de arquivo */
  inputFileChange(event) {
    console.log('Passou');

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData;
      formData.append('session', 'session', 'session');
      formData.append('file', file, file.name);

      const req = new HttpRequest('POST', URL.server + '/upload', formData, {
        reportProgress: true
      });

      this.progress = new Subject<number>();

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          this.progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          this.progress.complete();
        }
      });
    }
  }

  /** Busca a ordem de serviço no banco de dados */
  getOs() {
    this.apiService.custom_objects_get('Os', localStorage.getItem('_id'))
      .subscribe((data: Os) => {
        if (data.error_code == null) {
          this.os = data;
          this.form.get('nome').setValue(this.os.nome);
          this.form.get('cliente').setValue(this.os.cliente);
          this.form.get('data').setValue(this.os.data);
          this.form.get('codigo').setValue(this.os.codigo);
          this.form.get('barra').setValue(this.os.barra);

          this.apiService.custom_objects_list('request', '', { '': 'name' })
            .subscribe((data: Result_Item) => {
              if (data.error_code == null) {
                this.pedidos = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.pedidos.push(data.results[i].name);
                }
                this.form.get('pedidos').setValue(this.os.pedido);
              }
            }, (data) => {
            });

          this.getDetail();
          this.details_view = true;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /**Busca o id do detalhes da ordem de serviço no banco de dados */
  getDetail() {
    this.apiService.custom_objects_list('technology', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.tecnologia = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.tecnologia.push(data.results[i].name);
          }
          this.details.get('tecnologia').setValue(this.os.tecnologia);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('variation', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.variacao = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.variacao.push(data.results[i].name);
          }
          this.details.get('variacao').setValue(this.os.varicacao);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('material', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.material = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.material.push(data.results[i].name);
          }
          this.details.get('material').setValue(this.os.material);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('substrate', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.substrato = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.substrato.push(data.results[i].name);
          }
          this.details.get('substrato').setValue(this.os.substrato);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('thickness', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.espessura = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.espessura.push(data.results[i].name);
          }
          this.details.get('espessura').setValue(this.os.espessura);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('layer', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.camada = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.camada.push(data.results[i].name);
          }
          this.details.get('camada').setValue(this.os.camada);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('local', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.local = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.local.push(data.results[i].name);
          }
          this.details.get('local').setValue(this.os.local);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('lineatura', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.lineatura = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.lineatura.push(data.results[i].name);
          }
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('angle', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.angulo = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.angulo.push(data.results[i].name);
          }
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('profile', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.perfil = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.perfil.push(data.results[i].name);
          }
          this.details.get('perfil').setValue(this.os.perfil);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('face', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.face = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.face.push(data.results[i].name);
          }
          this.details.get('face').setValue(this.os.face);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('pantone', '', null)
      .subscribe((data: Result_Color) => {
        if (data.error_code == null) {
          this.colors = new Array<Color>();
          this.colors.push({ Color: 'Preto', Hex: "#000000" });
          this.colors.push({ Color: 'Amarelo', Hex: '#ffff00' });
          this.colors.push({ Color: 'Magenta', Hex: '#ff00ff' });
          this.colors.push({ Color: 'Ciano', Hex: '#00ffff' });
          for (let i = 0; i < data.results.length; i++) {
            data.results[i].Hex = '#' + data.results[i].Hex;
            data.results[i].Color = 'Pantone ' + data.results[i].Color;
            this.colors.push(data.results[i]);
          }
        }
      }, (data) => {
      });

    this.apiService.custom_objects_list('double', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.dupla = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.dupla.push(data.results[i].name);
          }
          this.details.get('dupla').setValue(this.os.dupla);
        }
      }, (data) => {
      });

    this.details.get('observacoes_cliche').setValue(this.os.obs_cliche);
    this.details.get('observacoes_cores').setValue(this.os.obs_color);

    //this.details.get('fechado').setValue(this.os.fechado);
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
  }

  /** Cria um ordem de serviço com os dados do formulario */
  getForm() {
    this.os.nome = this.form.get('nome').value;
    this.os.cliente = this.form.get('cliente').value;
    this.os.pedido = this.form.get('pedidos').value;
    this.os.data = this.form.get('data').value;
    this.os.codigo = this.form.get('codigo').value;
    this.os.barra = this.form.get('barra').value;

    this.os.tecnologia = this.details.get('tecnologia').value;
    this.os.varicacao = this.details.get('variacao').value;
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

    this.os.deleted = 'false';
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

  onAdd() {

    this.getColor();

    if (this.color.Color) {
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
      for (let i = 0; i < this.colors.length; i++) {
        if (this.color.Color === this.colors[i].Color) {
          this.color.Hex = this.colors[i].Hex;
        }
      }

      this.os.colors.push(this.color);

      this.onSubmit();

      this.clearColor();
    }
  }

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

  getColor() {

    this.color = new Color();

    this.color.Color = this.details.get('color').value;
    this.color.lineatura1 = this.details.get('lineatura_1').value;
    this.color.lineatura2 = this.details.get('lineatura_2').value;
    this.color.angulo = this.details.get('angulo').value;
    this.color.fotocelula = this.details.get('fotocelula').value;
    this.color.unitario = this.details.get('unitario').value;
    this.color.camerom = this.details.get('camerom').value;
    this.color.jogos = String(this.details.get('jogos').value);

  }

  clearColor() {
    this.details.get('color').setValue(null);
    this.details.get('lineatura_1').setValue(null);
    this.details.get('lineatura_2').setValue(null);
    this.details.get('angulo').setValue(null);
    this.details.get('fotocelula').setValue(null);
    this.details.get('unitario').setValue(null);
    this.details.get('camerom').setValue(null);
    this.details.get('jogos').setValue(null);
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

      this.apiService.custom_objects_create('Os', this.os)
        .subscribe((data: Os) => {
          if (data.error == null) {
            localStorage.setItem('_id', this.os._id);
            localStorage.setItem('version', 'false');
            this.getOs();
          } else {
            this.session(data.error_code);
          }
        }, (data) => {
          this.openSnackBar('Erro ao salvar', 'OK');
        });
    }

    // Salva uma totalmente nova
    else {
      this.apiService.custom_objects_create('Os', this.os)
        .subscribe((data: Os) => {
          if (data.error == null) {
            this.os = data;
            this.nOs();
            localStorage.setItem('_id', this.os._id);
            localStorage.setItem('version', 'false');
            //this.openSnackBar('Salvo', 'OK');
          } else {
            this.session(data.error_code);
          }
        }, (data) => {
          this.openSnackBar('Erro ao salvar', 'OK');
        });
    }
  }

  /** Cria um numero para Ordem de servico */
  nOs() {
    this.apiService.custom_objects_list("Os", ['deleted', 'equal to', 'false'], { '': '_id' })
      .subscribe((data: Result_OS) => {
        if (data.error == null) {

          for (let i = 0; i < data.results.length; i++) {
            if (this.os._id == data.results[i]._id) {
              let os = i + 1;
              this.os.os = os.toString() + " - " + this.os.versao.toString();
              this.update();
              break;
            }
          }
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /** Atualiza os dados de uma ordem de servico existente */
  update() {

    this.apiService.custom_objects_update('Os', this.os)
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.getOs();
          this.openSnackBar('Salvo', 'OK');
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  /** Dispara quando aperta o botao de criar uma nova versao */
  onVersion() {
    this.os.versao++;
    localStorage.removeItem('_id');
    localStorage.setItem('version', 'true');
    this.save();
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  /** Verifica se a sessão e válida */
  session(error_code: string) {
    if (error_code == 'invalid_session') {
      this.openSnackBar('Sessão expirou', 'OK');
      if (localStorage.getItem('session')) {
        localStorage.removeItem('session');
      } this.router.navigate(['/login']);
    }
  }
}
