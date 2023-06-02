import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Answer, Question } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  host: {
    class: 'question-card',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCardComponent {
  @Input() question: Question | null = null;
  @Input() totalItem: number | null = 0;
  @Input() currentCount: number | null = 0;

  @Output() updateAnswersListEvent = new EventEmitter<Answer>();

  answerKey: number = 0;

  constructor() {}

  selectAnswer(answer: number) {
    this.answerKey = answer;
  }

  updateAnswersList() {
    if (this.answerKey !== 0) {
      this.updateAnswersListEvent.emit({
        key: this.answerKey,
        questionKey: this.question?.key ?? 0,
      });

      this.answerKey = 0;
    }
  }
}
