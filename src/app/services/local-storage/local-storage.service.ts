import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  addTicketToLocalStorage(ticket_id: string) {
    const ticket_idsJSON = localStorage.getItem('ticket_ids');
    let ticket_ids_array;
    let ticket_ids_set;
    if (ticket_idsJSON !== null && ticket_idsJSON !== undefined && ticket_idsJSON !== '{}') {
      ticket_ids_array = JSON.parse(ticket_idsJSON);
      ticket_ids_set = new Set(ticket_ids_array);
    } else {
      ticket_ids_set = new Set();
    }
    // Add the new ticket_id to the Set
    ticket_ids_set.add(ticket_id);
    ticket_ids_array = Array.from(ticket_ids_set);
    localStorage.setItem('ticket_ids', JSON.stringify(ticket_ids_array));

  }

  getTicketFromLocalStorage() : any {
    const ticket_idsJSON = localStorage.getItem('ticket_ids');
    let ticket_ids_array;
    if (ticket_idsJSON !== null && ticket_idsJSON !== undefined && ticket_idsJSON !== '{}') {
      ticket_ids_array = JSON.parse(ticket_idsJSON);
      return ticket_ids_array;
    }
  }
}
