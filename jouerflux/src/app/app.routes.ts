import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FirewallListComponent } from './features/firewalls/firewall-list/firewall-list';
import { FirewallDetailComponent } from './features/firewalls/firewall-detail/firewall-detail';
import { FirewallFormComponent } from './features/firewalls/firewall-form/firewall-form';
import { PolitiqueDetail } from './features/politiques/politique-detail/politique-detail';
import { PolitiqueForm } from './features/politiques/politique-form/politique-form';
import { PolitiqueList } from './features/politiques/politique-list/politique-list';
import { RoleList } from './features/roles/role-list/role-list';
import { RoleDetail } from './features/roles/role-detail/role-detail';
import { RoleForm } from './features/roles/role-form/role-form';


export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'firewalls', component: FirewallListComponent },
{ path: 'firewalls/new', component: FirewallFormComponent },
{ path: 'firewalls/:id', component: FirewallDetailComponent },
{ path: 'firewalls/:id/edit', component: FirewallFormComponent },

{ path: 'policies', component: PolitiqueList },
{ path: 'policies/new', component: PolitiqueForm },
{ path: 'policies/:id', component: PolitiqueDetail },
{ path: 'policies/:id/edit', component: PolitiqueForm },

{ path: 'rules', component: RoleList },
{ path: 'rules/new', component: RoleForm },
{ path: 'rules/:id', component: RoleDetail },
{ path: 'rules/:id/edit', component: RoleForm },

{ path: '**', redirectTo: '' }
];
