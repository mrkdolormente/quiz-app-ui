import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  Self,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { Answer, Question } from 'src/app/models/quiz.model';
import { Observable } from 'rxjs';
import { map, exhaustMap, filter, tap, take } from 'rxjs/operators';
import { RxEffects } from '@rx-angular/state/effects';

interface ComponentState {
  answerKey: number;
  currentCount: number;
  progress: number;
}

interface ComponentCommands {
  updateAnswersList: void;
}

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  host: {
    class: 'question-card',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxActionFactory, RxState, RxEffects],
})
export class QuestionCardComponent {
  @Input() question: Question | null = null;
  @Input() totalItem: number | null = 0;
  @Input() set currentCount(currentCount: number | null) {
    this._state.set({
      currentCount: currentCount || 0,
    });
  }

  @Output() updateAnswersListEvent = new EventEmitter<Answer>();

  answerKey$: Observable<number>;
  currentCount$: Observable<number>;
  progress$: Observable<number>;

  private readonly _commands = this._actionFactory.create();

  constructor(
    @Self() private readonly _actionFactory: RxActionFactory<ComponentCommands>,
    @Self() private readonly _effects: RxEffects,
    @Self() private readonly _state: RxState<ComponentState>
  ) {
    this.answerKey$ = this._state.select('answerKey');
    this.currentCount$ = this._state.select('currentCount');
    this.progress$ = this._state.select('progress');

    this._state.set({
      answerKey: 0,
    });

    this._state.connect(
      'progress',
      this.currentCount$.pipe(
        map((count) => ((count - 1) / (this.totalItem ?? 0)) * 100)
      )
    );

    this._effects.register(
      this._commands.updateAnswersList$.pipe(
        exhaustMap(() =>
          this.answerKey$.pipe(
            take(1),
            filter((key) => key !== 0),
            tap((key) => {
              this.updateAnswersListEvent.emit({
                key,
                questionKey: this.question?.key ?? 0,
              });

              this._state.set({
                answerKey: 0,
              });
            })
          )
        )
      )
    );
  }

  selectAnswer(answer: number) {
    this._state.set({
      answerKey: answer,
    });
  }

  updateAnswersList() {
    this._commands.updateAnswersList();
  }
}
