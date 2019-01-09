import { Injectable } from '@angular/core';
import { OS, XmlOs } from '../models/os';
import * as jsPDF from 'jspdf';
import * as IMG from '../../shared/models/img';
import { Company } from '../models/company';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: "root",
})
export class AppService {

  private xmls: XmlOs[];
  private cnpj: XmlOs[];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private _FileSaverService: FileSaverService,
  ) { }

  /** recebe um array de ordem de serviço e inicia a geração de um xml para o sistema financeiro */
  generateXmlOs(oss: OS[]) {

    if (oss.length) {

      this.xmls = new Array<XmlOs>();

      for (let cont = 0; cont < oss.length; cont++) {
        let os = oss[cont];
        let xml = new XmlOs();

        xml.cnpj = os.cnpj;
        xml.value = Number(os.valor);

        let temp = os.os.split(' ');
        const dataFim = os.data.split('-');
        let dataInicio = ['', '', ''];
        if (os.data_inicio) {
          dataInicio = os.data_inicio.split('-');
        }

        xml.core = '';

        xml.core += '          <os>' + temp[0] + '</os>\r\n';
        xml.core += '          <dtinicio>' + dataInicio[2] + '/' + dataInicio[1] + '/' + dataInicio[0] + ' ás ' + dataInicio[3] + '</dtinicio>\r\n';
        xml.core += '          <dtfim>' + dataFim[2] + '/' + dataFim[1] + '/' + dataFim[0] + '</dtfim>\r\n';
        xml.core += '          <trabalho>' + os.nome + '</trabalho>\r\n';
        xml.core += '          <ref>OS ID ' + temp[0] + ' Versão ' + temp[2] + '</ref>\r\n';
        xml.core += '          <tipo-pedido>' + os.pedido + '</tipo-pedido>\r\n';
        xml.core += '          <nped>2</nped>\r\n';
        xml.core += '          <espessura>' + os.espessura + '</espessura>\r\n';
        xml.core += '          <quant>' + 'Ainda não sei' + '</quant>\r\n';
        xml.core += '          <itens>\r\n';

        for (let n = 0; n < os.colors.length; n++) {
          xml.core += '                    <item>\r\n';
          xml.core += '                      <item-nome>' + os.colors[n].color + '</item-nome>\r\n';
          xml.core += '                      <item-valor>' + os.colors[n].valor + '</item-valor>\r\n';
          xml.core += '                    </item>\r\n';
        }
        xml.core += '          </itens>\r\n';
        xml.core += '\r\n';
        xml.core += '\r\n';
        xml.core += '            <valor>' + os.valor + '</valor>\r\n';
        xml.core += '              <valor-cm>' + os.valor_cm + '</valor-cm>\r\n';
        xml.core += '          <cm-quadrados-total>' + os.area + '</cm-quadrados-total>\r\n';
        xml.core += '          <desconto>' + '0' + '</desconto>\r\n';

        this.xmls.push(xml);
      }
      this.organizeXmlOs();
    }
  }

  /** Organiza os xmls de acordo com o cnpj do cliente */
  private organizeXmlOs() {

    this.cnpj = new Array<XmlOs>();

    let i, j;
    for (i = 0; i < this.xmls.length; i++) {

      if (i == 0) {
        this.xmls[0].core = '        <det nItem="1">\r\n' + this.xmls[0].core + '        </det>\r\n';
        this.xmls[0].n = 1;
        this.cnpj.push(this.xmls[0]);
      } else {
        for (j = 0; j < this.cnpj.length; j++) {
          if (this.xmls[i].cnpj == this.cnpj[j].cnpj) {
            this.cnpj[j].n++;
            this.cnpj[j].value += this.xmls[i].value;
            this.cnpj[j].core = this.cnpj[j].core + '        <det nItem="' + this.cnpj[j].n + '">\r\n' + this.xmls[i].core + '        </det>\r\n';
            break;
          }
        }

        if (j == this.cnpj.length && this.xmls[i].cnpj != this.cnpj[j - 1].cnpj) {

          this.xmls[i].core = '        <det nItem="1">\r\n' + this.xmls[i].core + '        </det>\r\n';
          this.xmls[i].n = 1;
          this.cnpj.push(this.xmls[i]);

        }
      }
    }
    this.saveXmlOs();
  }

  /** Salva um arquivo xml para o sistema financeiro com todos os dados do "organizeXmlOs()" */
  private saveXmlOs() {

    let data = '<?xml version="1.0" encoding="UTF-8"?>\r\n\r\n\r\n<xmlnucleusfat>\r\n';

    let valor = 0;

    for (let i = 0; i < this.cnpj.length; i++) {

      data += '    <cnpj>\r\n      ' + this.cnpj[i].cnpj + '\r\n\r\n';
      data += this.cnpj[i].core + '\r\n';
      data += '      <totpedsel>' + this.cnpj[i].n + '</totpedsel>\r\n';
      data += '      <totselcli>' + this.cnpj[i].value + '</totselcli>\r\n';
      data += '    </cnpj>\r\n';

      valor += + this.cnpj[i].value;
    }
    data += '  <totxml>' + valor + '</totxml>\r\n</xmlnucleusfat>\r\n';

    let date = new Date();
    let fileName = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '-ordem_servicos.xml';
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([data], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  /** Verifica se a sessão e válida */
  session(error_code: string) {
    if (error_code == 'invalid_session') {
      if (localStorage.getItem('session')) {
        localStorage.removeItem('session');
      } this.router.navigate(['/login']);
    }
  }

  private os: OS;
  private company: Company;

  private layoutCompany(): jsPDF {
    var doc = new jsPDF();

    doc.setFont('times');

    let w = 10;
    let h = 10;
    let n = this.company.fantasia.split('');

    doc.rect(15, 8.5, w + (n.length * 3.5), h);

    let img = IMG.logo;
    let border = 15;
    let logo = 20;
    let width = 210;
    doc.addImage(img, 'JPEG', width - logo - border + 5, border - 5, logo, logo);
    doc.setFontType('bold');
    doc.text(border + 2.5, border, this.company.fantasia);

    doc.setFontType('normal');
    doc.setFontSize(8);
    if (this.company.solicitante) {
      doc.text(border, 24, 'Solicitante / Vendas: ' + this.company.solicitante);
    } else {
      doc.text(border, 24, 'Solicitante / Vendas: ');
    }
    doc.text(border + 38, 24, 'Novo cadastro');
    if (this.company.novo) {
      doc.addImage(IMG.checked, 'JPEG', border + 35, 21.5, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', border + 35, 21.5, 3, 3);
    }
    doc.text(border, 28, 'Tipo de cadastro:');
    doc.text(border + 23, 28, 'Pessoa Física');
    doc.text(border + 42, 28, 'Pessoa Jurídica');
    if (this.company.fisica) {
      doc.addImage(IMG.checked, 'JPEG', border + 20, 25.5, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', border + 20, 25.5, 3, 3);
    }
    if (this.company.juridica) {
      doc.addImage(IMG.checked, 'JPEG', border + 39, 25.5, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', border + 39, 25.5, 3, 3);
    }
    doc.setFontType('bold');
    doc.text(border, 36, 'Dados Cadastrais');
    doc.setFontType('normal');
    if (this.company.razao) {
      doc.text(border, 40, 'Razão Social: ' + this.company.razao);
    } else {
      doc.text(border, 40, 'Razão Social: ');
    }
    if (this.company.fantasia) {
      doc.text(border, 44, 'Nome Fantasia: ' + this.company.fantasia);
    } else {
      doc.text(border, 44, 'Nome Fantasia: ');
    }
    if (this.company.endereco) {
      doc.text(border, 48, 'Endereço: ' + this.company.endereco + '   Número: ' + this.company.n);
    } else {
      doc.text(border, 48, 'Endereço: ');
    }
    if (this.company.bairro && this.company.cidade) {
      doc.text(border, 52, 'Bairro: ' + this.company.bairro + '   Cidade: ' + this.company.cidade + '   UF: ' + this.company.uf);
    } else {
      doc.text(border, 52, 'Bairro: ');
    }
    if (this.company.bairro && !this.company.cidade) {
      doc.text(border, 52, 'Bairro: ' + this.company.bairro);
    } else {
      doc.text(border, 52, 'Bairro: ');
    }
    if (this.company.cep) {
      doc.text(border, 56, 'CEP: ' + this.company.cep);
    } else {
      doc.text(border, 56, 'CEP: ');
    }
    if (this.company.tel) {
      doc.text(border + 30, 56, 'Tel.: ' + this.company.tel);
    } else {
      doc.text(border + 30, 56, 'Tel.: ');
    }
    if (this.company.fax) {
      doc.text(border + 60, 56, 'Fax: ' + this.company.fax);
    } else {
      doc.text(border + 60, 56, 'Fax: ');
    }
    if (this.company.cnpj_cpf) {
      doc.text(border, 60, 'CNPJ / CPF: ' + this.company.cnpj_cpf);
    } else {
      doc.text(border, 60, 'CNPJ / CPF: ');
    }
    if (this.company.ie_rg) {
      doc.text(border + 50, 60, 'I.E. / RG: ' + this.company.ie_rg);
    } else {
      doc.text(border + 50, 60, 'I.E. / RG: ');
    }
    if (this.company.comercial) {
      doc.text(border, 64, 'Contato Comercial: ' + this.company.comercial);
    } else {
      doc.text(border, 64, 'Contato Comercial: ');
    }
    if (this.company.tel_comercial) {
      doc.text(border + 70, 64, 'Tel. Comercial: ' + this.company.tel_comercial);
    } else {
      doc.text(border + 70, 64, 'Tel. Comercial: ');
    }
    if (this.company.email_comercial) {
      doc.text(border + 110, 64, 'e-mail Comercial: ' + this.company.email_comercial);
    } else {
      doc.text(border + 110, 64, 'e-mail Comercial: ');
    }
    if (this.company.financeiro) {
      doc.text(border, 68, 'Contato Financeiro: ' + this.company.financeiro);
    } else {
      doc.text(border, 68, 'Contato Financeiro: ');
    }
    if (this.company.tel_financeiro) {
      doc.text(border + 70, 68, 'Tel. Financeiro: ' + this.company.tel_financeiro);
    } else {
      doc.text(border + 70, 68, 'Tel. Financeiro: ');
    }
    if (this.company.email_financeiro) {
      doc.text(border + 110, 68, 'e-mail Financeiro: ' + this.company.email_financeiro);
    } else {
      doc.text(border + 110, 68, 'e-mail Financeiro: ');
    }
    if (this.company.endereco_cobranca) {
      doc.text(border, 72, 'End. de Cobrança: ' + this.company.endereco_cobranca);
    } else {
      doc.text(border, 72, 'End. de Cobrança: ');
    }

    doc.setFontType('bold');
    doc.text(border, 80, 'Condições comerciais');
    doc.setFontType('normal');

    doc.text(border + 3, 84, 'NF');
    if (this.company.nf) {
      doc.addImage(IMG.checked, 'JPEG', border, 81.5, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', border, 81.5, 3, 3);
    }
    doc.text(border + 13, 84, 'Nota fiscal');
    if (this.company.nota) {
      doc.addImage(IMG.checked, 'JPEG', border + 10, 81.5, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', border + 10, 81.5, 3, 3);
    }
    doc.text(border + 33, 84, 'Boleto');
    if (this.company.boleto) {
      doc.addImage(IMG.checked, 'JPEG', border + 30, 81.5, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', border + 30, 81.5, 3, 3);
    }
    if (this.company.prazo) {
      doc.text(border, 88, 'Prazo: ' + this.company.prazo);
    } else {
      doc.text(border, 88, 'Prazo: ');
    }
    if (this.company.top_flat_114) {
      doc.text(border, 92, 'Top Flat 1,14: R$ ' + this.company.top_flat_114);
    } else {
      doc.text(border, 94, 'Top Flat 1,14: R$ 0,00');
    }
    if (this.company.top_flat_170) {
      doc.text(border, 96, 'Top Flat 1,70: R$ ' + this.company.top_flat_170);
    } else {
      doc.text(border, 96, 'Top Flat 1,70: R$ 0,00');
    }
    if (this.company.digital_284) {
      doc.text(border, 100, 'Digital 2,84: R$ ' + this.company.digital_284);
    } else {
      doc.text(border, 100, 'Digital 2,84: R$ 0,00');
    }
    if (this.company.kodak_114) {
      doc.text(border, 104, 'Kodak NX 1,14: R$ ' + this.company.kodak_114);
    } else {
      doc.text(border, 104, 'Kodak NX 1,14: R$ 0,00');
    }
    if (this.company.kodak_170) {
      doc.text(border, 108, 'Kodak NX 1,7: R$ ' + this.company.kodak_170);
    } else {
      doc.text(border, 108, 'Kodak NX 1,7: R$ 0,00');
    }
    if (this.company.margem_l) {
      doc.text(border, 112, 'Margem esquerda: ' + this.company.margem_l + 'mm');
    } else {
      doc.text(border, 112, 'Margem esquerda:');
    }
    if (this.company.margem_r) {
      doc.text(border + 35, 112, 'Margem direita: ' + this.company.margem_r + 'mm');
    } else {
      doc.text(border + 35, 112, 'Margem direita:');
    }
    if (this.company.margem_u) {
      doc.text(border + 70, 112, 'Margem superior: ' + this.company.margem_u + 'mm');
    } else {
      doc.text(border + 70, 112, 'Margem superior:');
    }
    if (this.company.margem_d) {
      doc.text(border + 105, 112, 'Margem inferior: ' + this.company.margem_d + 'mm');
    } else {
      doc.text(border + 105, 112, 'Margem inferior:');
    }
    if (this.company.obs) {
      doc.text(border, 116, 'Observação: ' + this.company.obs);
    } else {
      doc.text(border, 116, 'Observação:');
    }

    if (this.company.email_nf) {
      doc.text(border, 124, 'E-mail para NFe: ' + this.company.email_nf);
    } else {
      doc.text(border, 124, 'E-mail para NFe:');
    }
    if (this.company.email_materiais) {
      doc.text(border, 128, 'E-mail para envio de materiais: ' + this.company.email_materiais);
    } else {
      doc.text(border, 128, 'E-mail para envio de materiais:');
    }
    if (this.company.email_pedido) {
      doc.text(border, 132, 'E-mail de Pedido / Valores: ' + this.company.email_pedido);
    } else {
      doc.text(border, 132, 'E-mail de Pedido / Valores:');
    }
    return doc;
  }

  downloadCompany(company: Company) {
    this.company = company;
    let doc = this.layoutCompany();

    let fileName = this.company.fantasia;

    doc.save(fileName + '.pdf');
  }

  printCompany(company: Company) {
    this.company = company;
    let doc = this.layoutCompany();
    doc.autoPrint();

    let string = doc.output('datauristring');
    let iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    let print = window.open();
    print.document.open();
    print.document.write(iframe);
    print.document.close();
  }

  private layoutOS(): jsPDF {
    var doc = new jsPDF();

    doc.setFont('times');

    let w = 46;
    let h = 10;
    let n = this.os.os.split('');

    doc.rect(15, 8.5, w + (n.length * 3.2), h);

    let img = IMG.logo;
    let border = 15;
    let logo = 20;
    let width = 210;
    doc.addImage(img, 'JPEG', width - logo - border + 5, border - 5, logo, logo);
    doc.setFontType('bold');
    doc.text(border + 2.5, border, 'Ordem de serviço: ' + this.os.os);

    doc.setFontType('normal');
    doc.setFontSize(8);
    if (this.os.nome) {
      doc.text(border, 24, 'Nome do serviço: ' + this.os.nome);
    } else {
      doc.text(border, 24, 'Nome do serviço: ');
    }
    if (this.os.cliente) {
      doc.text(border, 28, 'Cliente: ' + this.os.cliente);
    } else {
      doc.text(border, 28, 'Cliente: ');
    }
    if (this.os.pedido) {
      doc.text(border + 85, 24, 'Pedido: ' + this.os.pedido);
    } else {
      doc.text(border + 85, 24, 'Pedido: ');
    }
    if (this.os.codigo) {
      doc.text(border + 85, 28, 'Código do produto: ' + this.os.codigo);
    } else {
      doc.text(border + 85, 28, 'Código do produto: ');
    }
    if (this.os.data) {
      doc.text(border + 85, 32, 'Data de Despacho: ' + this.os.data.split('-')[2] + '/' + this.os.data.split('-')[1] + '/' + this.os.data.split('-')[0]);
    } else {
      doc.text(border + 85, 32, 'Data de Despacho: ');
    }
    if (this.os.codigo) {
      doc.text(border, 32, 'Código Barras: ' + this.os.codigo);
    } else {
      doc.text(border, 32, 'Código Barras: ');
    }

    doc.setFontType('bold');
    doc.text(border, 38, 'Clichê');
    doc.setFontType('normal');
    if (this.os.tecnologia) {
      doc.text(border, 42, 'Tecnologia: ' + this.os.tecnologia);
    } else {
      doc.text(border, 42, 'Tecnologia: ');
    }
    if (this.os.espessura) {
      doc.text(border + 85, 42, 'Espessura: ' + this.os.espessura);
    } else {
      doc.text(border + 85, 42, 'Espessura: ');
    }
    if (this.os.material) {
      doc.text(border, 46, 'Material: ' + this.os.material);
    } else {
      doc.text(border, 46, 'Material: ');
    }
    if (this.os.camada) {
      doc.text(border + 85, 46, 'Camada: ' + this.os.camada);
    } else {
      doc.text(border + 85, 46, 'Camada: ');
    }
    if (this.os.local) {
      doc.text(border, 50, 'Local: ' + this.os.local);
    } else {
      doc.text(border, 50, 'Local: ');
    }
    if (this.os.obs_cliche) {
      doc.text(border, 54, 'observação: ' + this.os.obs_cliche);
    } else {
      doc.text(border, 54, 'observação: ');
    }

    doc.setFontType('bold');
    doc.text(border, 60, 'Montagem');
    doc.setFontType('normal');
    if (this.os.largura) {
      doc.text(border, 64, 'Tamanho arte largura: ' + this.os.largura);
    } else {
      doc.text(border, 64, 'Tamanho arte largura: ');
    }
    if (this.os.manta) {
      doc.text(border + 85, 64, 'Manta: ' + this.os.manta);
    } else {
      doc.text(border + 85, 64, 'Manta: ');
    }
    if (this.os.altura) {
      doc.text(border, 68, 'Tamanho Arte Altura: ' + this.os.altura);
    } else {
      doc.text(border, 68, 'Tamanho Arte Altura: ');
    }
    if (this.os.desenvolvimento) {
      doc.text(border + 85, 68, 'Desenvolvimento: ' + this.os.desenvolvimento);
    } else {
      doc.text(border + 85, 68, 'Desenvolvimento: ');
    }
    if (this.os.largura_material) {
      doc.text(border, 72, 'Largura Material: ' + this.os.largura_material);
    } else {
      doc.text(border, 72, 'Largura Material: ');
    }
    if (this.os.fechamento) {
      doc.text(border + 85, 72, 'Fechamento: ' + this.os.fechamento);
    } else {
      doc.text(border + 85, 72, 'Fechamento: ');
    }
    if (this.os.qtpistas) {
      doc.text(border, 76, 'Quantidade de Pistas: ' + this.os.qtpistas);
    } else {
      doc.text(border, 76, 'Quantidade de Pistas: ');
    }
    if (this.os.entre_pistas) {
      doc.text(border + 85, 76, 'Entre Pistas: ' + this.os.entre_pistas);
    } else {
      doc.text(border + 85, 76, 'Entre Pistas: ');
    }
    if (this.os.qtpasso) {
      doc.text(border, 80, 'Quantidade Passo: ' + this.os.qtpasso);
    } else {
      doc.text(border, 80, 'Quantidade Passo: ');
    }
    if (this.os.entre_passos) {
      doc.text(border + 85, 80, 'Entre Passo: ' + this.os.entre_passos);
    } else {
      doc.text(border + 85, 80, 'Entre Passo: ');
    }
    if (this.os.z) {
      doc.text(border, 84, 'Z: ' + this.os.z);
    } else {
      doc.text(border, 84, 'Z: ');
    }
    if (this.os.faca) {
      doc.text(border + 85, 84, 'Num. Faca: ' + this.os.faca);
    } else {
      doc.text(border + 85, 84, 'Num. Faca: ');
    }
    if (this.os.obs_montagem) {
      doc.text(border, 88, 'Observações: ' + this.os.obs_montagem);
    } else {
      doc.text(border, 88, 'Observações: ');
    }

    let x = 135;
    let y = 65;
    doc.text(x + 3, y + 2.5, 'Esquerda');
    doc.text(x + 3, y + 5.5, 'Direita');
    doc.text(x + 3, y + 8.5, 'Topo');
    doc.text(x + 3, y + 11.5, 'Base');
    if (this.os.esquerda) {
      doc.addImage(IMG.checked, 'JPEG', x, y, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x, y, 3, 3);
    }
    if (this.os.direita) {
      doc.addImage(IMG.checked, 'JPEG', x, y + 3, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x, y + 3, 3, 3);
    }
    if (this.os.topo) {
      doc.addImage(IMG.checked, 'JPEG', x, y + 6, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x, y + 6, 3, 3);
    }
    if (this.os.base) {
      doc.addImage(IMG.checked, 'JPEG', x, y + 9, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x, y + 9, 3, 3);
    }

    if (this.os.esquerda_mm) {
      doc.text(x + 16, y + 2.5, this.os.esquerda_mm + ' mm');
    } else {
      doc.text(x + 16, y + 2.5, ' mm');
    }
    if (this.os.direita_mm) {
      doc.text(x + 16, y + 5.5, this.os.direita_mm + ' mm');
    } else {
      doc.text(x + 16, y + 5.5, ' mm');
    }
    if (this.os.topo_mm) {
      doc.text(x + 16, y + 8.5, this.os.topo_mm + ' mm');
    } else {
      doc.text(x + 16, y + 8.5, ' mm');
    }
    if (this.os.base_mm) {
      doc.text(x + 16, y + 11.5, this.os.base_mm + ' mm');
    } else {
      doc.text(x + 16, y + 11.5, ' mm');
    }

    doc.text(x + 33, y + 2.5, 'Marcas Refile');
    doc.text(x + 33, y + 5.5, 'Marca corte');
    doc.text(x + 33, y + 8.5, 'Camerom');
    doc.text(x + 33, y + 11.5, 'Microponto');
    if (this.os.refile) {
      doc.addImage(IMG.checked, 'JPEG', x + 30, y, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x + 30, y, 3, 3);
    }
    if (this.os.corte) {
      doc.addImage(IMG.checked, 'JPEG', x + 30, y + 3, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x + 30, y + 3, 3, 3);
    }
    if (this.os.cameron) {
      doc.addImage(IMG.checked, 'JPEG', x + 30, y + 6, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x + 30, y + 6, 3, 3);
    }
    if (this.os.microponto) {
      doc.addImage(IMG.checked, 'JPEG', x + 30, y + 9, 3, 3);
    } else {
      doc.addImage(IMG.unchecked, 'JPEG', x + 30, y + 9, 3, 3);
    }

    y = 100;
    x = 15;

    doc.setFontType('bold');
    doc.text(border, y - 5, 'Cores');
    doc.setFontType('normal');

    doc.setLineWidth(6);
    doc.setDrawColor(179, 179, 179);
    doc.line(x, y, 195, y);

    doc.setLineWidth(0.05);
    doc.setDrawColor(0, 0, 0);
    doc.line(x, y - 3, 195, y - 3);
    doc.line(x, y + 3, 195, y + 3);

    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.text(x + 4, y + 1, 'Cor');

    doc.setFontSize(10);
    doc.text(x + 45, y + 1, 'Lineatura 1');

    doc.setFontSize(10);
    doc.text(x + 70, y + 1, 'Lineatura 2');

    doc.setFontSize(10);
    doc.text(x + 95, y + 1, 'Angulo');

    doc.setFontSize(10);
    doc.text(x + 115, y + 1, 'Jogos');

    doc.setFontSize(10);
    doc.text(x + 135, y + 1, 'Configuração');

    doc.setFontType('normal');
    doc.setFontSize(8);
    let i;
    for (i = 0, y = y + 9; i < this.os.colors.length; i++ , y = y + 6) {
      doc.text(x + 4, y - 2, this.os.colors[i].color);
      if (this.os.colors[i].lineatura1)
        doc.text(x + 45, y - 2, this.os.colors[i].lineatura1);
      if (this.os.colors[i].lineatura2)
        doc.text(x + 70, y - 2, this.os.colors[i].lineatura2);
      if (this.os.colors[i].angulo)
        doc.text(x + 95, y - 2, this.os.colors[i].angulo);
      if (this.os.colors[i].jogos)
        doc.text(x + 115, y - 2, this.os.colors[i].jogos);
      doc.setFontSize(6);
      if (this.os.colors[i].fotocelula) {
        doc.addImage(IMG.checked, 'JPEG', 150, y - 4.5, 3, 3);
        doc.text(153, y - 2.5, 'Fotocélula');
      } else {
        doc.addImage(IMG.unchecked, 'JPEG', 150, y - 4.5, 3, 3);
        doc.text(153, y - 2.5, 'Fotocélula');
      }
      if (this.os.colors[i].unitario) {
        doc.addImage(IMG.checked, 'JPEG', 164, y - 4.5, 3, 3);
        doc.text(167, y - 2.5, 'Unitário');
      } else {
        doc.addImage(IMG.unchecked, 'JPEG', 164, y - 4.5, 3, 3);
        doc.text(167, y - 2.5, 'Unitário');
      }
      if (this.os.colors[i].camerom) {
        doc.addImage(IMG.checked, 'JPEG', 175, y - 4.5, 3, 3);
        doc.text(178, y - 2.5, 'Camerom');
      } else {
        doc.addImage(IMG.unchecked, 'JPEG', 175, y - 4.5, 3, 3);
        doc.text(178, y - 2.5, 'Camerom');
      }
      doc.line(15, y, 195, y);
      doc.setFontSize(8);
    }

    doc.setFontSize(8);
    if (this.os.perfil) {
      doc.text(x, y - 2, 'Perfil de cor: ' + this.os.perfil);
    } else {
      doc.text(x, y - 2, 'Perfil de cor: ');
    }
    if (this.os.obs_color) {
      doc.text(x, y + 1, 'Observações: ' + this.os.obs_color);
    } else {
      doc.text(x, y + 1, 'Observações: ');
    }

    return doc
  }

  downloadOS(os: OS) {
    this.os = os;
    let doc = this.layoutOS();

    let temp = this.os.os.split(' ');
    let fileName = temp[0] + temp[1] + temp[2];

    doc.save(fileName + '.pdf');
  }

  printOS(os: OS) {
    this.os = os;
    let doc = this.layoutOS();
    doc.autoPrint();

    let string = doc.output('datauristring');
    let iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    let print = window.open();
    print.document.open();
    print.document.write(iframe);
    print.document.close();
  }
}