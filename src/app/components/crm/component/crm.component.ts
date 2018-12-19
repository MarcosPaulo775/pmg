import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { User } from 'src/app/shared/models/user';
import { Result_Avatar } from 'src/app/shared/models/api';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

  title: string;
  dashboard: string;
  company: string;
  user: User;
  data: string;

  constructor(
    private router: Router,

    public snackBar: MatSnackBar,

    private authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.data = localStorage.getItem('avatar');
    this.title = '';
    this.getUser();
  }

  /** Realiza o logout */
  logout() {
    this.authService.logout();
  }

  /** Busca informações do usuário logado */
  getUser() {
    this.authService.get_current_user()
      .subscribe((data: User) => {
        if (!data.error) {
          this.user = data;
          localStorage.setItem('userid', this.user._id);
          this.preview();
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao comunicar com servidor', 'ok');
        console.log(data);
      })
  }

  /** Busca avatar do usuário, caso não tenha usa o padrão */
  preview() {
    this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
      .subscribe(
        (data: Result_Avatar) => {
          if (!data.error && data.results.length != 0) {
            this.data = data.results[0].data;
            localStorage.setItem('avatar', this.data);
          } else {
            this.session(data.error_code);
            this.data = 'assets/logo.svg';
            localStorage.setItem('avatar', this.data);
          }
        }, (data) => {
          this.openSnackBar('Erro ao comunicar com servidor', 'ok');
          console.log(data);
        }
      )
  }

  /** Verifica se a sessão e válida */
  session(error_code: string) {
    if (error_code == 'invalid_session') {
      if (localStorage.getItem('session')) {
        localStorage.removeItem('session');
      } this.router.navigate(['/login']);
    }
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  @Input()
  set setTitle(title: string) {
    this.title = title;
  }

  @Input()
  set setDashboard(color: string) {
    this.dashboard = color;
  }

  @Input()
  set setCompany(color: string) {
    this.company = color;
  }
}
