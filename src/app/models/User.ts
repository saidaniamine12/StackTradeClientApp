import {Role} from "./enums/Role";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public companyName: string,
        public location: string,
        role: Role
    ) {}
}
