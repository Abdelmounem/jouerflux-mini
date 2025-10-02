import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { State } from './roles.reducer';

export const selectRolesState = createFeatureSelector<AppState, State>('roles');

export const selectRoles        = createSelector(selectRolesState, s => s.items);
export const selectRolesLoading = createSelector(selectRolesState, s => s.loading);
export const selectRolesError   = createSelector(selectRolesState, s => s.error);

export const selectRolesPage     = createSelector(selectRolesState, s => s.page);
export const selectRolesPageSize = createSelector(selectRolesState, s => s.pageSize);
export const selectRolesTotal    = createSelector(selectRolesState, s => s.total);

export const selectSelectedRole  = createSelector(selectRolesState, s => s.selected);
