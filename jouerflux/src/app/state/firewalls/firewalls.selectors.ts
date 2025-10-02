import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { State } from './firewalls.reducer';

export const selectFirewallsState = createFeatureSelector<AppState, State>('firewalls');

export const selectFirewalls   = createSelector(selectFirewallsState, s => s.items);
export const selectSelectedFirewall = createSelector(selectFirewallsState, s => s.selected);
export const selectFwLoading   = createSelector(selectFirewallsState, s => s.loading);
export const selectFwError     = createSelector(selectFirewallsState, s => s.error);

export const selectFwPage      = createSelector(selectFirewallsState, s => s.page);
export const selectFwPageSize  = createSelector(selectFirewallsState, s => s.pageSize);
export const selectFwTotal     = createSelector(selectFirewallsState, s => s.total);
export const selectFwQuery     = createSelector(selectFirewallsState, s => s.query);
