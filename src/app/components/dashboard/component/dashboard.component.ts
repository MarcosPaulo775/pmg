import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { AppService } from 'src/app/shared/Services/app.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  month = 'Janeiro';
  data: any;
  options: any;

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getUser();
    this.setGrafic();
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
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        this.appService.openSnackBar('Erro ao comunicar com servidor', 'ok');
        console.log(data);
      })
  }

  /** Seta as informações do grafico */
  setGrafic() {
    this.data = {
      labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'], //labels: this.variavel (aqui vc coloca os dias q serão mostrados por ex so os dias q si passaram q vao mostrar)
      datasets: [
        {
          label: 'Nº Reposição', //Aqui você coloca si vai ser em R$ ou em quantidade de Retrabalho so por organização
          fill: false, //si true ele pinta abaixo da linha tudo
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: [1, 3, 5, 6, 7, 7, 15] //data: this.variavel (aqui são os valores por dia em sequencia)
        },
        {
          label: 'Meta Mensal',
          data: [20, 20, 20, 20, 20, 20, 20],
          fill: false,
          borderColor: 'red',
        }
      ]
    }

    this.options = {
      title: {
        display: true,
        text: 'Reposição de ' + this.month, // Aqui é o titulo si vc quiser colocar o nome do mes ou nem colocar ai e com vc
        fontSize: 18
      },
      legend: {
        position: 'none' //si quiser uma legenda para falar tipo linha vermelha é isso e so colocar a posição(ex: top , bottom)
      }
    };
  }

}