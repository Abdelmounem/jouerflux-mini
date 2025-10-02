import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueDetail } from './politique-detail';

describe('PolitiqueDetail', () => {
  let component: PolitiqueDetail;
  let fixture: ComponentFixture<PolitiqueDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolitiqueDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiqueDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
