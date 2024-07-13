import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service.service';
import { PLATFORM_ID } from '@angular/core';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: PLATFORM_ID, useValue: 'browser' } // Mock PLATFORM_ID as 'browser'
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have predefined users initially', () => {
    const users = service.getUsers();
    expect(users.length).toBe(15); // Ensure the initial length matches
    expect(users[0].name).toBe('John Doe');
  });

  it('should add a workout for an existing user', () => {
    const initialLength = service.getUsers()[0].workouts.length;
    service.addWorkout('John Doe', 'Swimming', 40);
    const updatedUser = service.getUsers().find(user => user.name === 'John Doe');
    expect(updatedUser.workouts.length).toBe(initialLength + 1);
    expect(updatedUser.workouts[initialLength].type).toBe('Swimming');
    expect(updatedUser.workouts[initialLength].minutes).toBe(40);
  });

  it('should add a workout for a new user', () => {
    const initialUsersLength = service.getUsers().length;
    service.addWorkout('New User', 'Running', 30);
    const newUser = service.getUsers().find(user => user.name === 'New User');
    expect(newUser).toBeTruthy();
    expect(newUser.workouts.length).toBe(1);
    expect(newUser.workouts[0].type).toBe('Running');
    expect(newUser.workouts[0].minutes).toBe(30);
    expect(service.getUsers().length).toBe(initialUsersLength + 1);
  });

  it('should update localStorage when adding a workout', () => {
    spyOn(localStorage, 'setItem');
    service.addWorkout('John Doe', 'Swimming', 40);
    expect(localStorage.setItem).toHaveBeenCalledWith('users', jasmine.any(String));
  });

  it('should retrieve users from localStorage if available', () => {
    const mockUsers = JSON.stringify([
      { id: 1, name: 'LocalStorage User', workouts: [{ type: 'Running', minutes: 30 }] }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(mockUsers);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: PLATFORM_ID, useValue: 'browser' } // Mock PLATFORM_ID as 'browser'
      ]
    });
    service = TestBed.inject(UserService);
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('LocalStorage User');
  });
});
