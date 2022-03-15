import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobseeker-details',
  templateUrl: './jobseeker-details.component.html',
  styleUrls: ['./jobseeker-details.component.scss']
})
export class JobseekerDetailsComponent implements OnInit {

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  id:string = this.route.snapshot.paramMap.get('id')
  userData:any
  load:boolean = true
  jobseekerDetail:any
  update:boolean = false

  jobSeeker(data:any){
    const confirm = window.confirm('Save Changes?')
    if(confirm){
      console.log(data)
      this.http.post('http://localhost:5500/JobSeeker', data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('TKN')
        })
      }).subscribe(res => {
          if(res){
            window.location.reload()
          }
      })
    }
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/getAllUsersById/${this.id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      })
    }).subscribe(res => {
        this.userData = res
        if(this.userData !== null){
          this.http.get(`http://localhost:5500/JobSeeker/${this.id}`, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('TKN')
            })
          }).subscribe(res => {
              this.jobseekerDetail = res
              if(this.jobseekerDetail.length > 0){
                    this.update = true
                    this.load = false          
              }
          })
        }
    })
  }
}
