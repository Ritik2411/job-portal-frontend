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
  @ Input() applied

  vacancyData:any = []
  vacancyReq:any = []
  requestsData:any

  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) { }
  
  
  role:string = localStorage.getItem('Role')

  apply(data){
    var confirm = window.confirm(`Apply for this vacany?`)

    if(confirm){
      this.http.post('http://localhost:5500/VacancyRequests', {
        vacancy_id: data.id.toString(),
        user_id: localStorage.getItem('UserId'),
        applied_on: new Date().toISOString(),
        awaiting_approval: true,
        approved: false
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('TKN')
        })
      }).subscribe(res => {
          if(res){
            this.http.patch(`http://localhost:5500/VacancyDetail/${data.id}`, [
              {
                "op": "replace",
                "path": "no_of_vacancies",
                "value": data.no_of_Vacancies - 1
              }
            ],{
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('TKN')
              }
            }).subscribe(res => {
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
    this.http.delete(`http://localhost:5500/VacancyDetail/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
        if(res){
          this.http.get('http://localhost:5500/VacancyRequests', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('TKN')
            }
          }).subscribe(res =>{
              this.vacancyReq = res
              for(let i=0; i<this.vacancyReq.length; i++){
                if(parseInt(this.vacancyReq[i].vacancy_id) === id){
                  this.http.delete(`http://localhost:5500/VacancyRequests/${this.vacancyReq[i].id}`,{
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + localStorage.getItem('TKN')
                    }
                  }).subscribe(res => {
                    if(res){
                      window.location.reload()
                    }
                  })
                }
              }
          })
        }
    })  
  }

  ngOnInit(): void {
       this.vacancyData = this.data
  }
}
