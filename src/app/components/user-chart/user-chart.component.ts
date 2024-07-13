import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.css'
})
export class UserChartComponent implements OnInit, OnChanges{
  @Input() users: any[] = [];

  chart: any;

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart() {
    const workoutData = this.aggregateWorkoutData();

    this.chart = new Chart('workoutChart', {
      type: 'bar',
      data: {
        labels: workoutData.types,
        datasets: [{
          label: 'Minutes',
          data: workoutData.minutes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  aggregateWorkoutData() {
    const workoutData = {
      types: [] as string[],
      minutes: [] as number[]
    };

    this.users.forEach(user => {
      user.workouts.forEach((workout: { type: string, minutes: number }) => {
        const index = workoutData.types.indexOf(workout.type);
        if (index === -1) {
          workoutData.types.push(workout.type);
          workoutData.minutes.push(workout.minutes);
        } else {
          workoutData.minutes[index] += workout.minutes;
        }
      });
    });

    return workoutData;
  }
}
