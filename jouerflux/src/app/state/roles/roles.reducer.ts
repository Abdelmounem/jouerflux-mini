import { createReducer, on } from '@ngrx/store';
import { RolesActions, Role } from './roles.actions';

export interface State {
  items: Role[];
  selected?: Role | null;
  loading: boolean;
  error?: string | null;

  page: number;
  pageSize: number;
  total: number;
}

const initialState: State = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0
};

export const reducer = createReducer(
  initialState,

  on(RolesActions.load, (s, { page, pageSize }) => ({
    ...s,
    loading: true,
    error: null,
    page: page ?? s.page,
    pageSize: pageSize ?? s.pageSize
  })),

  on(RolesActions.loadSuccess, (s, { items, total, page, pageSize }) => ({
    ...s,
    items, total, page, pageSize,
    loading: false
  })),

  on(RolesActions.loadFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(RolesActions.get, s => ({ ...s, loading: true, error: null })),
  on(RolesActions.getSuccess, (s, { item }) => ({ ...s, loading: false, selected: item })),
  on(RolesActions.getFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(RolesActions.createSuccess, (s, { item }) => ({ ...s, items: [...s.items, item] })),
  on(RolesActions.updateSuccess, (s, { item }) => ({
    ...s,
    selected: item,
    items: s.items.map(i => i.id === item.id ? item : i)
  })),
  on(RolesActions.removeSuccess, (s, { id }) => ({
    ...s,
    items: s.items.filter(i => i.id !== id),
    selected: s.selected?.id === id ? null : s.selected
  }))
);
