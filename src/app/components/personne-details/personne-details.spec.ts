import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneDetails } from './personne-details';

describe('PersonneDetails', () => {
  let component: PersonneDetails;
  let fixture: ComponentFixture<PersonneDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonneDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonneDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
