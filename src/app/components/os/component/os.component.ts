import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OsService } from '../../../core/http/os.service';
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

  filteredColors: Observable<Color[]>;

  colors: Color[] = [
    { Color: 'Preto', Hex: "#000000" },
    { Color: 'Amarelo', Hex: '#ffff00' },
    { Color: 'Magenta', Hex: '#ff00ff' },
    { Color: 'Ciano', Hex: '#00ffff' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private production: ProductionComponent,
    private osService: OsService,
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
      lineatura: [null, []],
      lineatura_1: [null, []],
      lineatura_2: [null, []],
      espessura: [null, []],
      camada: [null, []],
      local: [null, []],
      angulo: [null, []],
      perfil: [null, []],
      observacoes_cores: [null, []],
      observacoes_cliche: [null, []],

      cor: [null, []]
    });

    this.filteredColors = this.details.get('cor').valueChanges
      .pipe(
        startWith(''),
        map(color => color ? this._filter(color) : this.colors.slice())
      );

    this.form = this.formBuilder.group({
      cliente: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      pedido: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      data: [null, [Validators.required]],
      barra: [null, [Validators.required]]
    });

    if (localStorage.getItem('_id')) {
      this.getOs();
    }
    else { }
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
    this.osService.custom_objects_get('Os', localStorage.getItem('_id'))
      .subscribe((data: Os) => {
        if (data.error_code == null) {
          this.os = data;
          this.form.get('nome').setValue(this.os.nome);
          this.form.get('cliente').setValue(this.os.cliente);
          this.form.get('pedido').setValue(this.os.pedido);
          this.form.get('data').setValue(this.os.data);
          this.form.get('codigo').setValue(this.os.codigo);
          this.form.get('barra').setValue(this.os.barra);
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
    this.osService.custom_objects_list('technology', '', { '': 'name' })
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

    this.osService.custom_objects_list('variation', '', { '': 'name' })
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

    this.osService.custom_objects_list('material', '', { '': 'name' })
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

    this.osService.custom_objects_list('lineatura', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.lineatura = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.lineatura.push(data.results[i].name);
          }
          this.details.get('lineatura').setValue(this.os.lineatura);
        }
      }, (data) => {
      });

    this.osService.custom_objects_list('thickness', '', { '': 'name' })
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

    this.osService.custom_objects_list('layer', '', { '': 'name' })
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

    this.osService.custom_objects_list('local', '', { '': 'name' })
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

    this.osService.custom_objects_list('angle', '', { '': 'name' })
      .subscribe((data: Result_Item) => {
        if (data.error_code == null) {
          this.angulo = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            this.angulo.push(data.results[i].name);
          }
        }
      }, (data) => {
      });

    this.osService.custom_objects_list('profile', '', { '': 'name' })
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

    this.osService.custom_objects_list('pantone', '', null)
      .subscribe((data: Result_Color) => {
        if (data.error_code == null) {
          //this.colors = new Array<string>();
          for (let i = 0; i < data.results.length; i++) {
            data.results[i].Hex = '#' + data.results[i].Hex;
            data.results[i].Color = 'Pantone ' + data.results[i].Color;
            this.colors.push(data.results[i]);
          }
          //console.log(this.colors);
        }
      }, (data) => {
      });

    this.details.get('observacoes_cliche').setValue(this.os.obs_cliche);
    this.details.get('observacoes_cores').setValue(this.os.obs_color);
  }

  /** Cria um ordem de serviço com os dados do formulario */
  getForm() {
    this.os.nome = this.form.get('nome').value;
    this.os.cliente = this.form.get('cliente').value;
    this.os.pedido = this.form.get('pedido').value;
    this.os.data = this.form.get('data').value;
    this.os.codigo = this.form.get('codigo').value;
    this.os.barra = this.form.get('barra').value;

    this.os.tecnologia = this.details.get('tecnologia').value;
    this.os.varicacao = this.details.get('variacao').value;
    this.os.material = this.details.get('material').value;
    this.os.lineatura = this.details.get('lineatura').value;
    this.os.espessura = this.details.get('espessura').value;
    this.os.camada = this.details.get('camada').value;
    this.os.local = this.details.get('local').value;
    this.os.obs_cliche = this.details.get('observacoes_cliche').value;

    this.os.perfil = this.details.get('perfil').value;
    this.os.obs_color = this.details.get('observacoes_cores').value;

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

  /** Salva uma Ordem de serviço nova no banco de dados*/
  save() {

    this.details_view = true;

    // Salva uma versao nova
    if (localStorage.getItem('version') == 'true') {
      let os = this.os.os.split(' ');
      let versao = Number(os[2]);
      this.os.versao = versao + 1;
      this.os.os = os[0] + ' - ' + this.os.versao.toString();

      this.osService.custom_objects_create('Os', this.os)
        .subscribe((data: Os) => {
          if (data.error == null) {
            localStorage.setItem('_id', this.os._id);
            localStorage.setItem('version', 'false');
          } else {
            this.session(data.error_code);
          }
        }, (data) => {
          this.openSnackBar('Erro ao salvar', 'OK');
        });
    }
    // Salva uma totalmente nova
    else {
      this.osService.custom_objects_create('Os', this.os)
        .subscribe((data: Os) => {
          if (data.error == null) {
            this.os = data;
            this.nOs();
            localStorage.setItem('_id', this.os._id);
            localStorage.setItem('version', 'false');
            this.openSnackBar('Salvo', 'OK');
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
    this.osService.custom_objects_list("Os", ['deleted', 'equal to', 'false'], { '': '_id' })
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

    this.osService.custom_objects_update('Os', this.os)
      .subscribe((data: Count) => {
        if (data.error == null) {
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
