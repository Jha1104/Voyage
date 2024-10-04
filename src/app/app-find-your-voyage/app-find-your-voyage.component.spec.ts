import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFindYourVoyageComponent } from './app-find-your-voyage.component';

describe('AppFindYourVoyageComponent', () => {
  let component: AppFindYourVoyageComponent;
  let fixture: ComponentFixture<AppFindYourVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFindYourVoyageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFindYourVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
