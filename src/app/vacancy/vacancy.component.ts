import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
  @ Input() data = []
  vacancyData:any = []
  constructor() { }
  
  role:string = localStorage.getItem('Role')

  ngOnInit(): void {
       this.vacancyData = this.data
  }
}
