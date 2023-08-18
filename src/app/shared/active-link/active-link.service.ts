import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActiveLinkService {

  private activeLinks: { [key: string]: BehaviorSubject<boolean> } = {};

  constructor() { }

  setActiveState(key: string, isActive: boolean) {
    if (!this.activeLinks[key]) {
      this.activeLinks[key] = new BehaviorSubject<boolean>(isActive);
    } else {
      this.activeLinks[key].next(isActive);
    }
  }

  getActiveState(key: string) {
    return this.activeLinks[key]?.asObservable();
  }


}
