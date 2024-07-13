// user-service.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: any[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
    {
      id: 4,
      name: 'Emily Brown',
      workouts: [
        { type: 'Weightlifting', minutes: 45 },
        { type: 'Running', minutes: 25 },
        { type: 'Yoga', minutes: 30 }
      ]
    },
    {
      id: 5,
      name: 'David Lee',
      workouts: [
        { type: 'Basketball', minutes: 90 },
        { type: 'Cycling', minutes: 30 }
      ]
    },
    {
      id: 6,
      name: 'Sarah Connor',
      workouts: [
        { type: 'Kickboxing', minutes: 60 },
        { type: 'Running', minutes: 40 },
        { type: 'Swimming', minutes: 45 }
      ]
    },
    {
      id: 7,
      name: 'Tom Wilson',
      workouts: [
        { type: 'Tennis', minutes: 120 },
        { type: 'Yoga', minutes: 45 }
      ]
    },
    {
      id: 8,
      name: 'Lisa Chen',
      workouts: [
        { type: 'Pilates', minutes: 50 },
        { type: 'Cycling', minutes: 35 },
        { type: 'Swimming', minutes: 40 }
      ]
    },
    {
      id: 9,
      name: 'Robert Taylor',
      workouts: [
        { type: 'Rowing', minutes: 40 },
        { type: 'Weightlifting', minutes: 55 },
        { type: 'Running', minutes: 30 }
      ]
    },
    {
      id: 10,
      name: 'Amanda Garcia',
      workouts: [
        { type: 'Zumba', minutes: 60 },
        { type: 'Yoga', minutes: 45 },
        { type: 'Running', minutes: 25 }
      ]
    },
    {
      id: 11,
      name: 'Chris Thompson',
      workouts: [
        { type: 'CrossFit', minutes: 75 },
        { type: 'Swimming', minutes: 30 }
      ]
    },
    {
      id: 12,
      name: 'Olivia Martinez',
      workouts: [
        { type: 'Rock Climbing', minutes: 90 },
        { type: 'Yoga', minutes: 60 }
      ]
    },
    {
      id: 13,
      name: 'Daniel Kim',
      workouts: [
        { type: 'Martial Arts', minutes: 80 },
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 14,
      name: 'Emma Watson',
      workouts: [
        { type: 'Dancing', minutes: 120 },
        { type: 'Pilates', minutes: 45 }
      ]
    },
  ];

  private usersSubject = new BehaviorSubject<any[]>(this.users);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
        this.usersSubject.next(this.users);
      }
    }
  }

  getUsers(): any[] {
    return this.users.slice(); 
  }

  getUsersObservable(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  addWorkout(name: string, type: string, minutes: number) {
    const existingUser = this.users.find(u => u.name === name);
    if (existingUser) {
      existingUser.workouts.push({ type, minutes });
    } else {
      const newUser = {
        id: this.users.length + 1,
        name,
        workouts: [{ type, minutes }]
      };
      this.users.push(newUser);
    }
    this.saveUsers();
    this.usersSubject.next(this.users);
  }

  private saveUsers() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}