import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {ActiveLinkService} from "../../active-link/active-link.service";

@Directive({
  selector: '[appSetActive]'
})
export class SetActiveDirective {
  @Input() appSetKey: string = '';

  constructor(private el: ElementRef, private activeLinkService: ActiveLinkService) {}

  @HostListener('click') onClick() {

    setTimeout(() => {
      this.activeLinkService.setActiveState(this.appSetKey, true);
    },0);
  }


}
