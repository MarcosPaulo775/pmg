import { Component, OnInit } from '@angular/core';
import { ConfigComponent } from '../../config/component/config.component';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as URL from '../../../core/http/url';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class Permissoes {
  Admin_User?: boolean;
  Patchplanner?: boolean;
  Manage_Chains?: boolean;
  Manage_Users?: boolean;
  Manage_Scopes?: boolean;
  Manage_Templates?: boolean;
  Manage_Whitepapers?: boolean;
  Manage_Share?: boolean;
  Manage_Assets?: boolean;
  External_project_user?: boolean;
  Manage_Jobs?: boolean;
  May_Upload?: boolean;
  May_Delete_Jackets_In_Kiosk?: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(
    public configComponent: ConfigComponent,
    public authService: AuthService,
    private http: HttpClient
  ) { }

  user: User;

  permissoes: Permissoes;

  ngOnInit() {
    this.permissoes = new Permissoes;

    this.configComponent.title = 'Configurações do Usuário';
    this.configComponent.user_color = 'rgb(0, 90, 176)';
    this.configComponent.users_color = '';

    this.user = new User();

    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (data.error == null) {
          this.user = data;


          for (let i = 0; i < this.user.permissions.length; i++) {

            switch (this.user.permissions[i]) {
              case ('ADMIN_USER'):
                this.permissoes.Admin_User = true;
                break;
              case ('USE_PATCHPLANNER'):
                this.permissoes.Patchplanner = true;
                break;
              case ('MANAGE_CHAINS'):
                this.permissoes.Manage_Chains = true;
                break;
              case ('MANAGE_USERS'):
                this.permissoes.Manage_Users = true;
                break;
              case ('MANAGE_SCOPES'):
                this.permissoes.Manage_Scopes = true;
                break;
              case ('MANAGE_TEMPLATES'):
                this.permissoes.Manage_Templates = true;
                break;
              case ('MANAGE_QUANTUM'):
                this.permissoes.Manage_Whitepapers = true;
                break;
              case ('MANAGE_SHARE'):
                this.permissoes.Manage_Share = true;
                break;
              case ('MANAGE_ASSETS'):
                this.permissoes.Manage_Assets = true;
                break;
              case ('EXTERNAL_PROJECT_USER'):
                this.permissoes.External_project_user = true;
                break;
              case ('MAY_UPLOAD'):
                this.permissoes.May_Upload = true;
                break;
              case ('MAY_DELETE_JACKETS_IN_KIOSK'):
                this.permissoes.May_Delete_Jackets_In_Kiosk = true;
                break;
              case ('MANAGE_JOBS'):
                this.permissoes.Manage_Jobs = true;
              case ('ADMIN'):
                this.permissoes.Admin_User = true;
                this.permissoes.Patchplanner = true;
                this.permissoes.Manage_Chains = true;
                this.permissoes.Manage_Users = true;
                this.permissoes.Manage_Scopes = true;
                this.permissoes.Manage_Templates = true;
                this.permissoes.Manage_Share = true;
                this.permissoes.Manage_Assets = true;
                this.permissoes.External_project_user = true;
                this.permissoes.External_project_user = true;
                this.permissoes.May_Upload = true;
                this.permissoes.May_Delete_Jackets_In_Kiosk = true;
                this.permissoes.Manage_Whitepapers = true;
                this.permissoes.Manage_Jobs = true;
                break;

            }

          }
        }
      }, (data) => {

      })
  }


  progress: Subject<number>;
  /** Upload de arquivo */
  inputFileChange(event) {
    console.log('Passou');

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData;
      formData.append('file', file, file.name);

      const req = new HttpRequest('POST', URL.server + '/upload/avatar', formData, {
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
          console.log(event.body);
        }
      });
    }
  }

}
