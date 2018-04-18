import {Directive, HostListener, Renderer2} from "@angular/core";
import {ElementRef} from "@angular/core";

@Directive ({
    selector: '[bold]'
})

export class BoldDirective {
    constructor(private elementRef: ElementRef, private renderer: Renderer2){
        this.renderer.setStyle(this.elementRef.nativeElement, "cursor", "pointer");
    }

    @HostListener("mouseenter") onMouseEnter() {
        this.setFontWeight("bold");
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.setFontWeight("normal");
    }

    private setFontWeight(val:string){
        this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", val)
    }
}