import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
