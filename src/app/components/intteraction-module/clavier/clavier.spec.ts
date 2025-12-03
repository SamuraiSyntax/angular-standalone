import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clavier } from './clavier';

describe('Clavier', () => {
  let component: Clavier;
  let fixture: ComponentFixture<Clavier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clavier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clavier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
