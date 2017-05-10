import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[layout-website-directive-selector]',
})
export class LayoutWebsiteDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}



