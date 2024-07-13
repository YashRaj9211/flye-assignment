import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-from.component';
import { UserService } from '../../services/user-service.service';
import { By } from '@angular/platform-browser';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['addWorkout']);

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call addWorkout if form is incomplete - missing workout type', () => {
    component.name = 'John Doe';
    component.workoutType = '';
    component.minutes = 30;

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(userService.addWorkout).not.toHaveBeenCalled();
  });

  it('should not call addWorkout if form is incomplete - minutes are zero', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 0;

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(userService.addWorkout).not.toHaveBeenCalled();
  });

  it('should not call addWorkout if form is incomplete - name is empty', () => {
    component.name = '';
    component.workoutType = 'Running';
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

  it('should not call addWorkout and log error if form is invalid', () => {
    spyOn(console, 'error');

    component.name = '';
    component.workoutType = 'Running';
    component.minutes = 30;

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(userService.addWorkout).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Form is invalid');
  });

  it('should disable submit button if form is invalid', () => {
    component.name = '';
    component.workoutType = 'Running';
    component.minutes = 30;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should enable submit button if form is valid', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 30;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeFalsy();
  });
});
