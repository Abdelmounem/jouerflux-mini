import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { FirewallDetailComponent } from './firewall-detail';
import { reducer as firewallsReducer } from '../../../state/firewalls/firewalls.reducer';

describe('FirewallDetailComponent', () => {
  let component: FirewallDetailComponent;
  let fixture: ComponentFixture<FirewallDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirewallDetailComponent],
      providers: [
        provideStore({ firewalls: firewallsReducer }),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FirewallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
