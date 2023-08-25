import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";
import {AuthService} from "../auth/auth.service";
import {JiraServerTicket} from "../models/jira-server-extracted-tickets/JiraServerTicket";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Comments} from "../models/jira-server-extracted-tickets/Comments";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{
   ticket: JiraServerTicket | null = null;
   descriptionHtmlString: SafeHtml | null = null;
   comments:Comments[] = [];


    constructor(private route: ActivatedRoute,
                private searchService: SearchService,
                private auth:AuthService,
                private sanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
      this.route.params.subscribe(result => {
        let ticketId = result['id'];
        this.searchService.getTicketById(ticketId).subscribe(
          ticket => {
          this.ticket = ticket;
          this.comments = ticket.fields.comment.comments;
            console.log(this.comments );
          const htmlString = this.markdownToHtml(this.ticket.fields.description);
          this.descriptionHtmlString = this.sanitizer.bypassSecurityTrustHtml(htmlString);
        },
          error => {
            console.log(error.error)
          }
        );
      });

    }

   markdownToHtml( markdown:string ): string{
    const headingRegex = /(h[1-6])\. (.+)(\r\n|\r|\n)/g;
    const listItemRegex = / (# .+)(\r\n|\r|\n)/g;

    const html = markdown
      .replace(headingRegex, '<$1><a name="$2"></a>$2</$1>')
      .replace(listItemRegex, '<li>$1</li>')
      .replace(/\r\n|\r|\n/g, '<br>');

    return html;
  }


}
