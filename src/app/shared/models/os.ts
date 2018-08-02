import { AbstractEntity } from './abstract-entity';
import { User } from './user';

export class Os extends AbstractEntity {
    constructor(
        public user?: User,
        public sobrenome?: string,
        id?: number
    ) {
        super(id);
    }
}