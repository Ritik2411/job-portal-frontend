import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
  @ Input() data = []

  vacancyData:any = []

  constructor(private http:HttpClient, private router:Router, private route:Router) { }
  
  role:string = localStorage.getItem('Role')

  apply(data){
    var confirm = window.confirm(`Apply for this vacany?`)

    if(confirm){
      this.http.post('http://localhost:5500/VacancyRequests', {
        vacancy_id: data.id.toString(),
        user_id: localStorage.getItem('UserId'),
        applied_on: new Date().toISOString(),
        awaiting_approval: true,
        approved: false,
        user_name: localStorage.getItem('Username'),
        publishedBy: data.publishedBy,
        description: data.job_Description

      }).subscribe(res => {
          if(res){
            this.http.patch(`http://localhost:5500/VacancyDetail/${data.id}`, [
              {
                "op": "replace",
                "path": "no_of_vacancies",
                "value": data.no_of_Vacancies - 1
              },
              {
                "op": "replace",
                "path": "no_of_applications",
                "value": data.no_of_applications + 1
              }
            ]).subscribe(res => {
              if(res){
                alert('Applied Successfully')
                this.router.navigate(['/appliedvacancies', localStorage.getItem('UserId')])
              }
            })        
          }
      })
    }
    else{
      console.log("Cancelled")
    }
  }

  deleteVacancy(id:number){
    const confirm = window.confirm("Delete this vacancy?")
    
    if(confirm){
      this.http.delete(`http://localhost:5500/VacancyDetail/${id}`).subscribe(res => {
        if(res){
          window.location.reload()
        }
    })
    }  
  }

  editvacancy(data){
    this.route.navigateByUrl(`updateVacancy/${localStorage.getItem('UserId')}` , {state: data})
  }

  ngOnInit(): void {
      this.vacancyData = this.data      
  }
}
