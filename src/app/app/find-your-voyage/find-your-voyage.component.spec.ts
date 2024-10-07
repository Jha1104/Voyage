import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindYourVoyageComponent } from './find-your-voyage.component';

describe('FindYourVoyageComponent', () => {
  let component: FindYourVoyageComponent;
  let fixture: ComponentFixture<FindYourVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindYourVoyageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindYourVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
