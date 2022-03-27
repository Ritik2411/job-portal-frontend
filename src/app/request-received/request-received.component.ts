import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.component.html',
  styleUrls: ['./request-received.component.scss']
})
export class RequestReceivedComponent implements OnInit {
  vacancyData:any = []
  data:any = []
  load:boolean = true
  date:any
  page:number = 1
  totalRecords:string
  sortOrder:string = 'default'
  pageSize:number = 5
  check:boolean = false
  search:string = 'All'
  jobseekerData:any = {}
  loadJD:boolean = true

  constructor(private http:HttpClient, private route:ActivatedRoute, private toast:ToastrService,private modalService: NgbModal) { }

  dateSearch(data){
    this.date = data.target.value
    let convertedDate = this.date.split("-")
    let searchdate = convertedDate[2] + "-" + convertedDate[1] + "-" + convertedDate[0]
    this.load = true
    this.page = 1
    this.vacancyRequests(searchdate,this.sortOrder, this.pageSize, this.page) 
  }

  clearDate(){
    this.date = null
    let search = "All"
    this.load = true
    this.vacancyRequests(search,this.sortOrder, this.pageSize, this.page) 
  }

  selectStatus(event){
    console.log(event.target.value)
    this.search = event.target.value
    this.load = true

    if(this.search === "All"){
      this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page) 

    }

    else{
      this.page = 1
      this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page) 
    }
  }

  sortByDate(){
    if(this.check){
      this.sortOrder = "default"
      this.check = false
      this.load = true
      this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)  
    }

    else{
      this.sortOrder = "ascending"
      this.check = true
      this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)  
    }
  }

  openJSmodal(content,user_id) {
    this.http.get(`http://localhost:5500/JobSeeker/${user_id}`).subscribe(res => {
      this.jobseekerData["Jobseeker"] = res
      if(this.jobseekerData["Jobseeker"] !== null || this.jobseekerData["Jobseeker"] !== undefined){
        this.http.get(`http://localhost:5500/Experience/${user_id}`).subscribe(res => {
          this.jobseekerData["Experience"] = res
          
          if(this.jobseekerData["Experience"] !== null || this.jobseekerData["Experience"] !== undefined){
                this.http.get(`http://localhost:5500/Qualification/${user_id}`).subscribe(res => {
                  this.jobseekerData["Qualification"] = res
                  
                  if(this.jobseekerData["Qualification"] !== null || this.jobseekerData["Qualification"] !== undefined){
                    this.http.get(`http://localhost:5500/Cv/user/${user_id}`).subscribe(res => {
                      this.jobseekerData["docjobseekerData"] = res
                      this.loadJD = false
                    })
                  }
                  else{
                    this.loadJD = false
                  }
                })   
          }
          else{
            this.loadJD = false
          }
        })
      }
      else{
        this.loadJD = false
      }
   })

    this.modalService.open(content, {ariaLabelledBy: 'modal-JS', size: 'xl'}).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.log(reason)
    });
  }

  approve(data:any){
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
      },

      {
        op: 'replace',
        path: 'no_of_Vacancies',
        value: data.no_of_Vacancies - 1
      }
    ]).subscribe(res => {
        if(res){
          this.http.patch(`http://localhost:5500/VacancyDetail/${(data.vacancy_id)}`, [
            {
              op: 'replace',
              path: 'no_of_Vacancies',
              value: data.no_of_Vacancies - 1
            }
          ]).subscribe(res => {
            if(res){
              this.toast.success("Approved successfully")
              setTimeout(() => {
               window.location.reload()
              },1000)
            }
          })
        }
    })
  }

  reject(data:any){
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
          this.toast.error("Request Rejected")
          setTimeout(() => {
            window.location.reload()
          },1000)
        }
    })
  }

  ngOnInit(): void {
    this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)

    setTimeout(()=>{
      console.log(this.vacancyData)
    },2000)
  }

  viewCv(fileData){
    console.log(fileData)
    this.http.get(`http://localhost:5500/Cv/${fileData.name}`, {responseType: 'blob'}).subscribe((res:Blob) => {
        var blob = new Blob([res], {type: fileData.fileType})
        var url = window.URL.createObjectURL(blob)
        window.open(url)
    })
  }

  pageChange(event){
    this.page = event
    this.load = true
    this.vacancyRequests(this.search,this.sortOrder, this.pageSize, this.page)  
  }

  vacancyRequests(search,sort_order, page_size, page){
    this.http.get(`http://localhost:5500/VacancyRequests/publisher_name/${localStorage.getItem('Username')}?search=${search}&sort_order=${sort_order}&page_size=${page_size}&page=${page}`).subscribe(res => {
      this.data = res
      this.vacancyData = this.data.vacancyRequest
      this.totalRecords = this.data.totalItems     

      if(this.vacancyData.length > 0){
        this.load = false
      }

      else{
        this.load = false
      }
    })
  }

  openApproveModal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-approve'}).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.log(reason)
    });
  }

  openRejectModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-reject'}).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.log(reason)
    });
  }

}
