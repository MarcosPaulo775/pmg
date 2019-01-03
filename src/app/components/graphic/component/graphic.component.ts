import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../../stock/component/stock.component';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { Chapa } from 'src/app/shared/models/chapa';
import { Result_Chapa } from 'src/app/shared/models/api';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  estoque: any;
  in: Chapa[];
  out: Chapa[];
  flint: number;
  kodak: number;
  dupont: number;
  flint_estoque: any;
  kodak_estoque: any;
  dupont_estoque: any;

  constructor(
    private stockComponent: StockComponent,
    private apiService: ApiService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.stockComponent.title = 'Gráficos';
    this.stockComponent.dashboard = '';
    this.stockComponent.setIn = '';
    this.stockComponent.setOut = '';
    this.stockComponent.setGraphic = 'rgb(0, 90, 176)';
    this.stockComponent.setTechnology = '';

    this.getChapa();
  }

  getChapa() {
    this.apiService.custom_objects_list('chapa',
      [
        'deleted',
        'equal to',
        false, 'and',
        'status',
        'equal to',
        'in'
      ], {
        '_id': '_id',
        'status': 'status',
        'area': 'area',
        'tipo': 'tipo',
        'marca': 'marca'
      }).subscribe((data: Result_Chapa) => {
        if (!data.error) {
          this.in = data.results;
          this.data();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });

    this.apiService.custom_objects_list('chapa',
      [
        'deleted',
        'equal to',
        false, 'and',
        'status',
        'equal to',
        'out'
      ], {
        '_id': '_id',
        'status': 'status',
        'area': 'area',
        'tipo': 'tipo',
        'marca': 'marca'
      }).subscribe((data: Result_Chapa) => {
        if (!data.error) {
          this.out = data.results;
          this.data();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  data() {
    if (this.in && this.out) {
      this.flint = 0;
      this.kodak = 0;
      this.dupont = 0;

      for (let i = 0; i < this.in.length; i++) {
        switch (this.in[i].marca) {
          case 'Flint':
            this.flint += Number(this.in[i].area);
            break;
          case 'Kodak':
            this.kodak += Number(this.in[i].area);
            break;
          case 'Dupont':
            this.dupont += Number(this.in[i].area);
            break;
        }
      }

      for (let j = 0; j < this.out.length; j++) {
        switch (this.out[j].marca) {
          case 'Flint':
            this.flint -= Number(this.out[j].area);
            break;
          case 'Kodak':
            this.kodak -= Number(this.out[j].area);
            break;
          case 'Dupont':
            this.dupont -= Number(this.out[j].area);
            break;
        }
      }
      this.graphic();
    }
  }

  graphic() {
    this.flint = Number(this.flint.toFixed(1));
    this.kodak = Number(this.kodak.toFixed(1));
    this.dupont = Number(this.dupont.toFixed(1));

    this.estoque = {
      labels: ['Flint', 'Kodak', 'Dupont'],
      datasets: [
        {
          data: [this.flint, this.kodak, this.dupont],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }

}
