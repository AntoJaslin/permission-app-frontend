import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[appChangeBackground]',
})

export class ChangeBackgroundDirective implements AfterViewInit {
  @Input('searchData') searchData: string;

  constructor(private elementRef: ElementRef, private render2: Renderer2,private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    // get search text value add new tag to highlight the text
    const element: HTMLElement = this.elementRef.nativeElement;
    const text = element.textContent;
    if (text.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase())) {
      const escapedSearchData = this.escapeRegExp(this.searchData.toLowerCase());
      const pattern = new RegExp(escapedSearchData, 'gi');
      const wrappedText = text.replace(pattern, (match: string) => {
        const spanElement = this.render2.createElement('span');
        this.render2.setStyle(spanElement, 'background-color', '#b5b5b5');
        this.render2.appendChild(spanElement, this.render2.createText(match));
        return spanElement.outerHTML;
      });
      this.render2.setProperty(element, 'innerHTML', wrappedText);
    }
  };

  private escapeRegExp(input: string): string {
    // Escape any special characters in the search string to be used in a regular expression.
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
