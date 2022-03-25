import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  data:any = {}
  load:boolean = true
  
  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  
  id:string = this.route.snapshot.paramMap.get("id")
  employeeId:string = localStorage.getItem("UserId")
  
  viewDoc(name:string,contentType:string){
    this.http.get(`http://localhost:5500/Cv/${name}`, {responseType:'blob'}).subscribe((res:Blob) => {
        const blob = new Blob([res], {type: contentType})
        const url = window.URL.createObjectURL(blob)
        window.open(url)
    })
  }

  ngOnInit(): void {
   this.http.get(`http://localhost:5500/JobSeeker/${this.id}`).subscribe(res => {
      this.data["Jobseeker"] = res
      if(this.data["Jobseeker"] !== null || this.data["Jobseeker"] !== undefined){
        this.http.get(`http://localhost:5500/Experience/${this.id}`).subscribe(res => {
          this.data["Experience"] = res
          
          if(this.data["Experience"] !== null || this.data["Experience"] !== undefined){
                this.http.get(`http://localhost:5500/Qualification/${this.id}`).subscribe(res => {
                  this.data["Qualification"] = res
                  
                  if(this.data["Qualification"] !== null || this.data["Qualification"] !== undefined){
                    this.http.get(`http://localhost:5500/Cv/user/${this.id}`).subscribe(res => {
                      this.data["docdata"] = res
                      this.load = false
                    })
                  }
                  else{
                    this.load = false
                  }
                })   
          }
          else{
            this.load = false
          }
        })
      }
      else{
        this.load = false
      }
   })

   setTimeout(()=>{
    console.log(this.data)
   },1000)
  }
}
