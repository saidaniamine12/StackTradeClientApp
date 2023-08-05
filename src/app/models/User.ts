import {Role} from "./Role";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        role: Role
    ) {}
}
