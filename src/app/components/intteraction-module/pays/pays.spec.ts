import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pays } from './pays';

describe('Pays', () => {
  let component: Pays;
  let fixture: ComponentFixture<Pays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pays);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
