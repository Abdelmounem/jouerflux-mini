import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueList } from './politique-list';

describe('PolitiqueList', () => {
  let component: PolitiqueList;
  let fixture: ComponentFixture<PolitiqueList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolitiqueList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiqueList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
