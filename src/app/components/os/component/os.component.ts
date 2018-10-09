import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OsService } from '../../../core/http/os.service';
import { Os } from '../../../shared/models/os';
import { Count, Result_OS } from '../../../shared/models/api';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  form: FormGroup;
  os: Os;
  details: boolean;
  progress: Subject<number>;

  inputFileChange(event) {
    console.log('Passou');

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData;
      formData.append('session', 'session', 'session');
      formData.append('file', file, file.name);
      
      const req = new HttpRequest('POST', 'http://localhost:3000/upload', formData, {
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

  constructor(
    private formBuilder: FormBuilder,
    private production: ProductionComponent,
    private osService: OsService,
    public snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.os = new Os();
    this.production.title = 'Ordem de serviço';
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

  getOs() {
    this.osService.custom_objects_get(localStorage.getItem('_id'))
      .subscribe((data: Os) => {
        console.log(data);
        if (data.error_code == null) {
          this.os = data;
          this.form.get('nome').setValue(this.os.nome);
          this.form.get('cliente').setValue(this.os.cliente);
          this.form.get('pedido').setValue(this.os.pedido);
          this.form.get('data').setValue(this.os.data);
          this.form.get('codigo').setValue(this.os.codigo);
          this.form.get('barra').setValue(this.os.barra);
          this.details = true;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao salvar', 'OK');
      });
  }

  getForm() {
    this.os.nome = this.form.get('nome').value;
    this.os.cliente = this.form.get('cliente').value;
    this.os.pedido = this.form.get('pedido').value;
    this.os.data = this.form.get('data').value;
    this.os.codigo = this.form.get('codigo').value;
    this.os.barra = this.form.get('barra').value;
    this.os.deleted = 'false';

  }

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

  save() {

    this.osService.custom_objects_create(this.os)
      .subscribe((data: Os) => {
        if (data.error == null) {
          this.os = data;
          console.log(data);
          localStorage.setItem('_id', this.os._id);
          localStorage.setItem('version', 'false');
          this.details = true;
          this.openSnackBar('Salvo', 'OK');
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao salvar', 'OK');
      });

  }

  update() {
    this.osService.custom_objects_update(this.os)
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
