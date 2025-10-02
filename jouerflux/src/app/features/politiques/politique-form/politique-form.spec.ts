import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueForm } from './politique-form';

describe('PolitiqueForm', () => {
  let component: PolitiqueForm;
  let fixture: ComponentFixture<PolitiqueForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolitiqueForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiqueForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
