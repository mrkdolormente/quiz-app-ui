import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectUrl } from './router.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  readonly url$ = this._store.select(selectUrl);

  constructor(private readonly _store: Store) {}
}
