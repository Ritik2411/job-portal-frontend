import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  disable:boolean = true
  firstName:string
  lastName:string
  filedata:any

  constructor(private route:ActivatedRoute,private http:HttpClient, private httpBackend:HttpBackend, private router:Router, private toast:ToastrService) {
    this.httpclient = new HttpClient(httpBackend)
  }

  data:any
  currentData:any
  role:string = localStorage.getItem('Role')
  
  cvformData(){
    if(this.currentData.type !== 'application/pdf'){
      this.toast.warning("Upload a PDF file")
    }
    else{
     const formdata = new FormData()
     formdata.append('files', this.currentData)
     
     if(this.filedata.length === 0){
      this.httpclient.post(`http://localhost:5500/Cv/${this.route.snapshot.paramMap.get('id')}`, formdata, {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('TKN')
        })
      }).subscribe(res => {
        if(res){
           window.location.reload() 
         }
      })
     }

     else{
       this.toast.warning("Delete previous CV to upload new one.")
     }
    }
  }

  enable(){
    var firstName:any = document.getElementById("disableFN");
    var lastName:any = document.getElementById("disableLN");
    
    if(firstName && lastName){
      firstName.disabled = false;
      lastName.disabled = false;
      this.disable = false
    } 
  }

  update(userData:any){
    if(userData !== null){
      this.http.put(`http://localhost:5500/updateUser/${userData.userName}`, {
        first_name: this.firstName,
        last_name: this.lastName
      }).subscribe(res => {
        if(res){
          window.location.reload()
        }
      })
    }
  }

  onFileSelected(event){
    this.currentData = (event.target.files[0])
  }

  view(filename:string, type:string){
    this.http.get(`http://localhost:5500/Cv/${filename}`, {responseType: 'blob'}).subscribe((res:Blob)=>{
        let blob = new Blob([res], {type: type})
        let url = window.URL.createObjectURL(blob)
        window.open(url)
    })
  }

  deletefile(data:any){
    this.http.request('delete', `http://localhost:5500/Cv/${data[0].id}`, {
      body: {
        filename: data[0].name
      }
    }).subscribe(res => {
      if(res){
        window.location.reload()
      }
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    
    this.http.get(`http://localhost:5500/getUsersById/${this.id}`).subscribe(res => {
      this.userData = res
      this.firstName = this.userData.firstName
      this.lastName = this.userData.lastName

      if(this.userData !== null){
        this.http.get(`http://localhost:5500/Cv/user/${this.id}`).subscribe(res => {
          this.filedata = res
          if(this.filedata.length > 0){
              this.load = false  
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

    setTimeout(() => {
      console.log(this.filedata)
    },2000)
  }
}
