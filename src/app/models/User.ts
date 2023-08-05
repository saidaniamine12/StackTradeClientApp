import {Role} from "./Role";

export class User {
    constructor(
        public id: number,
        public name: string,
        public emailAddress: string,
        role: Role,
        token?: string
    ) {}
}
