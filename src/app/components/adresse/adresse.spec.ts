import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adresse } from './adresse';

describe('Adresse', () => {
  let component: Adresse;
  let fixture: ComponentFixture<Adresse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adresse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adresse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
