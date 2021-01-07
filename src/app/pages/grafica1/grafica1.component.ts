import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  labels1: string[] = ['Label1', 'Label2', 'Label3'];
  public data1 = [
    [350, 450, 100]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
