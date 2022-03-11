import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.scss']
})
export class AddVacancyComponent implements OnInit {

  constructor(private router:ActivatedRoute,private http:HttpClient,private route:Router) { }

  id:string = this.router.snapshot.paramMap.get('id')

  AddVacancy(data:any){
    this.http.post('http://localhost:5500/VacancyDetail', data, {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
        if(res){
          alert("Vacancy posted successfully")
          this.route.navigate(['/vacancies',this.id])
        }
    })
  }

  ngOnInit(): void {
  }

}
