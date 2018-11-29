import { Component, OnInit } from '@angular/core';
import { ConfigComponent } from '../../config/component/config.component';
import { User, Avatar } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DialogAvatarComponent } from '../dialogAvatar/dialog.component';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/http/api.service';
import { Data } from '@angular/router';
import { Result_Avatar, Result_Delete } from 'src/app/shared/models/api';

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
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  user: User;

  permissoes: Permissoes;

  data: string;

  ngOnInit() {

    this.data = localStorage.getItem('avatar');
    this.permissoes = new Permissoes;

    this.configComponent.title = 'Configurações do Usuário';
    this.configComponent.user_color = 'rgb(0, 90, 176)';
    this.configComponent.users_color = '';

    this.user = new User();

    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (data.error == null) {
          this.user = data;
          this.preview();

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

  upload(): void {
    const dialogRef = this.dialog.open(DialogAvatarComponent, {
      width: '800px',
      data: this.user
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPreview(result);
      }
    });
  }

  preview() {

    this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
      .subscribe(
        (data: Result_Avatar) => {

          if (data.error == null && data.results.length != 0) {

            this.data = data.results[0].data;

            localStorage.setItem('avatar', this.data);

          } else {

            this.data = 'assets/logo.svg';
            localStorage.setItem('avatar', this.data);

          }

        }, () => { }
      )

  }

  deletePreview() {

    this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
      .subscribe(
        (data: Result_Avatar) => {

          if (data.error == null && data.results.length != 0) {

            this.apiService.custom_objects_delete('avatar', data.results[0]._id)
              .subscribe((data: Result_Delete) => {
                if (data.error == null) {
                  this.data = 'assets/logo.svg';
                  localStorage.setItem('avatar', this.data);
                }
              });

          }

        }, () => { }
      )

  }

  getPreview(filename: string) {
    this.apiService.metadata_get_preview('cloudflow://PP_FILE_STORE/Avatar/' + filename, null, null)
      .subscribe((data: Data) => {

        if (data.error == null) {
          this.data = data.data;
          localStorage.setItem('avatar', this.data);
          this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
            .subscribe(
              (data: Result_Avatar) => {
                if (data.error == null && data.results.length == 0) {

                  let avatar = new Avatar();
                  avatar.data = this.data;
                  avatar.id = this.user._id;

                  this.apiService.custom_objects_create('avatar', avatar)
                    .subscribe(
                      (data) => {

                      }, () => { }
                    )

                } else if (data.error == null) {
                  let avatar = data.results[0];
                  avatar.data = this.data;

                  this.apiService.custom_objects_update('avatar', avatar)
                    .subscribe(
                      (data) => {

                      }, () => { }
                    )
                }

              }, () => {

              }
            )

        } else {
          this.data = 'assets/logo.svg';
          localStorage.setItem('avatar', this.data);
        }
      }, (data) => {
      });
  }

}
