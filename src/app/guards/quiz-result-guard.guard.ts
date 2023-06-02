import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs';
import { QuizFacade } from '../state/quiz/quiz.facade';

@Injectable({
  providedIn: 'root',
})
export class QuizResultGuardGuard implements CanActivate {
  constructor(
    private readonly _quizFacade: QuizFacade,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._quizFacade.quizResult$.pipe(
      take(1),
      map((result) => {
        if (result) {
          return true;
        } else {
          this._router.navigate(['']);
          return false;
        }
      })
    );
  }
}
