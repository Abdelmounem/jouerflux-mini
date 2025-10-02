import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { FirewallFormComponent } from './firewall-form';
import { reducer as firewallsReducer } from '../../../state/firewalls/firewalls.reducer';

describe('FirewallFormComponent', () => {
  let component: FirewallFormComponent;
  let fixture: ComponentFixture<FirewallFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirewallFormComponent],
      providers: [
        provideStore({ firewalls: firewallsReducer }),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FirewallFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
