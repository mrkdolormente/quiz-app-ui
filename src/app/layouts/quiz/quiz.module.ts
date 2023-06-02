import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { RandomSortPipe } from 'src/app/pipes/random-sort.pipe';
import { RecommendationCardComponent } from './components/recommendation-card/recommendation-card.component';

@NgModule({
  declarations: [
    QuizComponent,
    QuestionCardComponent,
    QuizResultComponent,
    RecommendationCardComponent,
    NumberToAlphabetPipe,
    RandomSortPipe,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    StoreModule.forFeature(quizFeature),
    EffectsModule.forFeature([QuizEffects]),
  ],
})
export class QuizModule {}
