import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { AppService } from 'src/app/shared/Services/app.service';
import { ApiService } from 'src/app/core/http/api.service';
import { Result_OS } from 'src/app/shared/models/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  data: any;
  options: any;
  date: Date;
  day: string[];
  goal: number[];
  replacement: number[];
  month = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  view: boolean;
  sum = 0;

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private appService: AppService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getReplacement();
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

  /** Faz a busca de OS de reposição do mes */
  getReplacement() {
    this.date = new Date();
    this.day = new Array<string>();
    this.goal = new Array<number>();
    this.replacement = [];

    const query = [
      'deleted', 'equal to', false,
      'and',
      'status', 'equal to', 'Arquivado',
      'and',
      'pedido', 'equal to', 'Retrabalho',
      'and',
      'data', 'contains', String(this.date.getFullYear()) + '-' + String(this.date.getMonth() + 1)
    ];

    this.apiService.custom_objects_list('os', query, { 'data_inicio': 'data_inicio' })
      .subscribe((data: Result_OS) => {
        if (!data.error) {
          for (let i = 0; i < this.date.getDate(); i++) {
            this.goal.push(20);
            this.day.push('Dia ' + String(i + 1));
            this.replacement.push(0);
          }
          for (let j = 0; j < data.results.length; j++) {
            let day = Number(data.results[j].data_inicio.split('-')[2]);
            this.replacement[day - 1]++;
          }
          for (let k = 0; k < this.date.getDate(); k++) {
            this.replacement[k + 1] = this.replacement[k + 1] + this.replacement[k];
          }
          this.setGrafic();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Seta as informações do grafico */
  setGrafic() {

    this.data = {
      labels: this.day, //labels: this.variavel (aqui vc coloca os dias q serão mostrados por ex so os dias q si passaram q vao mostrar)
      datasets: [
        {
          label: 'Nº Reposição', //Aqui você coloca si vai ser em R$ ou em quantidade de Retrabalho so por organização
          fill: false, //si true ele pinta abaixo da linha tudo
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: this.replacement //data: this.variavel (aqui são os valores por dia em sequencia)
        },
        {
          label: 'Meta Mensal',
          data: this.goal,
          fill: false,
          borderColor: 'red',
        }
      ]
    }

    this.options = {
      title: {
        display: true,
        text: 'Reposição de ' + this.month[this.date.getMonth()], // Aqui é o titulo si vc quiser colocar o nome do mes ou nem colocar ai e com vc
        fontSize: 18
      },
      legend: {
        position: 'none' //si quiser uma legenda para falar tipo linha vermelha é isso e so colocar a posição(ex: top , bottom)
      }
    };

    this.view = true;
  }

}