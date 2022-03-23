import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qulification-details',
  templateUrl: './qulification-details.component.html',
  styleUrls: ['./qulification-details.component.scss']
})
export class QulificationDetailsComponent implements OnInit {

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router) { }
  userData:any
  load:boolean = true
  quaData:any = []
  id:string = this.route.snapshot.paramMap.get('id')
  update:boolean = false

  qualifications(qualificationForm:any){
    const confirm = window.confirm('Save Changes?')
    
    if(confirm){
      this.http.post('http://localhost:5500/Qualification', {
        grade: qualificationForm.grade,
        name: qualificationForm.name,
        qualification: qualificationForm.qualification,
        university: qualificationForm.university,
        userId: localStorage.getItem('UserId'),
        yearOfCompletion: qualificationForm.yearOfCompletion
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('TKN')
        })
      }).subscribe(res => {
        if(res){
          window.location.reload()
        }
      },(error) => {
        if(error.status === 500){
          alert("Enter jobseeker detail first")
          this.router.navigate([this.id,"details"])
        }
      })
    }
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/getUsersById/${this.id}`).subscribe(res => {
        this.userData = res
        if(this.userData != null){
          this.http.get(`http://localhost:5500/Qualification/${this.id}`).subscribe(res => {
            this.quaData = res
            if(this.quaData.length > 0){
              this.update = true
              this.load = false
            }
            else{
              this.update = false
              this.load = false
            }
          })
        }
    })
  }
}
