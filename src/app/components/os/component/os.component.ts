import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OsService } from '../../../core/http/os.service';
import { Os } from '../../../shared/models/os';
import { Count, Result_OS } from '../../../shared/models/api';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  os: Os;

  constructor(
    private formBuilder: FormBuilder,
    private production: ProductionComponent,
    private osService: OsService,
    public snackBar: MatSnackBar
  ) { }

  /**Funcoes inicializadas com a pagina */
  ngOnInit() {
    this.os = new Os();
    this.production.title = 'Ordem de serviço';
    this.form = this.formBuilder.group({
      cliente: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      versao: [null, [Validators.required]],
      pedido: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      data: [null, [Validators.required]],
      barra: [null, [Validators.required]]
    });
    this.nOs();
  }

  /**busca o numero de ordem de serviço no banco e cria um novo numero*/
  nOs() {
    this.osService.custom_objects_count()
      .subscribe((data: Count) => {
        this.loading = false;
        if (data.error == null) {
          this.os.os = data.count + 1;
        } else {
          this.openSnackBar("Erro", "OK");
        }
        console.log(data);
      }, (data) => {
        this.loading = false;
        console.log('Erro: ' + data);
      });
  }

  /**Adicona o formulario no objeto 'OS'*/
  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.os.nome = this.form.get('nome').value;
      this.os.versao = this.form.get('versao').value;
      this.os.cliente = this.form.get('cliente').value;
      this.os.pedido = this.form.get('pedido').value;
      this.os.data = this.form.get('data').value;
      this.os.codigo = this.form.get('codigo').value;
      this.os.barra = this.form.get('barra').value;
      this.save(this.os);
    }
  }

  /**Marca a ordem de serviço como deletada, não e excluida realmente*/
  onDelete() {

    //busca o id da ordem de serviço
    if (this.os.nome != null) {
      this.loading = true;
      this.osService.custom_objects_list(this.os.os, "")
        .subscribe((data: Result_OS) => {
          console.log(data);
          this.os = data.results[0];

          //adiciona o campo deleted
          this.osService.custom_objects_set_keys(this.os._id, { 'deleted': 'true' })
            .subscribe((data: Result_OS) => {
              this.nOs();
              this.loading = false;
              console.log(data);
            }, (data) => {
              this.loading = false;
              this.openSnackBar("Erro", "OK");
            });

        }, (data) => {
          this.loading = false;
          this.openSnackBar("Erro", "OK");
        });
    }
  }

  /**Salva uma nova ordem de serviço*/
  save(os: Os) {
    //obtem o numero da os
    this.osService.custom_objects_count()
      .subscribe((data: Count) => {
        this.loading = false;
        if (data.error == null) {
          this.os.os = data.count + 1;
          
          //salva os dados
          this.osService.custom_objects_create(os)
            .subscribe((data: Os) => {
              this.loading = false;
              if (data.error == null) {
                this.openSnackBar("Ordem de serviço " + os.os + " salva", "OK");
              } else {
                this.openSnackBar("Erro", "OK");
              }
              console.log(data);
            }, (data) => {
              this.loading = false;
              this.openSnackBar("Erro", "OK");
            });

        } else {
          this.openSnackBar("Erro", "OK");
        }
        console.log(data);
      }, (data) => {
        this.loading = false;
        console.log('Erro: ' + data);
      });
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
