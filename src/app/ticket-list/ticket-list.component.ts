import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TicketListItem} from "../models/TicketListItem";
import {User} from "../models/User";
import {tick} from "@angular/core/testing";

// Define a Question class


// @ts-ignore
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnDestroy, OnInit {

  constructor() {
  }


  // Array of tickets
  ticketList: TicketListItem[] = [
    new TicketListItem(
      "1",
      "tag1",
      "Sample Ticket 1",
      "This is a sample ticket description 1.",
      new Date(new Date("2023-06-23")),
      "John Doe",
      "john.Doe"
    ),
    new TicketListItem(
      "2",
      "tag3",
      "Sample Ticket 2",
      "This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.This is a sample ticket description 2.",
      new Date("2023-06-23"),
       "Jane Smith", "janesmith@example.com"
    ),
    new TicketListItem(
      "3",
      "tag5",
      "Sample Ticket 3",
      "This is a sample ticket description 3.",
      new Date("2023-06-23"),
      "Mike Johnson", "mikejohnson@example.com"
    )
  ];
  ngOnInit() {
  }
  ngOnDestroy() {
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Call the method to update the div width on window resize
    this.updateDivWidth();
  }

  getWindowWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  updateDivWidth(): void {
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.style.width = this.getWindowWidth()-40 + 'px';
    }
  }

  protected readonly tick = tick;
}
