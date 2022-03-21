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
  copyData:any 
  date:any
  page:number = 1
  totalRecords:string

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  dateSearch(data){
    this.date = data.target.value
    let newData = this.reqRec.filter(data => data.vacancyDetail.applied_on.toLowerCase().includes(this.date.toLowerCase()))
    this.copyData = newData
  }

  clearDate(){
    this.date = null
    this.copyData = this.reqRec
  }

  selectStatus(event){
    console.log(event.target.value)
    if(event.target.value === 'all'){
      let newData = this.reqRec
      this.copyData = newData
    }

    if(event.target.value === 'approved'){
      let newData = this.reqRec.filter(data => data.vacancyDetail.awaiting_approval === false && data.vacancyDetail.approved === true)
      this.copyData = newData
    }

    if(event.target.value === 'rejected'){
      let newData = this.reqRec.filter(data => data.vacancyDetail.awaiting_approval === false && data.vacancyDetail.approved === false)
      this.copyData = newData
    }

    if(event.target.value === 'awaiting_approval'){
      let newData = this.reqRec.filter(data => data.vacancyDetail.awaiting_approval === true)
      this.copyData = newData
    }
  }

  approve(data:any){
    const approved = window.confirm("Continue to apporve this vacancy?") 
    if(approved){
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.vacancyDetail.id}`, [
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
      ]).subscribe(res => {
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
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.vacancyDetail.id}`, [
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
      ]).subscribe(res => {
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
    this.http.get('http://localhost:5500/VacancyRequests').subscribe(res => {
      this.vacancyData = res
      console.log(this.vacancyData)
      if(this.vacancyData.length >= 0){
        this.http.get(`http://localhost:5500/VacancyDetail/${this.route.snapshot.paramMap.get('id')}`).subscribe(res => {
            this.userVac = res
            if(this.userVac.length > this.vacancyData.length){
              console.log("if")
              for(let i=0; i<this.userVac.length; i++){
                for(let j=0; j<this.vacancyData.length; j++){
                  if(this.userVac[i].id === parseInt(this.vacancyData[j].vacancy_id)){
                     this.reqRec.push({
                       vacancyDetail: this.vacancyData[j],
                       publisher_name: this.userVac[i].publishedBy
                      }) 
                  }
                }
              }

              this.totalRecords = this.reqRec.length
              this.copyData = this.reqRec
              this.load = false
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
             
             this.copyData = this.reqRec
             this.load = false
            }
        })
      }
    })

    setTimeout(()=>{
      console.log(this.reqRec)
    },2000)
  }
}
