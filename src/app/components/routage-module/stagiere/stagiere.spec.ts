import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stagiere } from './stagiere';

describe('Stagiere', () => {
  let component: Stagiere;
  let fixture: ComponentFixture<Stagiere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stagiere]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stagiere);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
