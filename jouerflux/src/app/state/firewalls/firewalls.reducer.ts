import { createReducer, on } from '@ngrx/store';
import { FirewallsActions } from './firewalls.actions';
import { Firewall } from '../../core/models/firewall.model';

export interface State {
  items: Firewall[];
  selected?: Firewall | null;
  loading: boolean;
  error?: string | null;

  page: number;
  pageSize: number;
  total: number;
  query?: string | null;
}

const initialState: State = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  query: null
};

export const reducer = createReducer(
  initialState,

  on(FirewallsActions.load, (s, { page, pageSize, query }) => ({
    ...s,
    loading: true,
    error: null,
    page: page ?? s.page,
    pageSize: pageSize ?? s.pageSize,
    query: query ?? s.query ?? null
  })),

  on(FirewallsActions.loadSuccess, (s, { items, total, page, pageSize }) => ({
    ...s,
    items,
    total,
    page,
    pageSize,
    loading: false
  })),

  on(FirewallsActions.loadFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(FirewallsActions.get, (s) => ({ ...s, loading: true, error: null })),
  on(FirewallsActions.getSuccess, (s, { item }) => ({ ...s, loading: false, selected: item })),
  on(FirewallsActions.getFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(FirewallsActions.createSuccess, (s, { item }) => ({ ...s, items: [...s.items, item] })),
  on(FirewallsActions.updateSuccess, (s, { item }) => ({
    ...s, selected: item, items: s.items.map(i => i.id === item.id ? item : i)
  })),
  on(FirewallsActions.removeSuccess, (s, { id }) => ({
    ...s,
    items: s.items.filter(i => i.id !== id),
    selected: s.selected?.id === id ? null : s.selected
  }))
);
