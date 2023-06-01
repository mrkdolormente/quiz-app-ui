import { Injectable } from '@angular/core';
import {
  Actions,
  EffectNotification,
  OnInitEffects,
  OnRunEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';

import * as QuizActions from './quiz.actions';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, filter, takeUntil, catchError } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz.service';
import { Action } from '@ngrx/store';
import { RouterFacade } from '../router/router.facade';

@Injectable()
export class QuizEffects implements OnInitEffects, OnRunEffects {
  readonly clearQuizDataEffect$ = createEffect(() => {
    return this._action$.pipe(
      ofType(QuizActions.clearQuizData),
      map(() => QuizActions.fetchQuestionList())
    );
  });

  readonly fetchQuestionListEffect$ = createEffect(() => {
    return this._action$.pipe(
      ofType(QuizActions.fetchQuestionList),
      exhaustMap(() =>
        this._quizService.getQuestions().pipe(
          map((questions) =>
            QuizActions.fetchQuestionListSuccess({
              questions,
            })
          ),
          catchError((error) =>
            of(
              QuizActions.fetchQuestionListFailed({
                error,
              })
            )
          )
        )
      )
    );
  });

  readonly submitQuizAnswersEffect$ = createEffect(() => {
    return this._action$.pipe(
      ofType(QuizActions.submitQuizAnswers),
      exhaustMap(({ answers }) =>
        this._quizService.submitQuizAnwers(answers).pipe(
          map((result) =>
            QuizActions.submitQuizAnswersSuccess({
              result,
            })
          ),
          catchError((error) =>
            of(
              QuizActions.submitQuizAnswersFailed({
                error,
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private readonly _action$: Actions,
    private readonly _quizService: QuizService,
    private readonly _routerFacade: RouterFacade
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: '[Quiz] Init QuizEffects' };
  }

  ngrxOnRunEffects(resolvedEffect$: Observable<EffectNotification>) {
    const path = '/quiz';
    const url$ = this._routerFacade.url$;

    return url$.pipe(
      filter((url) => url?.startsWith(path)),
      exhaustMap(() =>
        resolvedEffect$.pipe(
          takeUntil(url$.pipe(filter((url) => !url?.startsWith(path))))
        )
      )
    );
  }
}
