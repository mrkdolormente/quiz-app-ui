import { TestBed } from '@angular/core/testing';
import { QuizResultGuard } from './quiz-result-guard.guard';
import { QuizFacade } from '../state/quiz/quiz.facade';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { of, Observable } from 'rxjs';
import { QuizResult } from '../models/quiz.model';

describe('QuizResultGuard', () => {
  let guard: QuizResultGuard;
  let quizFacade: QuizFacade;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuizResultGuard,
        {
          provide: QuizFacade,
          useValue: {
            quizResult$: of({
              correctAnswers: 10,
              wrongAnswers: 0,
              average: 100,
              recommendations: [],
              totalItems: 10,
            }),
          },
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });

    guard = TestBed.inject(QuizResultGuard);
    quizFacade = TestBed.inject(QuizFacade);
    router = TestBed.inject(Router);
  });

  it('should allow access when quiz result is available', () => {
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    (
      guard.canActivate(mockRoute, mockState) as Observable<boolean | UrlTree>
    ).subscribe((result) => {
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should redirect to home when quiz result is not available', () => {
    (quizFacade.quizResult$ as Observable<QuizResult | null>) = of(null);

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    (
      guard.canActivate(mockRoute, mockState) as Observable<boolean | UrlTree>
    ).subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
