import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';

@Injectable({
    providedIn: "root",
})
export class ReportService {

    line: string[];
    user: User;
    users: User[];
    tabela: User[];

    splitLine(fileText: any): Array<User> {

        this.line = fileText.split("\r\n");

        this.user = new User();
        this.users = new Array<User>();
        this.tabela = new Array<User>();

        for (let i = 1; i < this.line.length; i = i + 6) {

            this.user = { nome: '', acessos: 0, impressoes: 0, edicoes: 0, cores: 0, createUser: 0, download: 0, createOs: 0, playPauseOs: 0, endOs: 0, orcamento:0, atendimento: 0, desenvolvimento: 0, aprovacao: 0, editoracao: 0, coferencia: 0, gravacao: 0, especicao: 0};
            this.user.nome = this.line[i];
            this.user.log = this.line[i + 3];
            this.pushTabela(this.user);
        }

        console.log(this.tabela);
        return this.tabela;
    }

    pushTabela(user: User) {
        let fim = this.tabela.length - 1;
        user = this.soma(user);
        user.log = '';
        if (fim == -1) {
            this.tabela.push(user);
        }
        else {
            for (let i = 0; ; i++) {
                if (this.tabela[i].nome == user.nome) {
                    this.tabela[i].acessos = this.tabela[i].acessos + user.acessos;
                    this.tabela[i].impressoes = this.tabela[i].impressoes + user.impressoes;
                    this.tabela[i].edicoes = this.tabela[i].edicoes + user.edicoes;
                    this.tabela[i].cores = this.tabela[i].cores + user.cores;
                    this.tabela[i].createUser = this.tabela[i].createUser + user.createUser;
                    this.tabela[i].download = this.tabela[i].download + user.download;
                    this.tabela[i].createOs = this.tabela[i].createOs + user.createOs;
                    this.tabela[i].playPauseOs = this.tabela[i].playPauseOs + user.playPauseOs;
                    this.tabela[i].endOs = this.tabela[i].endOs + user.endOs;
                    this.tabela[i].orcamento = this.tabela[i].orcamento + user.orcamento;
                    this.tabela[i].atendimento = this.tabela[i].atendimento + user.atendimento;
                    this.tabela[i].desenvolvimento = this.tabela[i].desenvolvimento + user.desenvolvimento;
                    this.tabela[i].aprovacao = this.tabela[i].aprovacao + user.aprovacao;
                    this.tabela[i].editoracao = this.tabela[i].editoracao + user.editoracao;
                    this.tabela[i].coferencia = this.tabela[i].coferencia + user.coferencia;
                    this.tabela[i].gravacao = this.tabela[i].gravacao + user.gravacao;
                    this.tabela[i].especicao = this.tabela[i].especicao + user.especicao;
                    break;
                }
                else if (this.tabela[i].nome != user.nome && i == fim) {
                    this.tabela.push(user);
                    break;
                }
            }
        }
    }

    soma(user: User): User {
        if (user.log.indexOf('Ordem de serviço criada com sucesso.') != -1) {
            user.createOs = 1;
        }
        else if (user.log.indexOf('Ordem de serviço iniciado na etapada Editoração do fluxo de serviço.') != -1) {
            user.playPauseOs = 1;
            user.editoracao = 1;
        }
        else if (user.log.indexOf('imprimiu') != -1) {
            user.impressoes = 1;
        }
        else if (user.log.indexOf('Dados ordem de serviço editada') != -1) {
            user.edicoes = 1;
        }
        else if (user.log.indexOf('Cores cadastradas') != -1) {
            user.cores = 1;
        }
        else if (user.log.indexOf('Expedição editada') != -1) {
            user.edicoes = 1;
        }
        else if (user.log.indexOf('Informações editada') != -1) {
            user.edicoes = 1;
        }
        else if (user.log.indexOf('alterada para a etapada Gravação') != -1) {
            user.gravacao = 1;
        }
        else if (user.log.indexOf('alterada para a etapada Aprovação') != -1) {
            user.aprovacao = 1;
        }
        else if (user.log.indexOf('alterada para a etapada Atendimento') != -1) {
            user.atendimento = 1;
        }
        else if (user.log.indexOf('alterada para a etapada Desenvolvimento') != -1) {
            user.desenvolvimento = 1;
        }
        else if (user.log.indexOf('alterada para a etapada Coferência') != -1) {
            user.coferencia = 1;
        }
        
        return user;
    }
}