import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { QuizComponent } from './quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

@NgModule({
  declarations: [QuizComponent, QuestionCardComponent, QuizResultComponent],
  imports: [CommonModule, QuizRoutingModule, SharedModule, MatIconModule, MatProgressSpinnerModule],
})
export class QuizModule {}
