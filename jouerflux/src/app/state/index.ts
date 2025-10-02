import { ActionReducerMap } from '@ngrx/store';
import * as fromFirewalls from './firewalls/firewalls.reducer';
import * as fromPolitiques from './politiques/politiques.reducer';
import * as fromRoles from './roles/roles.reducer';
import { FirewallsEffects } from './firewalls/firewalls.effects';
import { PolitiquesEffects } from './politiques/politiques.effects';
import { RolesEffects } from './roles/roles.effects';


export interface AppState {
firewalls: fromFirewalls.State;
politiques: fromPolitiques.State;
roles: fromRoles.State;
}


export const appReducers: ActionReducerMap<AppState> = {
firewalls: fromFirewalls.reducer,
politiques: fromPolitiques.reducer,
roles: fromRoles.reducer
};


export const appEffects = [FirewallsEffects, PolitiquesEffects, RolesEffects];