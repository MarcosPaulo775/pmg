import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { User } from 'src/app/shared/models/user';
import { Result_Avatar } from 'src/app/shared/models/api';
import { AppService } from 'src/app/shared/Services/app.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  title: string;
  user_color: string;
  users_color: string;
  data: string;
  user: User;

  constructor(
    public snackBar: MatSnackBar,

    private authService: AuthService,
    private apiService: ApiService,
    private appService: AppService
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
          this.appService.session(data.error_code);
        }
      }, (data) => {
        this.appService.openSnackBar('Erro ao comunicar com servidor', 'ok');
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
            this.appService.session(data.error_code);
            this.data = 'assets/logo.svg';
            localStorage.setItem('avatar', this.data);
          }
        }, (data) => {
          this.appService.openSnackBar('Erro ao comunicar com servidor', 'ok');
          console.log(data);
        }
      )
  }

  @Input()
  set setData(data: string) {
    this.data = data;
  }

  @Input()
  set setTitle(title: string) {
    this.title = title;
  }

  @Input()
  set setDashboard(color: string) {
    this.user_color = color;
  }

  @Input()
  set setCompany(color: string) {
    this.users_color = color;
  }
}
