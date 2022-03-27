import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent implements OnInit {
  @ Input() data = []
  
  closeResult = '';
  vacancyData:any = []
  employeeData:any = []
  loadED:boolean = true
  currentData:any = null
  lastDate:any

  constructor(private http:HttpClient, private router:Router, private route:Router, private toast:ToastrService,private modalService: NgbModal) { }
  
  role:string = localStorage.getItem('Role')
  todayDate = new Date().toISOString()
  min_date:any = this.todayDate.toString().split("T")

  ngOnInit(): void {
    this.vacancyData = this.data    
  }

  apply(data){
    this.http.post('http://localhost:5500/VacancyRequests', {
      vacancy_id: data.id.toString(),
      user_id: localStorage.getItem('UserId'),
      applied_on: new Date().toISOString(),
      awaiting_approval: true,
      approved: false,
      user_name: localStorage.getItem('Username'),
      publishedBy: data.publishedBy,
      description: data.job_Description,
      no_of_Vacancies: data.no_of_Vacancies

    }).subscribe(res => {
        if(res){
          this.http.patch(`http://localhost:5500/VacancyDetail/${data.id}`, [
            {
              op: "replace",
              path: "no_of_applications",
              value: data.no_of_applications + 1
            }
          ]).subscribe(res => {
            if(res){
              this.toast.success('Applied Successfully')
              setTimeout(() => {
                window.location.reload()
              },1000)
            }
          })  
        }
    })
  }

  deleteVacancy(id:number){
      this.http.delete(`http://localhost:5500/VacancyDetail/${id}`).subscribe(res => {
        if(res){
          this.toast.error("Deleted successfully")
          setTimeout(() => {
            window.location.reload()
          },1000)
        }
    })
  }

  editvacancy(data){
     
     console.log(this.currentData)
  }

  updateVacancy(data, id){
    this.http.put(`http://localhost:5500/VacancyDetail/${id}`, {
      experience: data.experience,
      job_Description: data.job_Description,
      max_Salary: data.max_Salary,
      min_Salary: data.min_Salary,
      minimum_qualification: data.minimum_qualification,
      no_of_Vacancies: data.no_of_Vacancies,
      last_Date: data.last_Date
    }).subscribe(res => {
        if(res){
          this.toast.success("Vacancy Updated Successfully")
          setTimeout(() => {
            window.location.reload()            
          },1000)
        }
    })
  }

  employeeDetails(userId:string){
    this.http.get(`http://localhost:5500/EmployeeDetail/${userId}`).subscribe(res => {
        this.employeeData = res
        if(this.employeeData.length > 0){
          this.loadED = false
          console.log(this.employeeData)
        }
        
        this.loadED = false
        
    })
  }

  open(content, userId) {
    this.http.get(`http://localhost:5500/EmployeeDetail/${userId}`).subscribe(res => {
        this.employeeData = res
        if(this.employeeData.length > 0){
          this.loadED = false
          console.log(this.employeeData)
        }
        
        this.loadED = false
        
    })

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason)
    });
  }

  openapplymodel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason)
    });
  }

  openEditModel(content,vacancyData){
    this.currentData =  vacancyData
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit-vacancy', centered: true}, ).result.then((result) => {
      console.log(this.currentData)
    }, (reason) => {
        console.log(reason)
    });
  }

  opendeleteModal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-delete'}).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.log(reason)
    });
  }
}
