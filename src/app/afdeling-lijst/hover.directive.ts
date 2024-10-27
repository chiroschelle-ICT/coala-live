import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() appHover: boolean = false;
  

  @HostListener('mouseenter') onMouseEnter() {
    if(!this.appHover) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#FFA500'); // Change the background color
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px'); // Change the font size
    } else{
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#44b7cf');
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px'); 
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    this.renderer.removeStyle(this.el.nativeElement, 'font-size');
  }

}
