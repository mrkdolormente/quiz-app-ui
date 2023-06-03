import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Self,
  ViewChild,
} from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { QuizFacade } from 'src/app/state/quiz/quiz.facade';
import { QuizResult } from 'src/app/models/quiz.model';

import { Observable, interval } from 'rxjs';
import {
  concatMap,
  map,
  scan,
  take,
  tap,
  debounceTime,
  startWith,
  filter,
} from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { Router } from '@angular/router';
import { Recommendation } from 'src/app/models/recommendation.model';
import { RxActionFactory } from '@rx-angular/state/actions';
import { RxEffects } from '@rx-angular/state/effects';

interface ComponentState {
  spinnerValue: number;
  selectedRecommendation: Recommendation;
}

interface ComponentCommands {
  selectRecommendation: Recommendation;
}

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxActionFactory, RxEffects, RxState],
})
export class QuizResultComponent {
  @ViewChild('anchorEl')
  private readonly _anchorEl: ElementRef = new ElementRef(null);

  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';

  quizResult$: Observable<QuizResult | null>;
  selectedRecommendation$: Observable<Recommendation>;
  spinnerValue$: Observable<number>;

  private readonly _commands = this._actionFactory.create();

  constructor(
    private readonly _quizFacade: QuizFacade,
    private readonly _router: Router,
    @Self() private readonly _actionFactory: RxActionFactory<ComponentCommands>,
    @Self() private readonly _effects: RxEffects,
    @Self() private readonly _state: RxState<ComponentState>
  ) {
    this.quizResult$ = this._quizFacade.quizResult$;
    this.selectedRecommendation$ = this._state.select('selectedRecommendation');
    this.spinnerValue$ = this._state.select('spinnerValue');

    this._state.connect(
      'spinnerValue',
      this.quizResult$.pipe(
        map((result) => Math.round(result?.percentage || 0)),
        concatMap((percentage) =>
          interval(10).pipe(
            take(percentage),
            scan((count) => count + 1, 0)
          )
        )
      )
    );

    this._effects.register(
      this._commands.selectRecommendation$.pipe(
        tap((recommendation) => {
          this._state.set({
            selectedRecommendation: recommendation,
          });
        }),
        debounceTime(100),
        tap(() => {
          // scroll to answer tag if element is visible
          if (this._anchorEl !== null) {
            const scrollPosition = this._anchorEl.nativeElement.offsetTop - 110;

            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth',
            });
          }
        })
      )
    );
  }

  redirectToHome() {
    this._router.navigate(['/']);
  }

  selectRecommendation(recommendation: Recommendation) {
    this._commands.selectRecommendation(recommendation);
  }
}
