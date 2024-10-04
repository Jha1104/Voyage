import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoginSignupComponent } from './app-login-signup.component';

describe('AppLoginSignupComponent', () => {
  let component: AppLoginSignupComponent;
  let fixture: ComponentFixture<AppLoginSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLoginSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
