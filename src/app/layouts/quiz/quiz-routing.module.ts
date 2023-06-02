import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizResultGuard } from '../../guards/quiz-result-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
    canActivate: [QuizResultGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
