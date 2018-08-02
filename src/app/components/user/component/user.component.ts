import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tipos: string[] = [
    'Representante',
    'Operador',
    'Gerente',
    'Atendente',
    'Finaceiro'
  ];

  status: string[] = [
    'Liberado',
    'Bloqueado'
  ]

}
