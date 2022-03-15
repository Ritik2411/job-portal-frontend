import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {

  constructor(private http:HttpClient, private route:ActivatedRoute) { }
  userData:any
  load:boolean = true
  id:string = this.route.snapshot.paramMap.get('id')
  update:boolean = false
  expData:any 

  experience(data:any){
    const confirm = window.confirm('Save Changes?')
    
    if(confirm){
      console.log(data)
      this.http.post('http://localhost:5500/Experience', data, {
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
          this.http.get(`http://localhost:5500/Experience/${this.id}`, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('TKN')
            })
          }).subscribe(res => {
            this.expData = res
            if(this.expData.length > 0){
              this.update = true
              this.load = false
            }
          })
        }
    })
  }
}
