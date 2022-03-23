import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  
  data:any
  vacancies:any
  load:boolean = true
  copyData:any
  date:any
  page:number = 1
  totalRecords:string
  itemPerPage:number = 5
  checkedPD:boolean = false
  checkedLD:boolean = false
  sortOrder:string = "dafault"

  constructor(private http:HttpClient, private router:ActivatedRoute) { }

  id = this.router.snapshot.paramMap.get('id')

  sortByPd(){
    if(this.checkedPD === false){
      this.checkedPD = true
      this.sortOrder = "ascending_PD"
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
    else{
      this.checkedPD = false
      this.sortOrder = "default"
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
  }

  sortByLd(){
    if(this.checkedLD === false){
      this.checkedLD = true
      this.sortOrder = "descending_LD"
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
    else{
      this.checkedLD = false
      this.sortOrder = "ascending_LD"
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
  }

  searchBydate(event){
    this.date = event.target.value
    let newData = this.vacancies.filter(data => data.published_Date.toLowerCase().includes(this.date.toLowerCase()))
    this.copyData = newData
  }

  cleardate(){
    this.date = null
    this.copyData = this.vacancies
  }
  
  changeExp(event){
    let txt = event.target.value
    let newData = this.vacancies.filter(data => data.experience.toLowerCase().includes(txt.toLowerCase()))
    this.copyData = newData
  }

  pageHandler(event){
    this.page = event
    this.vacancyDetail(this.sortOrder, this.itemPerPage, this.page)
  }

  ngOnInit(): void {
    this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
  }

  vacancyDetail(sort_order,page_size,page){
    this.http.get(`http://localhost:5500/VacancyDetail/${this.id}?sortOrder=${sort_order}&page_size=${page_size}&page=${page}`).subscribe(res => {
      this.data = res
      this.vacancies = this.data.vacancyDetail
      this.totalRecords = this.data.totalItems.toString()
      this.copyData = this.vacancies

      if(this.vacancies.length > 0){
        this.load = false
      }
      else{
        this.load = false
      }
    })
  }
}
