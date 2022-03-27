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
  date:any
  page:number = 1
  totalRecords:string
  itemPerPage:number = 5
  checkedPD:boolean = false
  checkedLD:boolean = false
  sortOrder:string = "default"

  constructor(private http:HttpClient, private router:ActivatedRoute) { }

  id = this.router.snapshot.paramMap.get('id')

  sortByPd(){
    if(this.checkedPD === false){
      this.checkedPD = true
      this.sortOrder = "ascending_PD"
      this.load = true
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
    else{
      this.checkedPD = false
      this.sortOrder = "default"
      this.load = true
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
  }

  sortByLd(){
    if(this.checkedLD === false){
      this.checkedLD = true
      this.sortOrder = "descending_LD"
      this.load = true
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
    else{
      this.checkedLD = false
      this.sortOrder = "ascending_LD"
      this.load = true
      this.vacancyDetail(this.sortOrder,this.itemPerPage, this.page)
    }
  }

  searchBydate(event){
    this.date = event.target.value
    let splited = this.date.toString().split("-")
    let pubDate = splited[2] + "-" + splited[1] + "-" + splited[0]
    this.load = true
    
    this.http.get(`http://localhost:5500/VacancyDetail/${this.id}?pub_date=${pubDate}&sortOrder=${this.sortOrder}&page_size=${this.itemPerPage}&page=1`).subscribe(res => {
      this.data = res
      this.vacancies = this.data.vacancyDetail
      this.totalRecords = this.data.totalItems.toString()
    
      if(this.vacancies.length > 0){
        this.load = false
      }
      else{
        this.load = false
      }
    })
  }

  cleardate(){
    this.date = null
    this.vacancyDetail(this.sortOrder, this.itemPerPage, this.page)
  }
  
  changeExp(event){
    let txt = event.target.value
    this.load = true
    if(txt === 'Freshers' || txt === '1 Year' || txt === '2 Years'){
      this.http.get(`http://localhost:5500/VacancyDetail/${this.id}?experience=${txt}&sortOrder=${this.sortOrder}&page_size=${this.itemPerPage}&page=1`).subscribe(res => {
        this.data = res
        this.vacancies = this.data.vacancyDetail
        this.totalRecords = this.data.totalItems.toString()
  
        if(this.vacancies.length > 0){
          this.load = false
        }
        else{
          this.load = false
        }
      })
    }
    
    else{
      this.load = true
      this.vacancyDetail(this.sortOrder, this.itemPerPage, this.page)
    }
  }

  pageHandler(event){
    this.page = event
    this.load = true
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

      if(this.vacancies.length > 0){
        this.load = false
      }
      else{
        this.load = false
      }
    })
  }
}
