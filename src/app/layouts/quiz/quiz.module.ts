import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { QuizComponent } from './quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { StoreModule } from '@ngrx/store';
import { quizFeature } from '../../state/quiz/quiz.feature';
import { EffectsModule } from '@ngrx/effects';
import { QuizEffects } from '../../state/quiz/quiz.effects';
import { NumberToAlphabetPipe } from '../../pipes/number-to-alphabet.pipe';

@NgModule({
  declarations: [
    QuizComponent,
    QuestionCardComponent,
    QuizResultComponent,
    NumberToAlphabetPipe,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(quizFeature),
    EffectsModule.forFeature([QuizEffects]),
  ],
})
export class QuizModule {}