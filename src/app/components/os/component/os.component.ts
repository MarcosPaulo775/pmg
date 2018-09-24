import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OsService } from '../../../core/http/os.service';
import { Os } from '../../../shared/models/os';
import { Count, Result_OS } from '../../../shared/models/api';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  form: FormGroup;
  os: Os;
  details: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private production: ProductionComponent,
    private osService: OsService,
    public snackBar: MatSnackBar,
    private router: Router,
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
        if (data.error == null) {
          this.os = data;
          console.log(data);
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
        this.openSnackBar('Erro ao salvar','OK');
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
        this.save();
      } else {
        this.update();

      }

    }
  }

  save() {

    this.osService.custom_objects_count()
      .subscribe((data: Count) => {
        if (data.error == null) {
          if (localStorage.getItem('version') != 'true') {
            let n = data.count + 1;
            this.os.os = n.toString() + " - " + this.os.versao;
          } else {
            let aux;
            aux = this.os.os.split(" ");
            this.os.os = aux[0] + " - " + this.os.versao;
          }

          this.osService.custom_objects_create(this.os)
            .subscribe((data: Os) => {
              if (!data.error) {
                this.os = data;

                this.osService.custom_objects_get(this.os._id)
                  .subscribe((data: Os) => {
                    if (data.error == null) {
                      this.os = data;
                      localStorage.setItem('_id', this.os._id);
                      localStorage.setItem('version', 'false');
                      this.openSnackBar('Salvo', 'OK');
                    } else {
                      this.save();
                    }
                  }, (data) => {
                    this.openSnackBar('Erro ao salvar', 'OK');
                  });

              } else {
                this.session(data.error_code);
              }
            }, (data) => {
            });

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
