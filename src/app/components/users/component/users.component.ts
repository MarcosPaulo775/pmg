import { Component, OnInit } from '@angular/core';
import { ConfigComponent } from '../../config/component/config.component';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { is_admin } from 'src/app/shared/models/api';
import { DialogPassComponent } from '../dialogPass/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public configComponent: ConfigComponent,
    public authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  users: User[];

  edit: boolean;

  ngOnInit() {
    this.configComponent.title = 'Usuários';
    this.configComponent.user_color = '';
    this.configComponent.users_color = 'rgb(0, 90, 176)';

    this.getUser();
  }

  getUser() {
    this.authService.users_list_users()
      .subscribe((data: User[]) => {
        if (data[0]) {
          this.users = data;
        }
      }, (data) => {
      })
  }

  getAdmin() {
    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (data.error == null) {
        }
      }, () => { });
  }

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
              if (result) {

              }
            });
          } else {
            this.openSnackBar('Sem Permissão', 'ok');
          }

        }
      },
        (data) => {

        });
  }

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
              if (result) {

              }
            });
          } else {
            this.openSnackBar('Sem Permissão', 'ok');
          }

        }
      },
        (data) => {

        });

  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
