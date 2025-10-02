import { createReducer, on } from '@ngrx/store';
import { PolitiquesActions, Politique } from './politiques.actions';

export interface State {
  items: Politique[];
  selected?: Politique | null;
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

  on(PolitiquesActions.load, (s, { page, pageSize }) => ({
    ...s,
    loading: true,
    error: null,
    page: page ?? s.page,
    pageSize: pageSize ?? s.pageSize
  })),

  on(PolitiquesActions.loadSuccess, (s, { items, total, page, pageSize }) => ({
    ...s,
    items,
    total,
    page,
    pageSize,
    loading: false
  })),

  on(PolitiquesActions.loadFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(PolitiquesActions.get,  s => ({ ...s, loading: true, error: null })),
  on(PolitiquesActions.getSuccess, (s, { item }) => ({ ...s, loading: false, selected: item })),
  on(PolitiquesActions.getFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(PolitiquesActions.createSuccess, (s, { item }) => ({ ...s, items: [...s.items, item] })),
  on(PolitiquesActions.updateSuccess, (s, { item }) => ({
    ...s,
    selected: item,
    items: s.items.map(i => i.id === item.id ? item : i)
  })),
  on(PolitiquesActions.removeSuccess, (s, { id }) => ({
    ...s,
    items: s.items.filter(i => i.id !== id),
    selected: s.selected?.id === id ? null : s.selected
  }))
);
