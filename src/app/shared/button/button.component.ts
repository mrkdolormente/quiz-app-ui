import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() isDisabled: boolean = false;
  @Input() text: string = '';

  @Output() clickEvent = new EventEmitter();
  constructor() {}

  triggerAction() {
    this.clickEvent.emit();
  }
}
