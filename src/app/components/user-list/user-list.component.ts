// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  searchName: string = '';
  filterWorkoutType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedUser: any | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.calculateTotalWorkoutHours();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
      (this.filterWorkoutType === '' || user.workouts.some((w: { type: string }) => w.type === this.filterWorkoutType))
    );
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToNextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  calculateTotalWorkoutHours() {
    this.users.forEach(user => {
      user.totalWorkoutMinutes = user.workouts.reduce((total: number, workout: any) => {
        return total + workout.minutes;
      }, 0);
    });
  }
}
