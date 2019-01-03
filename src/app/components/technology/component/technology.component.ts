import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../confirm/confirm.component';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { Technology } from 'src/app/shared/models/os';
import { Result_Technology } from 'src/app/shared/models/api';
import { StockComponent } from '../../stock/component/stock.component';
import { DialogLineaturaComponent } from '../dialogLineatura/dialog.component';
import { DialogVariationComponent } from '../dialogVariation/dialog.component';
import { DialogMaterialComponent } from '../dialogMaterial/dialog.component';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {

  form: FormGroup;
  tecnologias: Technology[];
  tecnologia: Technology;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiService,
    private appService: AppService,
    private stockComponent: StockComponent
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      technology: [null, [Validators.required]]
    });
    this.updateTable();

    this.stockComponent.title = 'Tecnologias';
    this.stockComponent.dashboard = '';
    this.stockComponent.setIn = '';
    this.stockComponent.setOut = '';
    this.stockComponent.setGraphic = '';
    this.stockComponent.setTechnology = 'rgb(0, 90, 176)';
  }

  /** Atualiza tabela */
  updateTable() {
    this.apiService.custom_objects_list('technology', [], ' ')
      .subscribe((data: Result_Technology) => {
        if (!data.error) {
          this.tecnologias = data.results;
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Busca dados do formulario */
  getForm() {
    this.tecnologia = new Technology();
    this.tecnologia.technology = this.form.value.technology;
    this.tecnologia.lineatura = [];
    this.tecnologia.material = [];
    this.tecnologia.variation = [];
  }

  /** Salva uma nova tecnologia */
  onSubmit() {
    if (this.form.valid) {
      this.getForm();
      this.apiService.custom_objects_create('technology', this.tecnologia)
        .subscribe((data: Technology) => {
          if (!data.error) {
            this.appService.openSnackBar('Tecnologia adicionada', 'ok');
            this.updateTable();
          } else {
            this.appService.session(data.error_code);
          }
        }, (data) => {
          console.log(data);
        });
    }
  }

  /** Apaga uma tecnologia */
  onDeleted(id) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: 'Deseja realmente excluir?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.custom_objects_delete('technology', id)
          .subscribe((data: Technology) => {
            if (!data.error) {
              this.appService.openSnackBar('Tecnologia excluida', 'ok');
              this.updateTable();
            } else {
              this.appService.session(data.error_code);
            }
          }, (data) => {
            console.log(data);
          });
      }
    });
  }

  openDialogLineatura(tecnologia) {
    const dialogRef = this.dialog.open(DialogLineaturaComponent, {
      data: tecnologia
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogVariation(tecnologia) {
    const dialogRef = this.dialog.open(DialogVariationComponent, {
      data: tecnologia
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogMaterial(tecnologia) {
    const dialogRef = this.dialog.open(DialogMaterialComponent, {
      data: tecnologia
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
