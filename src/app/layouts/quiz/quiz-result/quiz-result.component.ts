import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { QuizFacade } from 'src/app/state/quiz/quiz.facade';
import { QuizResult } from 'src/app/models/quiz.model';

import { Observable, concatMap, interval, map, scan, take } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { Router } from '@angular/router';

interface ComponentState {
  spinnerValue: number;
}

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class QuizResultComponent {
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';

  spinnerValue$: Observable<number>;

  quizResult$: Observable<QuizResult | null>;

  constructor(
    private readonly _quizFacade: QuizFacade,
    private readonly _router: Router,
    @Self() private readonly _state: RxState<ComponentState>
  ) {
    this.quizResult$ = this._quizFacade.quizResult$;
    this.spinnerValue$ = this._state.select('spinnerValue');

    this._state.connect(
      'spinnerValue',
      this.quizResult$.pipe(
        map((result) => Math.round(result?.average || 0)),
        concatMap((average) =>
          interval(10).pipe(
            take(average),
            scan((count) => count + 1, 0)
          )
        )
      )
    );
  }

  redirectToHome() {
    this._router.navigate(['/']);
  }
}
