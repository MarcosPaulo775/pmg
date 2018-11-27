import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api.service';
import { Company, State, City } from 'src/app/shared/models/company';
import { Result_Item, Result_States, Result_Cities } from 'src/app/shared/models/api';
import { EventEmitter } from 'events';
import { MatSelectChange } from '@angular/material';

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

  company: Company;

  uf: State[];
  cidades: City[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.company = new Company();

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
      obs: [null, []]
    });

    this.preco = this.formBuilder.group({
      top_flat_114: [null, []],
      top_flat_170: [null, []],
      digital_284: [null, []],
      kodak_114: [null, []],
      kodak_170: [null, []],
      margem: [null, []],
    });

    this.outros = this.formBuilder.group({
      email_nf: [null, []],
      email_materiais: [null, []],
      email_pedido: [null, []]
    });

    if (localStorage.getItem('_id_company')) {
      this.getCompany();
    }
    else {
      this.apiService.custom_objects_list('states', '', '')
        .subscribe((data_1: Result_States) => {
          if (data_1.error_code == null) {
            this.uf = new Array<State>();
            for (let i = 0; i < data_1.results.length; i++) {
              this.uf.push(data_1.results[i]);             
            }
            this.cidades = new Array<City>();

          }
        }, (data) => {
        });
    }

  }

  onCidades(event: MatSelectChange) {

    if (event.value != this.company.uf) {
      console.log(event);

      for (let i = 0; i < this.uf.length; i++) {
        if (this.uf[i].name == event.value) {

          this.apiService.custom_objects_list('cities', ['state', 'equal to', this.uf[i].ID], null)
            .subscribe((data: Result_Cities) => {
              if (data.error_code == null) {
                this.cidades = new Array<City>();
                for (let i = 0; i < data.results.length; i++) {
                  this.cidades.push(data.results[i]);
                }
                this.cidades = this.cidades.sort();
                this.cadastrais.get('cidade').setValue(this.company.cidade);
              }
            }, (data) => {
            });
        }
      }
    }
  }

  users: string[] = [
    'Leo',
    'Sidnei',
    'Lorival'
  ];

  getForm() {

    this.company.solicitante = this.basicos.get('solicitante').value;
    this.company.novo = this.basicos.get('novo').value;
    this.company.fisica = this.basicos.get('fisica').value;
    this.company.juridica = this.basicos.get('juridica').value;
    this.company.principal = this.basicos.get('principal').value;

    this.company.razao = this.cadastrais.get('razao').value;
    this.company.fantasia = this.cadastrais.get('fantasia').value;
    this.company.endereco = this.cadastrais.get('endereco').value;
    this.company.bairro = this.cadastrais.get('bairro').value;
    this.company.cidade = this.cadastrais.get('cidade').value;
    this.company.uf = this.cadastrais.get('uf').value;
    this.company.cep = this.cadastrais.get('cep').value;
    this.company.tel = this.cadastrais.get('tel').value;
    this.company.fax = this.cadastrais.get('fax').value;
    this.company.cnpj_cpf = this.cadastrais.get('cnpj_cpf').value;
    this.company.ie_rg = this.cadastrais.get('ie_rg').value;
    this.company.comercial = this.cadastrais.get('comercial').value;
    this.company.tel_comercial = this.cadastrais.get('tel_comercial').value;
    this.company.email_comercial = this.cadastrais.get('email_comercial').value;
    this.company.financeiro = this.cadastrais.get('financeiro').value;
    this.company.tel_financeiro = this.cadastrais.get('tel_financeiro').value;
    this.company.email_financeiro = this.cadastrais.get('email_financeiro').value;
    this.company.endereco_cobranca = this.cadastrais.get('endereco_cobranca').value;

    this.company.nf = this.pagamento.get('nf').value;
    this.company.boleto = this.pagamento.get('boleto').value;
    this.company.prazo = this.pagamento.get('prazo').value;
    this.company.obs = this.pagamento.get('obs').value;

    this.company.top_flat_114 = this.preco.get('top_flat_114').value;
    this.company.top_flat_170 = this.preco.get('top_flat_170').value;
    this.company.digital_284 = this.preco.get('digital_284').value;
    this.company.kodak_114 = this.preco.get('kodak_114').value;
    this.company.kodak_170 = this.preco.get('kodak_170').value;
    this.company.margem = this.preco.get('margem').value;

    this.company.email_nf = this.outros.get('email_nf').value;
    this.company.email_materiais = this.outros.get('email_materiais').value;
    this.company.email_pedido = this.outros.get('email_pedido').value;

    this.company.deleted = false;

  }

  getCompany() {

    this.apiService.custom_objects_get('company', localStorage.getItem('_id_company'))
      .subscribe((data: Company) => {
        if (data.error == null) {
          this.company = data;
          console.log(data);
          this.basicos.get('solicitante').setValue(this.company.solicitante);
          this.basicos.get('novo').setValue(this.company.novo);
          this.basicos.get('fisica').setValue(this.company.fisica);
          this.basicos.get('juridica').setValue(this.company.juridica);
          this.basicos.get('principal').setValue(this.company.principal);

          this.cadastrais.get('razao').setValue(this.company.razao);
          this.cadastrais.get('fantasia').setValue(this.company.fantasia);
          this.cadastrais.get('endereco').setValue(this.company.endereco);
          this.cadastrais.get('bairro').setValue(this.company.bairro);
          this.cadastrais.get('cidade').setValue(this.company.cidade);
          this.cadastrais.get('uf').setValue(this.company.uf);
          this.cadastrais.get('cep').setValue(this.company.cep);
          this.cadastrais.get('tel').setValue(this.company.tel);
          this.cadastrais.get('fax').setValue(this.company.fax);
          this.cadastrais.get('cnpj_cpf').setValue(this.company.cnpj_cpf);
          this.cadastrais.get('ie_rg').setValue(this.company.ie_rg);
          this.cadastrais.get('comercial').setValue(this.company.comercial);
          this.cadastrais.get('tel_comercial').setValue(this.company.tel_comercial);
          this.cadastrais.get('email_comercial').setValue(this.company.email_comercial);
          this.cadastrais.get('financeiro').setValue(this.company.financeiro);
          this.cadastrais.get('tel_financeiro').setValue(this.company.tel_financeiro);
          this.cadastrais.get('email_financeiro').setValue(this.company.email_financeiro);
          this.cadastrais.get('endereco_cobranca').setValue(this.company.endereco_cobranca);

          this.pagamento.get('nf').setValue(this.company.nf);
          this.pagamento.get('boleto').setValue(this.company.boleto);
          this.pagamento.get('prazo').setValue(this.company.prazo);
          this.pagamento.get('obs').setValue(this.company.obs);

          this.preco.get('top_flat_114').setValue(this.company.top_flat_114);
          this.preco.get('top_flat_170').setValue(this.company.top_flat_170);
          this.preco.get('digital_284').setValue(this.company.digital_284);
          this.preco.get('kodak_114').setValue(this.company.kodak_114);
          this.preco.get('kodak_170').setValue(this.company.kodak_170);
          this.preco.get('margem').setValue(this.company.margem);

          this.outros.get('email_nf').setValue(this.company.email_nf);
          this.outros.get('email_materiais').setValue(this.company.email_materiais);
          this.outros.get('email_pedido').setValue(this.company.email_pedido);

          this.apiService.custom_objects_list('states', '', '')
            .subscribe((data_1: Result_States) => {
              if (data_1.error_code == null) {
                this.uf = new Array<State>();
                for (let i = 0; i < data_1.results.length; i++) {
                  this.uf.push(data_1.results[i]);

                  if (data_1.results[i].name === this.company.uf) {

                    this.apiService.custom_objects_list('cities', ['state', 'equal to', data_1.results[i].ID], null)
                      .subscribe((data: Result_Cities) => {
                        if (data.error_code == null) {
                          this.cidades = new Array<City>();
                          for (let i = 0; i < data.results.length; i++) {
                            this.cidades.push(data.results[i]);
                          }
                          this.cidades = this.cidades.sort();
                          this.cadastrais.get('cidade').setValue(this.company.cidade);
                        }
                      }, (data) => {
                      });
                  }
                }
                this.cadastrais.get('uf').setValue(this.company.uf);

              }
            }, (data) => {
            });
        } else {
        }
      }, (data) => {

      });


  }

  onSubmit() {

    if (this.basicos.valid && this.cadastrais.valid && this.pagamento.valid && this.preco.valid && this.outros.valid) {
      this.getForm();

      if (!localStorage.getItem("_id_company")) {
        this.save();
      } else {
        this.update();
      }
    }
  }

  save() {
    this.apiService.custom_objects_create('company', this.company)
      .subscribe((data: Company) => {
        if (data.error == null) {
          this.company = data;
          console.log(this.company);
          localStorage.setItem('_id_company', this.company._id);
        } else {
        }
      }, (data) => {
      });
  }

  update() {
    this.apiService.custom_objects_update('company', this.company)
      .subscribe((data: Company) => {
        if (data.error == null) {
          console.log(data);
        } else {
        }
      }, (data) => {
      });
  }

}
