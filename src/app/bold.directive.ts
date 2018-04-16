import {Directive} from "@angular/core";
import {ElementRef} from "@angular/core";

@Directive ({
    selector: '[bold]'
})

export class BoldDirective {
    constructor(private elementRef: ElementRef){
        this.elementRef.nativeElement.style.fontWeight="bold";
    }
}