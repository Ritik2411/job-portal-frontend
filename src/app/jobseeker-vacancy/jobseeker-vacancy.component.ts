import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobseeker-vacancy',
  templateUrl: './jobseeker-vacancy.component.html',
  styleUrls: ['./jobseeker-vacancy.component.scss']
})
export class JobseekerVacancyComponent implements OnInit {
  data:any
  load:boolean = true

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:5500/VacancyDetail",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
      this.data = res
    })

    setTimeout(()=>{
      this.load = false
    },2000)
  }
}
