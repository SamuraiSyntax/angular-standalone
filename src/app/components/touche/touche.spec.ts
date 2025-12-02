import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Touche } from './touche';

describe('Touche', () => {
  let component: Touche;
  let fixture: ComponentFixture<Touche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Touche]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Touche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
