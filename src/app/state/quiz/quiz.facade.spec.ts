import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { QuizFacade } from './quiz.facade';
import * as QuizActions from './quiz.actions';

describe('QuizFacade', () => {
  let facade: QuizFacade;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [QuizFacade],
    });

    facade = TestBed.inject(QuizFacade);
    store = TestBed.inject(Store);
  });

  it('should dispatch actions through the store', () => {
    spyOn(store, 'dispatch');

    const action = QuizActions.clearQuizData();

    facade.dispatch(action);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
