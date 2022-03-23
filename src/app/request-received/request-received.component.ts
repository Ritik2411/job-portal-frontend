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
  data:any = []
  load:boolean = true
  userData:any = [] 
  vacancyDetail:any = []
  copyData:any 
  date:any
  page:number = 1
  totalRecords:string
  sortOrder:string = 'default'
  pageSize:number = 5
  check:boolean = false

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  dateSearch(data){
    this.date = data.target.value
    let newData = this.vacancyData.filter(data => data.applied_on.toLowerCase().includes(this.date.toLowerCase()))
    this.copyData = newData
  }

  clearDate(){
    this.date = null
    this.copyData = this.vacancyData
  }

  selectStatus(event){
    console.log(event.target.value)
    if(event.target.value === 'all'){
      let newData = this.vacancyData
      this.copyData = newData
    }

    if(event.target.value === 'approved'){
      let newData = this.vacancyData.filter(data => data.awaiting_approval === false && data.approved === true)
      this.copyData = newData
    }

    if(event.target.value === 'rejected'){
      let newData = this.vacancyData.filter(data => data.awaiting_approval === false && data.approved === false)
      this.copyData = newData
    }

    if(event.target.value === 'awaiting_approval'){
      let newData = this.vacancyData.filter(data => data.awaiting_approval === true)
      this.copyData = newData
    }
  }

  sortByDate(){
    if(this.check){
      this.sortOrder = "default"
      this.check = false
      this.vacancyRequests(this.sortOrder, this.pageSize, this.page)  
    }

    else{
      this.sortOrder = "ascending"
      this.check = true
      this.vacancyRequests(this.sortOrder, this.pageSize, this.page)  
    }
  }

  approve(data:any){
    const approved = window.confirm("Continue to apporve this vacancy?") 
    if(approved){
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.id}`, [
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
      this.http.patch(`http://localhost:5500/VacancyRequests/vacancies/${data.id}`, [
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
    this.vacancyRequests(this.sortOrder, this.pageSize, this.page)

    setTimeout(()=>{
      console.log(this.vacancyData)
    },2000)
  }

  pageChange(event){
    this.page = event
    this.vacancyDetail(this.sortOrder, this.pageSize, this.page)  
  }

  vacancyRequests(sort_order, page_size, page){
    this.http.get(`http://localhost:5500/VacancyRequests/publisher_name/${localStorage.getItem('Username')}?sort_order=${sort_order}&page_size=${page_size}&page=${page}`).subscribe(res => {
      this.data = res
      this.vacancyData = this.data.vacancyRequest
      this.totalRecords = this.data.totalItems
      this.copyData = this.vacancyData      

      if(this.vacancyData.length > 0){
        this.load = false
      }

      else{
        this.load = false
      }
    })
  }
}
