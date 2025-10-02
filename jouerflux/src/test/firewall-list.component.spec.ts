import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { FirewallListComponent } from '../app/features/firewalls/firewall-list/firewall-list';
import { reducer as firewallsReducer } from '../app/state/firewalls/firewalls.reducer';
import { provideRouter } from '@angular/router';


describe('FirewallListComponent', () => {
beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [FirewallListComponent],
providers: [
provideStore({ firewalls: firewallsReducer }),
provideRouter([])
]
}).compileComponents();
});


it('should create', () => {
const fixture = TestBed.createComponent(FirewallListComponent);
expect(fixture.componentInstance).toBeTruthy();
});
});