import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.component.html',
  styleUrls: ['./request-received.component.scss']
})
export class RequestReceivedComponent implements OnInit {
  vacancyData:any = []
  userVac:any = []
  reqRec:any = []
  load:boolean = true
  userData:any = [] 
  vacancyDetail:any = []

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  approve(data:any){
    const approved = window.confirm("Continue to apporve this vacancy?") 
    if(approved){
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.vacanyData.vacancyDetail.id}`, [
        {
          op: 'replace',
          path: 'awaiting_approval',
          value: false
        },

        {
          op: 'replace',
          path: 'approved',
          value: true
        }
      ],{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('TKN')
        })
      }).subscribe(res => {
          if(res){
            window.location.reload()
          }
      })
    }
    else{
      console.log("op c")
    }
  }

  reject(data:any){
    const rejected = window.confirm("Continue to reject this vacancy?") 
    if(rejected){
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.vacanyData.vacancyDetail.id}`, [
        {
          op: 'replace',
          path: 'awaiting_approval',
          value: false
        },

        {
          op: 'replace',
          path: 'approved',
          value: false
        }
      ],{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('TKN')
        })
      }).subscribe(res => {
          if(res){
            window.location.reload()
          }
      })
    }
    else{
      console.log("op c")
    }
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5500/VacancyRequests', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
      this.vacancyData = res
      if(this.vacancyData.length > 0){
        this.http.get(`http://localhost:5500/VacancyDetail/${this.route.snapshot.paramMap.get('id')}`,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('TKN')
          })  
        }).subscribe(res => {
            this.userVac = res
            if(this.userVac.length > this.vacancyData.length){
              console.log("if")
              for(let i=0; i<this.userVac.length; i++){
                for(let j=0; j<this.vacancyData.length; j++){
                  if(this.userVac[i].id === parseInt(this.vacancyData[j].vacancy_id)){
                     this.reqRec.push({
                       vacancyDetail: this.vacancyData[j],
                       publisher_name: this.userVac[i].published_by
                      }) 
                     this.load = false
                  }
                }

                for(let i=0; i<this.vacancyData.length; i++){
                  
                  this.http.get(`http://localhost:5500/getAllUsersById/${this.reqRec[i].vacancyDetail.user_id}`, {
                    headers : new HttpHeaders({
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + localStorage.getItem('TKN')
                    })
                  }).subscribe(res => {
                      this.userData.push(res)
                      this.vacancyDetail.push({
                        vacanyData: this.reqRec[i],
                        userName: this.userData[i].firstName +' '+ this.userData[i].lastName
                      })
                  })  
                }
              }
            }

            else{
              for(let i=0; i<this.vacancyData.length; i++){
                for(let j=0; j<this.userVac.length; j++){
                  if(parseInt(this.vacancyData[i].vacancy_id) === this.userVac[j].id){
                     this.reqRec.push({
                      vacancyDetail: this.vacancyData[i],
                      publisher_name: this.userVac[j].publishedBy
                     })
                  }
                }
              }

              for(let i=0; i<this.reqRec.length; i++){
                this.http.get(`http://localhost:5500/getAllUsersById/${this.reqRec[i].vacancyDetail.user_id}`, {
                  headers : new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('TKN')
                  })
                }).subscribe(res => {
                    this.userData.push(res)
                    this.vacancyDetail.push({
                      vacanyData: this.reqRec[i],
                      userName: this.userData[i]?.email
                    })
                })
              }

              setTimeout(()=>{
                  this.load = false
                  console.log(this.vacancyDetail) 
              },4000)
            }
        })
      }
    })
  }
}
