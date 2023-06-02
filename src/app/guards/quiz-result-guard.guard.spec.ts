import { TestBed } from '@angular/core/testing';

import { QuizResultGuardGuard } from './quiz-result-guard.guard';

describe('QuizResultGuardGuard', () => {
  let guard: QuizResultGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuizResultGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
