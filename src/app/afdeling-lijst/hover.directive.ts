import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() appHover: boolean = false;
  

  @HostListener('mouseenter') onMouseEnter() {
    if(!this.appHover) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#FFA500'); 
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px'); 
    } else{
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#edd766');
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px'); 
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if(!this.appHover) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#edd766'); 
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px');
    } else{
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#FFA500');
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px'); 
    }
  }

}
