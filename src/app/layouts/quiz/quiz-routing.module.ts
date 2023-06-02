import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizResultGuardGuard } from '../../guards/quiz-result-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
    canActivate: [QuizResultGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
