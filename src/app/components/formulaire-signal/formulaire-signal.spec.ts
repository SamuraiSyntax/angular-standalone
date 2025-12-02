import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSignal } from './formulaire-signal';

describe('FormulaireSignal', () => {
  let component: FormulaireSignal;
  let fixture: ComponentFixture<FormulaireSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
