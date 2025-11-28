import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculette } from './calculette';

describe('Calculette', () => {
  let component: Calculette;
  let fixture: ComponentFixture<Calculette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calculette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
