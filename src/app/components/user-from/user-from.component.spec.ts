import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-from.component';
import { UserService } from '../../services/user-service.service';
import { By } from '@angular/platform-browser';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: UserService;

  beforeEach(async () => {
    const userServiceMock = {
      addWorkout: jasmine.createSpy('addWorkout')
    };

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call addWorkout if form is incomplete', () => {
    component.name = 'John Doe';
    component.workoutType = '';
    component.minutes = 30;

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(userService.addWorkout).not.toHaveBeenCalled();
  });

  it('should call addWorkout with correct values if form is complete', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 30;

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(userService.addWorkout).toHaveBeenCalledWith('John Doe', 'Running', 30);
  });

  it('should reset form fields after successful submission', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 30;

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.name).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });
});
