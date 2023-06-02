import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Self,
  ViewChild,
} from '@angular/core';
import { QuizFacade } from '../../state/quiz/quiz.facade';

import * as QuizActions from './../../state/quiz/quiz.actions';
import { Answer, Question } from '../../models/quiz.model';
import { Observable } from 'rxjs';
import { filter, map, tap, debounceTime } from 'rxjs/operators';
import { concatLatestFrom } from '@ngrx/effects';
import { Router } from '@angular/router';
import { RxEffects } from '@rx-angular/state/effects';
import { RxActionFactory } from '@rx-angular/state/actions';

interface ComponentCommands {
  updateAnswerList: Answer;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects, RxActionFactory],
})
export class QuizComponent {
  @ViewChild('anchorEl')
  private readonly _anchorEl: ElementRef = new ElementRef(null);

  activeQuestion$: Observable<Question>;
  currentCount$: Observable<number>;
  questionsCount$: Observable<number>;

  answersList: { [key: number]: number } = {};

  private readonly _commands = this._actionFactory.create();

  constructor(
    private readonly _quizFacade: QuizFacade,
    private readonly _router: Router,
    @Self() private readonly _actionFactory: RxActionFactory<ComponentCommands>,
    @Self() private readonly _effects: RxEffects
  ) {
    this.activeQuestion$ = this._quizFacade.activeQuestion$;
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

    this._effects.register(
      this._commands.updateAnswerList$.pipe(
        tap((answer) => {
          this.answersList[answer.questionKey] = answer.key;

          this._quizFacade.dispatch(QuizActions.incrementQuestionIndex());
        }),
        debounceTime(150),
        tap(() => {
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

    this._quizFacade.dispatch(QuizActions.clearQuizData());
  }

  updateAnswersList(answer: Answer) {
    this._commands.updateAnswerList(answer);
  }
}
