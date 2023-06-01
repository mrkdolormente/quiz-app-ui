import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuestionCardComponent } from './components/question-card/question-card.component';

@NgModule({
  declarations: [QuizComponent, QuestionCardComponent],
  imports: [CommonModule, QuizRoutingModule, SharedModule],
})
export class QuizModule {}
