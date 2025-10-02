import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autofocus } from './autofocus';

describe('Autofocus', () => {
  let component: Autofocus;
  let fixture: ComponentFixture<Autofocus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autofocus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Autofocus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
