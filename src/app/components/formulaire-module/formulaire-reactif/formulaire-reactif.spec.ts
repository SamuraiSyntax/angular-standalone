import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireReactif } from './formulaire-reactif';

describe('FormulaireReactif', () => {
  let component: FormulaireReactif;
  let fixture: ComponentFixture<FormulaireReactif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireReactif]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireReactif);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
