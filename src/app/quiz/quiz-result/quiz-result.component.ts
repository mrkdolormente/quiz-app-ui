import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { QuizFacade } from 'src/app/state/quiz/quiz.facade';
import { QuizResult } from 'src/app/models/quiz.model';

import { Observable, concatMap, interval, map, take, tap } from 'rxjs';
import { RxEffects } from '@rx-angular/state/effects';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  providers: [RxEffects],
})
export class QuizResultComponent implements OnInit {
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';
  spinnerValue: number = 0;

  quizResult$: Observable<QuizResult | null>;

  constructor(
    private readonly _quizFacade: QuizFacade,
    private readonly _effects: RxEffects
  ) {
    this.quizResult$ = this._quizFacade.quizResult$;

    this._effects.register(
      this.quizResult$.pipe(
        map((result) => Math.round(result?.average || 0)),
        concatMap((average) =>
          interval(10).pipe(
            take(average),
            tap(() => this.spinnerValue++)
          )
        )
      )
    );
    interval();
  }

  ngOnInit(): void {}
}
