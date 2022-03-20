import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {

  constructor() { }

  tkn:string = null

  ngOnInit(): void {
    this.tkn = localStorage.getItem('TKN')
  }

  ngDoCheck(): void {
    this.tkn = localStorage.getItem('TKN')
  }
}
