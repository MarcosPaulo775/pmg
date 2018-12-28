import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatSelectChange, MatSnackBar } from '@angular/material';

import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { CrmComponent } from '../../crm/component/crm.component';
import { Company, State, City } from 'src/app/shared/models/company';
import { Result_Item, Result_States, Result_Cities } from 'src/app/shared/models/api';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

  basicos: FormGroup;
  cadastrais: FormGroup;
  pagamento: FormGroup;
  preco: FormGroup;
  outros: FormGroup;

  company: Company;

  uf: State[];
  cidades: City[];
  faturamento: string[];
  prazo: string[];
  users: string[] = [];

  constructor(
    private formBuilder: FormBuilder,

    public snackBar: MatSnackBar,

    private appService: AppService,
    private authService: AuthService,
    private apiService: ApiService,
    private crmComponent: CrmComponent,
  ) { }

  ngOnInit() {
    this.crmComponent.title = 'Cadastrar Empresa';
    this.crmComponent.company = '';
    this.crmComponent.dashboard = '';

    this.company = new Company();

    this.initForm();
  }

  /** inicializa formulario */
  initForm() {
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
      n: [null, []],
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
      nota: [null, []],
      prazo: [null, []],
      faturamento: [null, []],
      obs: [null, []]
    });

    this.preco = this.formBuilder.group({
      top_flat_114: [null, []],
      top_flat_170: [null, []],
      digital_284: [null, []],
      kodak_114: [null, []],
      kodak_170: [null, []],
      margem_u: [null, []],
      margem_d: [null, []],
      margem_l: [null, []],
      margem_r: [null, []],
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
      this.authService.users_list_users()
        .subscribe((data: User[]) => {
          if (data[0]) {
            for (let i = 0; i < data.length; i++) {
              this.users.push(data[i].fullname);
            }
          }
        }, (data) => {
          console.log(data);
        })

      this.apiService.custom_objects_list('states', '', '')
        .subscribe((data_1: Result_States) => {
          if (!data_1.error_code) {
            this.uf = new Array<State>();
            for (let i = 0; i < data_1.results.length; i++) {
              this.uf.push(data_1.results[i]);
            }
            this.cidades = new Array<City>();
          }
        }, (data) => {
          console.log(data);
        });

      this.apiService.custom_objects_list('revenues', '', '')
        .subscribe((data: Result_Item) => {
          if (!data.error_code) {
            this.faturamento = new Array<string>();
            for (let i = 0; i < data.results.length; i++) {
              this.faturamento.push(data.results[i].name);
            }
          }
        }, (data) => {
          console.log(data);
        });

      this.apiService.custom_objects_list('term', '', '')
        .subscribe((data: Result_Item) => {
          if (!data.error_code) {
            this.prazo = new Array<string>();
            for (let i = 0; i < data.results.length; i++) {
              this.prazo.push(data.results[i].name);
            }
          }
        }, (data) => {
          console.log(data);
        });
    }
  }

  /** Busca as cidades de acordo com o estado */
  onCidades(event: MatSelectChange) {

    if (event.value != this.company.uf) {

      for (let i = 0; i < this.uf.length; i++) {
        if (this.uf[i].name == event.value) {

          this.apiService.custom_objects_list('cities', ['state', 'equal to', this.uf[i].ID], null)
            .subscribe((data: Result_Cities) => {
              if (!data.error_code) {
                this.cidades = new Array<City>();
                for (let i = 0; i < data.results.length; i++) {
                  this.cidades.push(data.results[i]);
                }
                this.cidades = this.cidades.sort();
                this.cadastrais.get('cidade').setValue(this.company.cidade);
              }
            }, (data) => {
              console.log(data);
            });
        }
      }
    }
  }

  /** Copia parte do formulario -- OBS: Nível de Preguiça e de mais de 8000 */
  copy() {
    this.company.financeiro = this.company.email_comercial;
    this.company.tel_financeiro = this.company.tel_comercial;
    this.company.email_financeiro = this.company.comercial;
    this.cadastrais.get('financeiro').setValue(this.cadastrais.get('comercial').value);
    this.cadastrais.get('tel_financeiro').setValue(this.cadastrais.get('tel_comercial').value);
    this.cadastrais.get('email_financeiro').setValue(this.cadastrais.get('email_comercial').value);
  }

  /** Busca dados do formulario */
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
    this.company.n = this.cadastrais.get('n').value;
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
    this.company.nota = this.pagamento.get('nota').value;
    this.company.prazo = this.pagamento.get('prazo').value;
    this.company.faturamento = this.pagamento.get('faturamento').value;
    this.company.obs = this.pagamento.get('obs').value;

    this.company.top_flat_114 = this.preco.get('top_flat_114').value;
    this.company.top_flat_170 = this.preco.get('top_flat_170').value;
    this.company.digital_284 = this.preco.get('digital_284').value;
    this.company.kodak_114 = this.preco.get('kodak_114').value;
    this.company.kodak_170 = this.preco.get('kodak_170').value;
    this.company.margem_u = this.preco.get('margem_u').value;
    this.company.margem_d = this.preco.get('margem_d').value;
    this.company.margem_l = this.preco.get('margem_l').value;
    this.company.margem_r = this.preco.get('margem_r').value;

    this.company.email_nf = this.outros.get('email_nf').value;
    this.company.email_materiais = this.outros.get('email_materiais').value;
    this.company.email_pedido = this.outros.get('email_pedido').value;

    this.company.deleted = false;
  }

  /** Preenche dados do formulario */
  getCompany() {
    this.apiService.custom_objects_get('company', localStorage.getItem('_id_company'))
      .subscribe((data: Company) => {
        if (!data.error) {
          this.company = data;
          this.basicos.get('novo').setValue(this.company.novo);
          this.basicos.get('fisica').setValue(this.company.fisica);
          this.basicos.get('juridica').setValue(this.company.juridica);
          this.basicos.get('principal').setValue(this.company.principal);

          this.cadastrais.get('razao').setValue(this.company.razao);
          this.cadastrais.get('fantasia').setValue(this.company.fantasia);
          this.cadastrais.get('endereco').setValue(this.company.endereco);
          this.cadastrais.get('bairro').setValue(this.company.bairro);
          this.cadastrais.get('cidade').setValue(this.company.cidade);
          this.cadastrais.get('n').setValue(this.company.n);
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
          this.pagamento.get('nota').setValue(this.company.nota);
          this.pagamento.get('prazo').setValue(this.company.prazo);
          this.pagamento.get('obs').setValue(this.company.obs);

          this.preco.get('top_flat_114').setValue(this.company.top_flat_114);
          this.preco.get('top_flat_170').setValue(this.company.top_flat_170);
          this.preco.get('digital_284').setValue(this.company.digital_284);
          this.preco.get('kodak_114').setValue(this.company.kodak_114);
          this.preco.get('kodak_170').setValue(this.company.kodak_170);
          this.preco.get('margem_u').setValue(this.company.margem_u);
          this.preco.get('margem_d').setValue(this.company.margem_u);
          this.preco.get('margem_l').setValue(this.company.margem_u);
          this.preco.get('margem_r').setValue(this.company.margem_u);

          this.outros.get('email_nf').setValue(this.company.email_nf);
          this.outros.get('email_materiais').setValue(this.company.email_materiais);
          this.outros.get('email_pedido').setValue(this.company.email_pedido);

          this.authService.users_list_users()
            .subscribe((data: User[]) => {
              if (data[0]) {
                for (let i = 0; i < data.length; i++) {
                  this.users.push(data[i].fullname);
                }
                if (this.users.indexOf(this.company.solicitante)) {
                  this.users.push(this.company.solicitante);
                }
                this.basicos.get('solicitante').setValue(this.company.solicitante);
              }
            }, (data) => {
              console.log(data);
            })

          this.apiService.custom_objects_list('revenues', '', '')
            .subscribe((data: Result_Item) => {
              if (!data.error_code) {
                this.faturamento = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.faturamento.push(data.results[i].name);
                }
                this.pagamento.get('faturamento').setValue(this.company.faturamento);
              }
            }, (data) => {
              console.log(data);
            });

          this.apiService.custom_objects_list('term', '', '')
            .subscribe((data: Result_Item) => {
              if (!data.error_code) {
                this.prazo = new Array<string>();
                for (let i = 0; i < data.results.length; i++) {
                  this.prazo.push(data.results[i].name);
                }
                this.pagamento.get('prazo').setValue(this.company.prazo);
              }
            }, (data) => {
              console.log(data);
            });

          this.apiService.custom_objects_list('states', '', '')
            .subscribe((data_1: Result_States) => {
              if (!data_1.error_code) {
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
                        console.log(data);
                      });
                  }
                }
                this.cadastrais.get('uf').setValue(this.company.uf);
              }
            }, (data) => {
              console.log(data);
            });
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Verifica se vai salvar ou atualizar */
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

  /** salva dados */
  save() {
    this.apiService.custom_objects_create('company', this.company)
      .subscribe((data: Company) => {
        if (!data.error) {
          this.company = data;
          localStorage.setItem('_id_company', this.company._id);
          this.appService.openSnackBar('Salvo', 'ok');
        } else {
          this.appService.openSnackBar('Erro ao salvar', 'ok');
        }
      }, (data) => {
        this.appService.openSnackBar('Erro ao salvar', 'ok');
      });
  }

  /** atualiza dados */
  update() {
    this.apiService.custom_objects_update('company', this.company)
      .subscribe((data: Company) => {
        if (!data.error) {
          this.appService.openSnackBar('Salvo', 'ok');
        } else {
          this.appService.openSnackBar('Erro ao salvar', 'ok');
        }
      }, (data) => {
        this.appService.openSnackBar('Erro ao salvar', 'ok');
      });
  }

  /** Imprime Layout */
  print() {
    this.appService.printCompany(this.company);
  }

  /** download do layout */
  downloadPDF() {
    this.appService.downloadCompany(this.company);
  }

}
