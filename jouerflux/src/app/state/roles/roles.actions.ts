import { createActionGroup, props } from '@ngrx/store';

export interface Role {
  id: number;
  name: string;
  policy_id: number;
}

export const RolesActions = createActionGroup({
  source: 'Roles',
  events: {
    'Load': props<{ query?: string; page?: number; pageSize?: number }>(),
    'Load Success': props<{ items: Role[]; total: number; page: number; pageSize: number }>(),
    'Load Failure': props<{ error: string }>(),

    'Get': props<{ id: number }>(),
    'Get Success': props<{ item: Role }>(),
    'Get Failure': props<{ error: string }>(),

    'Create': props<{ dto: Partial<Role> }>(),
    'Create Success': props<{ item: Role }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ id: number; dto: Partial<Role> }>(),
    'Update Success': props<{ item: Role }>(),
    'Update Failure': props<{ error: string }>(),

    'Remove': props<{ id: number }>(),
    'Remove Success': props<{ id: number }>(),
    'Remove Failure': props<{ error: string }>(),
  }
});
