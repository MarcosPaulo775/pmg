import { AbstractEntity } from './abstract-entity';

export class User extends AbstractEntity {
    constructor(
        //dados pessoais
        public nome?: string,
        public sobrenome?: string,
        public createOs?: number,
        id?: number
    ) {
        super(id);
    }
}