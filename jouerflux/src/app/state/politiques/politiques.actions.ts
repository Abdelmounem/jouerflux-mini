import { createActionGroup, props } from '@ngrx/store';

export interface Politique {
  id: number;
  name: string;
  firewall_id: number;
}

export const PolitiquesActions = createActionGroup({
  source: 'Politiques',
  events: {
    'Load': props<{ query?: string; page?: number; pageSize?: number }>(),
    'Load Success': props<{ items: Politique[]; total: number; page: number; pageSize: number }>(),
    'Load Failure': props<{ error: string }>(),

    'Get': props<{ id: number }>(),
    'Get Success': props<{ item: Politique }>(),
    'Get Failure': props<{ error: string }>(),

    'Create': props<{ dto: Partial<Politique> }>(),
    'Create Success': props<{ item: Politique }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ id: number; dto: Partial<Politique> }>(),
    'Update Success': props<{ item: Politique }>(),
    'Update Failure': props<{ error: string }>(),

    'Remove': props<{ id: number }>(),
    'Remove Success': props<{ id: number }>(),
    'Remove Failure': props<{ error: string }>(),
  }
});
