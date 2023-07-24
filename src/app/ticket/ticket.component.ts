import {Component, OnInit} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{
   ticket: Ticket | null = null;

    constructor(private route: ActivatedRoute,
                private searchService: SearchService  ) {

    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        let ticketId = params['id'];
        this.searchService.getTicketById(ticketId).subscribe( ticket => {
          this.ticket = ticket;
        });
      });

    }

}
