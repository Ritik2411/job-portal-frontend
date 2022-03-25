import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit {
  data:any
  load:boolean = true
  constructor(private route:ActivatedRoute, private http:HttpClient) { }

  id:string = this.route.snapshot.paramMap.get("id")
  jobseekerID = localStorage.getItem("UserId")

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/EmployeeDetail/${this.id}`).subscribe(res => {
        this.data = res
        if(this.data.length > 0){
          this.load = false
        }
        else{
          this.load = false
        }
    })

    setTimeout(()=>{
      console.log(this.data)
    },2000)
  }
}
