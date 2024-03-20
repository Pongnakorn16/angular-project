import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ServiceParams } from '../../services/service_params';
import { TripService } from '../../services/api/call_api.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetImage2, GraphScore } from '../../model/Get_res';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './graph-show.component.html',
  styleUrl: './graph-show.component.css'
})
export class GraphShowComponent implements OnInit {

  graph_score: any;
  graph_current_score: any;
  graph_pid: any;

  chartData: any = {
    labels: [], 
    datasets: [{
      label: 'My First Dataset',
      data: [], 
      fill: false,
      borderColor: 'white',
      tension: 0.1
    }]
  };

  constructor(private http: HttpClient, private router: Router, private S_params: ServiceParams, private tripService: TripService) { }

  async ngOnInit() {
    this.graph_pid = this.S_params.s_pid
    console.log(this.graph_pid);
    this.graph_score = await this.tripService.getGraphScore(this.graph_pid);
    this.graph_current_score = await this.tripService.getGraphCurrentScore(this.graph_pid);
    console.log(this.graph_score);
    console.log(this.graph_current_score);
    
    this.populateChartData();
    this.createChart();
  }

    populateChartData(): void {
      for(let i = 0; i < this.graph_score.length; i++) {
        this.chartData.labels.push(this.graph_score[i].s_date); // เข้าถึงข้อมูลวันที่และเพิ่มลงใน labels
        this.chartData.datasets[0].data.push(this.graph_score[i].s_score); // เข้าถึงข้อมูลคะแนนและเพิ่มลงใน data
      } 
      const lastLabelIndex = 6;
      this.chartData.datasets[0].data[lastLabelIndex] = this.graph_current_score[0].score;
  }
  

  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: this.chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'blue' // เปลี่ยนสีของเส้นกราฟในตำแหน่งคำอธิบาย
            }
          }
        }
      }
    });
  }
  

  async back() {
    this.router.navigateByUrl('/graph');
  }
}
