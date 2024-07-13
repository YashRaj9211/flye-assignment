import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-from',
  templateUrl: './user-from.component.html',
  styleUrl: './user-from.component.css'
})
export class UserFormComponent {
  name: string = '';
  workoutType: string = '';
  minutes: number = 0;

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.name && this.workoutType && this.minutes) {
      this.userService.addWorkout(this.name, this.workoutType, this.minutes);
      this.name = '';
      this.workoutType = '';
      this.minutes = 0;
    }
  }
}