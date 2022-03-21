import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-portal';
  id:string = localStorage.getItem('TKN')

  constructor(private router:Router){}
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(this.id === null){
        window.history.forward()
    }
  }
}
