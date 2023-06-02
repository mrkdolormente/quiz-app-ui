import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ComponentState {
  isBgActive: boolean;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TopBarComponent {
  isBgActive$: Observable<boolean>;

  constructor(@Self() private readonly _state: RxState<ComponentState>) {
    this.isBgActive$ = this._state.select('isBgActive');

    this._state.connect(
      'isBgActive',
      fromEvent(window, 'scroll').pipe(
        map(() => {
          const win = window as Window;

          return (win.scrollY || 0) !== 0;
        })
      )
    );
  }
}
