import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  id:string
  userData:any = {}
  load:boolean = true
  private httpclient:HttpClient
  cvData:any

  constructor(private route:ActivatedRoute,private http:HttpClient, private httpBackend:HttpBackend, private router:Router) {
    this.httpclient = new HttpClient(httpBackend)
  }

  data:any
  currentData:any
  role:string = localStorage.getItem('Role')
  
  cvformData(){
    if(this.currentData.type !== 'application/pdf'){
      alert("Upload a PDF file")
    }
    else{
     const formdata = new FormData()
     formdata.append('files', this.currentData)

     this.httpclient.post(`http://localhost:5500/Cv/${this.route.snapshot.paramMap.get('id')}`, formdata, {
       headers: new HttpHeaders({
         'enctype': 'multipart/form-data',
         Authorization: 'Bearer ' + localStorage.getItem('TKN')
       })
     }).subscribe(res => {
       if(res){
         alert("Uploaded successfully")
         this.router.navigate([this.route.snapshot.paramMap.get('id'),'cvuploaded'])
       }
     })
    }
  }

  onFileSelected(event){
    this.currentData = (event.target.files[0])
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    
    this.http.get(`http://localhost:5500/getUsersById/${this.id}`).subscribe(res => {
      this.userData = res
      if(this.userData.length > 0){
        this.load = false
      }
      else{
        this.load = false
      }
    })
  }
}
