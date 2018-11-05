import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  basicos: FormGroup;
  cadastrais: FormGroup;
  pagamento: FormGroup;
  preco: FormGroup;
  outros: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.basicos = this.formBuilder.group({
      solicitante: [null, []],
      novo: [null, []],
      fisica: [null, []],
      juridica: [null, []],
      principal: [null, []],
    });

    this.cadastrais = this.formBuilder.group({
      razao: [null, []],
      fantasia: [null, []],
      endereco: [null, []],
      bairro: [null, []],
      cidade: [null, []],
      uf: [null, []],
      cep: [null, []],
      tel: [null, []],
      fax: [null, []],
      cnpj_cpf: [null, []],
      ie_rg: [null, []],
      comercial: [null, []],
      tel_comercial: [null, []],
      email_comercial: [null, []],
      financeiro: [null, []],
      tel_financeiro: [null, []],
      email_financeiro: [null, []],
      endereco_cobranca: [null, []],      
    });

    this.pagamento = this.formBuilder.group({
      nf: [null, []],
      boleto: [null, []],
      prazo: [null, []],
    });

    this.preco = this.formBuilder.group({
      digital_114: [null, []],
      digital_170: [null, []],
      digital_284: [null, []],
      kodak_114: [null, []],
      kodak_170: [null, []],
      margem: [null, []],
    });

    this.outros = this.formBuilder.group({
      email_nf: [null, []],
      email_materiais: [null, []],
      email_pedido: [null, []],
      serasa: [null, []],
      cartao_cnpj: [null, []],
      obs_financeiro: [null, []],
      obs_diretoria: [null, []],
    });
  }

  users: string[] = [
    'Leo',
    'Sidnei',
    'Lorival'
  ]

}
