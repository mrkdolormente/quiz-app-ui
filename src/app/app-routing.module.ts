import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'quiz',
    loadChildren: () => import('./layouts/quiz/quiz.module').then((m) => m.QuizModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
