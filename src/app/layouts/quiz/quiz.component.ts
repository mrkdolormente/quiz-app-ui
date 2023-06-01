import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { QuizFacade } from '../../state/quiz/quiz.facade';

import * as QuizActions from './../../state/quiz/quiz.actions';
import { Answer, Question } from '../../models/quiz.model';
import { Observable, filter, map, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/effects';
import { Router } from '@angular/router';
import { RxEffects } from '@rx-angular/state/effects';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects],
})
export class QuizComponent {
  activeQuestion$: Observable<Question>;
  currentCount$: Observable<number>;
  questionsCount$: Observable<number>;

  answersList: { [key: number]: number } = {};

  constructor(
    private readonly _quizFacade: QuizFacade,
    private readonly _router: Router,
    @Self() private readonly _effects: RxEffects
  ) {
    this.activeQuestion$ = this._quizFacade.activeQuestion;
    this.questionsCount$ = this._quizFacade.questionsCount$;
    this.currentCount$ = this._quizFacade.activeQuestionIndex$.pipe(
      map((index) => index + 1)
    );

    this._effects.register(
      this._quizFacade.activeQuestionIndex$.pipe(
        concatLatestFrom(() => this.questionsCount$),
        filter(
          ([currentCount, totalItem]) =>
            currentCount === totalItem && totalItem != 0
        ),
        tap(() => {
          this._quizFacade.dispatch(
            QuizActions.submitQuizAnswers({
              answers: this.answersList,
            })
          );
          this._router.navigate(['/quiz/result']);
        })
      )
    );

    this._quizFacade.dispatch(QuizActions.clearQuizData());
  }

  updateAnswersList(answer: Answer) {
    this.answersList[answer.questionKey] = answer.key;

    this._quizFacade.dispatch(QuizActions.incrementQuestionIndex());
  }
}
