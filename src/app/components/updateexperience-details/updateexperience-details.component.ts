import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateexperience-details',
  templateUrl: './updateexperience-details.component.html',
  styleUrls: ['./updateexperience-details.component.scss']
})
export class UpdateexperienceDetailsComponent implements OnInit {
  @ Input() expData

  constructor(private http:HttpClient, private route:ActivatedRoute, private toast:ToastrService) { }
  load:boolean = true

  updateexperience(data:any, id:number){
    this.http.put(`http://localhost:5500/Experience/${id}`, {
      company_name: data.company_name,
      start_year: data.start_year,
      end_year: data.end_year,
      companyUrl: data.companyUrl,
      designation: data.designation,
      jobDescription: data.jobDescription
    }).subscribe(res => {
      if(res){
        window.location.reload()
      }
    })
  }

  ngOnInit(): void {
    if(this.expData.length > 0){
      this.load = false
      console.log(this.expData)
    } 
  }
}
