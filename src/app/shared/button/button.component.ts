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
  @Input() icon: string = 'arrow_forward';
  @Input() isDisabled: boolean = false;
  @Input() text: string = '';
  @Input() withAnimation: boolean = true;

  @Output() clickEvent = new EventEmitter();
  constructor() {}

  triggerAction() {
    this.clickEvent.emit();
  }
}
