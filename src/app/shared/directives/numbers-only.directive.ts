import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow decimal and number keys, as well as control keys like backspace and delete
    if (event.key === '.' || event.key === ',' || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Tab') {
      return;
    }

    // Prevent anything other than decimal and number keys
    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  };

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData.getData('text/plain');
    if (!this.regex.test(pastedData)) {
      event.preventDefault();
    }
  };

  // prevent anything other than decimak and numbers keys

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement.value;
    this.el.nativeElement.value = input.replace(/[^0-9.]/g, '');
    if (!this.regex.test(this.el.nativeElement.value)) {
      event.preventDefault();
    }
  };

  // not allowed empty string

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const value = this.el.nativeElement.value;
    if (value !== '' && !isNaN(value)) {
      const formattedValue = parseFloat(value).toFixed(2);
      this.el.nativeElement.value = formattedValue;
    }
  };

}
