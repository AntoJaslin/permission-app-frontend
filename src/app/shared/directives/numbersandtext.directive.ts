import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersAndTextOnly]'
})
export class NumbersandtextDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const regex = /^[a-zA-Z0-9 ]*$/; // Regular expression to match alphanumeric characters

    const value = input.value;
    if (!regex.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove non-alphanumeric characters
    }
  }

}
