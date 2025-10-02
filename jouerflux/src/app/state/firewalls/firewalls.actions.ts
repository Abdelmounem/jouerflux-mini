import { createActionGroup, props } from '@ngrx/store';

export interface Firewall {
 id: number;
 name: string;
}

export const FirewallsActions = createActionGroup({
  source: 'Firewalls',
  events: {
    'Load': props<{ query?: string; page?: number; pageSize?: number }>(),
    'Load Success': props<{ items: Firewall[]; total: number; page: number; pageSize: number }>(),
    'Load Failure': props<{ error: string }>(),

    'Get': props<{ id: number }>(),
    'Get Success': props<{ item: Firewall }>(),
    'Get Failure': props<{ error: string }>(),

    'Create': props<{ dto: Partial<Firewall> }>(),
    'Create Success': props<{ item: Firewall }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ id: number; dto: Partial<Firewall> }>(),
    'Update Success': props<{ item: Firewall }>(),
    'Update Failure': props<{ error: string }>(),

    'Remove': props<{ id: number }>(),
    'Remove Success': props<{ id: number }>(),
    'Remove Failure': props<{ error: string }>()
  }
});
