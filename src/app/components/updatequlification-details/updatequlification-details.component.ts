import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatequlification-details',
  templateUrl: './updatequlification-details.component.html',
  styleUrls: ['./updatequlification-details.component.scss']
})
export class UpdatequlificationDetailsComponent implements OnInit {
  @ Input() quaData
  data:any

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  load:boolean = true

  updatequalifications(data:any, id:number){
    this.http.put(`http://localhost:5500/Qualification/${id}`, {
      qualification: data.qualification,
      name: data.name,
      university: data.university,
      yearOfCompletion: data.yearOfCompletion,
      grade: data.grade
    }).subscribe(res => {
      if(res){
        alert('Updated Succesfully')
        window.location.reload()
      }
    })
  }

  ngOnInit(): void {
      if(this.quaData.length > 0){
        this.load = false
      }
  }
}
