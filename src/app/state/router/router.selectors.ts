import {
  DEFAULT_ROUTER_FEATURENAME,
  getSelectors,
  RouterReducerState,
} from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>(
  DEFAULT_ROUTER_FEATURENAME
);

export const { selectUrl } = getSelectors(selectRouter);
