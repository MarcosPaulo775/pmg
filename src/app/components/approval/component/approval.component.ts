import { Component, OnInit } from '@angular/core';
import { CloudflowComponent } from '../../cloudflow/component/cloudflow.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploader } from 'ng2-file-upload';
import * as URL from '../../../core/http/url';
import { Observable, Observer, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { Flow, Workable, Result_Workable } from 'src/app/shared/models/api';
import { AppService } from 'src/app/shared/Services/app.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  constructor(
    private cloudflowComponent: CloudflowComponent,
    private apiService: ApiService,
    private appService: AppService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cloudflowComponent.setTitle = 'Aprovação';
    this.cloudflowComponent.setApproval = 'rgb(0, 90, 176)';

    this.updateTable();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  sub: Subscription;
  workables: Workable[];
  progress: Observable<string>;
  matcher = new MyErrorStateMatcher();

  /** Link do servidor */
  public uploader: FileUploader = new FileUploader({ url: URL.server + '/upload/approval/' });
  public hasBaseDropZoneOver: boolean = false;

  /** E executado quando um arquivo e selecionado
   * Verifica se os arquivos sao PDF
   */
  public fileOverBase(e: any): void {
    if(typeof(e) === 'boolean'){
      this.hasBaseDropZoneOver = e;
    }
    for (let i = 0; i < this.uploader.queue.length; i++) {
      if (this.uploader.queue[i].file.type != 'application/pdf') {
        this.uploader.queue.splice(i, 1);
        this.appService.openSnackBar('Apenas arquivo PDF', 'ok')
      }
    }
  }

  /** Envia arquivos */
  uploadAll() {
    if (this.emailFormControl.valid) {
      if (this.uploader.queue[0].file.size < 300 * 1024 * 1024) {
        if (this.uploader.queue && this.uploader.queue[0]) {
          for (let i = 0; i < this.uploader.queue.length; i++) {
            this.uploader.queue[i].withCredentials = false;
            if (this.uploader.queue[i].file.type != 'application/pdf') {
              this.uploader.queue.splice(i, 1);
            }
          }
          this.uploader.authToken = localStorage.getItem('session');
          this.uploader.uploadAll();
          this.progress = new Observable<string>((observer: Observer<string>) => {
            setInterval(() => observer.next(this.uploader.progress.toString()), 500);
          });
          this.sub = this.progress.subscribe((data) => {
            if (data == '100') {
              this.sub.unsubscribe();
              this.initApproval();
            }
          });
        } else {
          this.appService.openSnackBar('Arquivo inválido', 'ok');
        }
      } else {
        this.appService.openSnackBar('Aquivo maior que 300mb', 'ok');
      }
    } else {
      this.appService.openSnackBar('Email obrigatório', 'ok');
    }
  }

  /** Inicia fluxo de aprovacao de arquivo */
  initApproval() {
    let files = [];
    for (let i = 0; i < this.uploader.queue.length; i++) {
      files.push('cloudflow://PP_FILE_STORE/approval/' + this.uploader.queue[i].file.name);
    }

    this.apiService.hub_start_from_whitepaper_with_files_and_variables(
      'Angular_Approval',
      'input',
      files,
      { 'email': this.emailFormControl.value }
    ).subscribe((data: Flow) => {
      if (!data.error) {
        this.updateTable();
      }
    }, (data) => {
      console.log(data);
    })
  }

  /** Atualiza Tabela */
  updateTable() {
    this.apiService.workable_list([
      'whitepaper_name',
      'equal to',
      'Angular_Approval',
      'and',
      'hold_in_kiosk',
      'exists'
    ], ' ')
      .subscribe((data: Result_Workable) => {
        if (!data.error) {
          this.workables = data.results;
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Abre caixa de dialogo com as informações da ordem de serviço */
  openDialog(url: string): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      data: url
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
