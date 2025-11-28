import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireBuilder } from './formulaire-builder';

describe('FormulaireBuilder', () => {
  let component: FormulaireBuilder;
  let fixture: ComponentFixture<FormulaireBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireBuilder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
