import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { ConfigComponent } from '../../config/component/config.component';
import { DialogAvatarComponent } from '../dialogAvatar/dialog.component';
import { User, Avatar, Permissoes } from 'src/app/shared/models/user';
import { Result_Avatar, Result_Delete, User_id, Data, _id } from 'src/app/shared/models/api';
import { AppService } from 'src/app/shared/Services/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  form: FormGroup;
  password: FormGroup;
  user: User;
  permissoes: Permissoes;
  data: string;

  constructor(
    private formBuilder: FormBuilder,

    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    
    private authService: AuthService,
    private apiService: ApiService,
    private appService: AppService,
    private configComponent: ConfigComponent
  ) { }

  ngOnInit() {
    this.data = localStorage.getItem('avatar');
    this.permissoes = new Permissoes;

    this.configComponent.title = 'Configurações do Usuário';
    this.configComponent.user_color = 'rgb(0, 90, 176)';
    this.configComponent.users_color = '';

    this.initForm();
  }

  /** inicializa formulario */
  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });

    this.password = this.formBuilder.group({
      old_password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      new_password2: [null, [Validators.required]]
    });

    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (!data.error) {
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
          this.getUser();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      })
  }

  /** Salva dados do usuário */
  onSave() {
    if (this.form.valid) {
      this.getForm();
      this.authService.users_set_keys(this.user._id,
        {
          'username': this.user.username,
          'fullname': this.user.fullname,
          'email': this.user.email
        }
      ).subscribe((data: _id) => {
        if (!data.error) {
          this.appService.openSnackBar('Dados do usuario salvo', 'ok');
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      })
    } else {
      this.appService.openSnackBar('Cadastre todos os campos', 'ok');
    }
  }

  /** altera a senha do usuario */
  onSavePassword() {
    if (this.password.valid) {
      if (this.password.get('new_password').value == this.password.get('new_password2').value) {

        this.authService.users_get_user_id(this.user.username)
          .subscribe((data: User_id) => {
            if (data.error == null) {
              this.authService.users_change_password(data.user_id, this.password.get('old_password').value, this.password.get('new_password').value)
                .subscribe((data: User_id) => {
                  if (!data.error) {
                    this.appService.openSnackBar('Senha alterada', 'ok');
                  } else {
                    this.appService.session(data.error_code);
                  }
                }, (data) => {
                  console.log(data);
                });
            }
          }, (data) => {
            console.log(data);
          })
      } else {
        this.appService.openSnackBar('Senhas não coincidem', 'ok');
      }
    } else {
      this.appService.openSnackBar('Cadastre todos os campos', 'ok');
    }
  }

  /** preenche informações do formulario */
  getUser() {
    this.form.get('name').setValue(this.user.fullname);
    this.form.get('username').setValue(this.user.username);
    this.form.get('email').setValue(this.user.email);
  }

  /** Busca informaçãoes do formuário */
  getForm() {
    this.user.fullname = this.form.get('name').value;
    this.user.username = this.form.get('username').value;
    this.user.email = this.form.get('email').value;
  }

  /** Abre janela de Upload */
  upload(): void {
    const dialogRef = this.dialog.open(DialogAvatarComponent, {
      width: '800px',
      data: this.user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPreview(result);
      }
    });
  }

  /** Busca avatar do usuario no banco de dados */
  preview() {
    this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
      .subscribe(
        (data: Result_Avatar) => {
          if (!data.error && data.results.length != 0) {
            this.data = data.results[0].data;
            localStorage.setItem('avatar', this.data);
          } else {
            this.appService.session(data.error_code);
            this.data = 'assets/logo.svg';
            localStorage.setItem('avatar', this.data);
          }
        }, (data) => {
          console.log(data);
        }
      )
  }

  /** Deleta o avatar do usuario e coloca o Padrão */
  deletePreview() {
    this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
      .subscribe(
        (data: Result_Avatar) => {
          if (!data.error && data.results.length != 0) {
            this.apiService.custom_objects_delete('avatar', data.results[0]._id)
              .subscribe((data: Result_Delete) => {
                if (!data.error) {
                  this.data = 'assets/logo.svg';
                  this.configComponent.setData = this.data;
                  localStorage.setItem('avatar', this.data);
                } else {
                  this.appService.session(data.error_code);
                }
              });
          } else {
            this.appService.session(data.error_code);
          }
        }, (data) => {
          console.log(data);
        }
      )
  }

  /** Gera string do avatar do usuario */
  getPreview(filename: string) {
    this.apiService.metadata_get_preview('cloudflow://PP_FILE_STORE/Avatar/' + filename, 0, 300)
      .subscribe((data: Data) => {
        if (!data.error) {
          this.data = data.data;
          this.configComponent.setData = this.data;
          localStorage.setItem('avatar', this.data);
          this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
            .subscribe(
              (data: Result_Avatar) => {
                if (!data.error && data.results.length == 0) {

                  let avatar = new Avatar();
                  avatar.data = this.data;
                  avatar.id = this.user._id;

                  this.apiService.custom_objects_create('avatar', avatar)
                    .subscribe(
                      (data: Avatar) => {
                        if (!data.error) {
                          this.appService.openSnackBar('Avatar salvo', 'ok')
                        } else {
                          this.appService.session(data.error_code);
                        }
                      }, (data) => {
                        console.log(data);
                      }
                    )
                } else if (!data.error) {
                  let avatar = data.results[0];
                  avatar.data = this.data;

                  this.apiService.custom_objects_update('avatar', avatar)
                    .subscribe(
                      (data: Avatar) => {
                        if (!data.error) {
                          this.appService.openSnackBar('Avatar salvo', 'ok')
                        } else {
                          this.appService.session(data.error_code);
                        }
                      }, (data) => {
                        console.log(data);
                      }
                    )
                }
              }, (data) => {
                console.log(data);
              }
            )
        } else {
          this.appService.session(data.error_code);
          this.data = 'assets/logo.svg';
          localStorage.setItem('avatar', this.data);
        }
      }, (data) => {
        console.log(data);
      });
  }

}
