import { HoverDirective } from './hover.directive';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


describe('HoverDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: {} }; // Mock ElementRef
    const renderer2Mock: Renderer2 = {} as Renderer2; // Mock Renderer2

    const directive = new HoverDirective(elementRefMock, renderer2Mock);
    expect(directive).toBeTruthy();
  });
});
