import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OS } from '../models/os';
import * as jsPDF from 'jspdf';
import * as IMG from '../../shared/models/img';


@Injectable({
    providedIn: "root",
})
export class AppService {

    constructor(private http: HttpClient) { }

    os: OS;

    layoutOS(): jsPDF {
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

        y = y + 13;
        doc.setFontType('bold');
        doc.text(border, y - 5, 'Prova');
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
        doc.text(x + 45, y + 1, 'Anilox');

        doc.setFontSize(10);
        doc.text(x + 70, y + 1, 'Ganho de ponto');

        doc.setFontSize(10);
        doc.text(x + 105, y + 1, 'Densidade');

        doc.setFontSize(10);
        doc.text(x + 140, y + 1, 'BCM');

        doc.setFontType('normal');
        doc.setFontSize(8);
        for (i = 0, y = y + 9; i < this.os.colors.length; i++ , y = y + 6) {
            doc.text(x + 4, y - 2, this.os.colors[i].color);
            if (this.os.colors[i].anilox)
                doc.text(x + 45, y - 2, this.os.colors[i].anilox);
            if (this.os.colors[i].ganho)
                doc.text(x + 70, y - 2, this.os.colors[i].ganho);
            if (this.os.colors[i].densidade)
                doc.text(x + 105, y - 2, this.os.colors[i].densidade);
            if (this.os.colors[i].bcm)
                doc.text(x + 140, y - 2, this.os.colors[i].bcm);
            doc.line(15, y, 195, y);
        }

        doc.setFontSize(8);
        if (this.os.substrato_prova) {
            doc.text(x, y - 2, 'Substrato: ' + this.os.substrato_prova);
        } else {
            doc.text(x, y - 2, 'Substrato: ');
        }
        if (this.os.velocidade) {
            doc.text(x + 60, y - 2, 'Velocidade: ' + this.os.velocidade);
        } else {
            doc.text(x + 60, y - 2, 'Velocidade: ');
        }
        if (this.os.dupla) {
            doc.text(x, y + 1, 'Dupla Face: ' + this.os.dupla);
        } else {
            doc.text(x, y + 1, 'Dupla Face: ');
        }
        if (this.os.temperatura) {
            doc.text(x + 60, y + 1, 'Temperatura: ' + this.os.temperatura);
        } else {
            doc.text(x + 60, y + 1, 'Temperatura: ');
        }
        if (this.os.horario) {
            doc.text(x, y + 4, 'Horário de impressão: ' + this.os.horario);
        } else {
            doc.text(x, y + 4, 'Horário de impressão: ');
        }
        if (this.os.obs_prova) {
            doc.text(x + 60, y + 4, 'Observações: ' + this.os.obs_prova);
        } else {
            doc.text(x + 60, y + 4, 'Observações: ');
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
        //doc.autoPrint();

        let string = doc.output('datauristring');
        let iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
        let print = window.open();
        print.document.open();
        print.document.write(iframe);
        print.document.close();
    }
}