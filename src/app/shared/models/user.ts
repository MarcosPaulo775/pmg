import { AbstractEntity } from './abstract-entity';

export class User extends AbstractEntity {
    constructor(
        //dados pessoais
        public nome?: string,
        public sobrenome?: string,
        
        //geral
        public acessos?: number,
        public impressoes?: number,
        public edicoes?: number,
        public cores?: number,
        public createUser?: number,
        public download?: number,
        public log?: string,
        
        //os
        public createOs?: number,
        public playPauseOs?: number,
        public endOs?: number,
        
        //Etapas
        public orcamento?: number,
        public atendimento?: number,
        public desenvolvimento?: number,
        public aprovacao?: number,
        public editoracao?: number,
        public coferencia?: number,
        public gravacao?: number,
        public especicao?: number,
        id?: number
    ) {
        super(id);
    }
}