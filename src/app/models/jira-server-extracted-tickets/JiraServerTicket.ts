import {Fields} from "./Fields";


export class JiraServerTicket{
  constructor(
    public id: string,
    public key: string,
    public self: string,
    public fields:Fields
  ){}
}
