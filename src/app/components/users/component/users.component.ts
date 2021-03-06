import { Component, OnInit } from '@angular/core';

import { MatDialog, MatSnackBar } from '@angular/material';

import { AppService } from 'src/app/shared/Services/app.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfigComponent } from '../../config/component/config.component';
import { DialogPassComponent } from '../dialogPass/dialog.component';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    public authService: AuthService,
    public appService: AppService,
    public configComponent: ConfigComponent,
  ) { }

  users: User[];
  edit: boolean;

  ngOnInit() {
    this.configComponent.title = 'Usuários';
    this.configComponent.user_color = '';
    this.configComponent.users_color = 'rgb(0, 90, 176)';

    this.getUser();
  }

  /** Busca informações */
  getUser() {
    this.authService.users_list_users()
      .subscribe((data: User[]) => {
        if (data[0]) {
          this.users = data;
        }
      }, (data) => {
        console.log(data);
      })
  }

  /** Verifica se o usuario e admin */
  getAdmin() {
    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (!data.error) {
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Abre janela para editar usuario */
  onEdit(user: User): void {
    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (data.error == null) {
          if (data.permissions[1] == 'ADMIN_USER' || data.permissions[1] == 'ADMIN') {

            const dialogRef = this.dialog.open(DialogComponent, {
              width: '800px',
              data: user
            });
            dialogRef.afterClosed().subscribe(result => {
            });
          } else {
            this.appService.openSnackBar('Sem Permissão', 'ok');
          }
        }
      },
        (data) => {
          console.log(data);
        });
  }

  /** Abre janela para editar usuario */
  onPass(user: User): void {
    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (data.error == null) {
          if (data.permissions[1] == 'ADMIN_USER' || data.permissions[1] == 'ADMIN') {

            const dialogRef = this.dialog.open(DialogPassComponent, {
              width: '800px',
              data: user
            });
            dialogRef.afterClosed().subscribe(result => {
            });
          } else {
            this.appService.openSnackBar('Sem Permissão', 'ok');
          }
        }
      },
        (data) => {
          console.log(data);
        });
  }

}
