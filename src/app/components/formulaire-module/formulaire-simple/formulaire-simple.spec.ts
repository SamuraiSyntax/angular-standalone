import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSimple } from './formulaire-simple';

describe('FormulaireSimple', () => {
  let component: FormulaireSimple;
  let fixture: ComponentFixture<FormulaireSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSimple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSimple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
