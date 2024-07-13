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
  cahrtType: string = "polarArea";

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
          backgroundColor: ['rgb(216, 239, 211)', 'rgb(149, 210, 179)', 'rgb(85, 173, 155)', 'rgb(241, 248, 232)', 'rgb(224, 251, 226)'],
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

  // toggleChart() {
  //   this.cahrtType = this.cahrtType === "polarArea" ? "bar" : "polarArea";
  //   if (this.chart) {
  //     this.chart.destroy();
  //   }
  //   this.createChart();
  // }
}
