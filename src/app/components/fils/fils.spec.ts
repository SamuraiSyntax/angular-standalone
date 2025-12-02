import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fils } from './fils';

describe('Fils', () => {
  let component: Fils;
  let fixture: ComponentFixture<Fils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fils]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fils);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
