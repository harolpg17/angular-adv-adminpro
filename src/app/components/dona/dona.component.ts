import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  //  // Doughnut
  //  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  //  public doughnutChartData: MultiDataSet = [
  //    [350, 450, 100]
  //  ];
  @Input() title: string = 'Sin Título';
  @Input() labels: Label[] = [];
  @Input() data: MultiDataSet[] = [];

   public colors: Colors[] = [
     { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
   ];

  constructor() { }

  ngOnInit(): void {
  }

}
