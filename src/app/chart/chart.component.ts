import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../service/data.service';
import { connect } from 'rxjs';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  leden: any;
  totalLeden: any;
  temp !: any

  countRibbelJ: any = 0
  countRibbelM: any = 0
  countSpeelclubJ: any = 0
  countSpeelclubM: any = 0
  countRakkers: any = 0
  countKwiks: any = 0
  countToppers: any = 0
  countTippers: any = 0
  countKerels: any = 0
  countTiptiens: any = 0
  countAspiJ: any = 0
  countAspiM: any = 0


  constructor(private dataservice: DataService) {}

  ngOnInit() {    
    this.loadLeden()
  }

  public chart: any;

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Ribbels', 'Speelclub', 'Rakwi', 'Tito', 'Keti', 'Aspi',  ], 
	       datasets: [
          {
            label: "Meisjes",
            data: [this.countRibbelM, this.countSpeelclubM, this.countKwiks, this.countTippers, this.countTiptiens, this.countAspiM],
            backgroundColor: 'pink'
          },
          {
            label: "Jongens",
            data: [this.countRibbelJ, this.countSpeelclubJ, this.countRakkers, this.countToppers, this.countKerels, this.countAspiJ],
            backgroundColor: 'blue'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  loadLeden() {
    this.dataservice.getLeden().subscribe((data: any) => {
      this.leden = data
      this.totalLeden = this.leden.ength
      for(let i = 0; i<data.length; i++){
        switch(data[i].afdelingId) {
          case 1:
            this.countRibbelM++;
            break;
          case 2:
            this.countRibbelJ++;
            break;
          case 3:
            this.countSpeelclubM++;
            break;
          case 4:
            this.countSpeelclubJ++;
            break;
          case 5:
            this.countKwiks++;
            break;
          case 6:
            this.countRakkers++;
            break;
          case 7:
            this.countTippers++;
            break;
          case 8:
            this.countToppers++;
            break;
          case 9:
            this.countTiptiens++;
            break;
          case 10:
            this.countKerels++;
            break;
          case 11:
            this.countAspiM++;
            break;
          case 12:
            this.countAspiJ++;
            break;
          default:
            // Handle any other cases if needed
            break;
        }
      }
      this.createChart()
    });
  }
}
