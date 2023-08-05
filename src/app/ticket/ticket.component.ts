import {Component, OnInit} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{
   ticket: Ticket | null = null;

    constructor(private route: ActivatedRoute,
                private searchService: SearchService, private auth:AuthService ) {

    }

    ngOnInit(): void {
      this.route.params.subscribe(result => {
        let ticketId = result['id'];
        this.searchService.getTicketById(ticketId).subscribe( ticket => {
          this.ticket = ticket;
        },
          error => {
            console.log(error.error)
          }
        );
      });

    }

}
