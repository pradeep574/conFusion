import { Directive,HostListener,Renderer2,ElementRef } from '@angular/core';

@Directive({
  selector: '[appPop]'
})
export class PopDirective {

  constructor(private ele:ElementRef,private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.renderer.addClass(this.ele.nativeElement,'pop');
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.removeClass(this.ele.nativeElement,'pop');
  }
}
