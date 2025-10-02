import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { State } from './politiques.reducer';

export const selectPolitiquesState = createFeatureSelector<AppState, State>('politiques');

export const selectPolitiques       = createSelector(selectPolitiquesState, s => s.items);
export const selectPolitiquesLoading= createSelector(selectPolitiquesState, s => s.loading);
export const selectPolitiquesError  = createSelector(selectPolitiquesState, s => s.error);

export const selectPolitiquesPage     = createSelector(selectPolitiquesState, s => s.page);
export const selectPolitiquesPageSize = createSelector(selectPolitiquesState, s => s.pageSize);
export const selectPolitiquesTotal    = createSelector(selectPolitiquesState, s => s.total);
export const selectSelectedPolitique  = createSelector(selectPolitiquesState, s => s.selected);
