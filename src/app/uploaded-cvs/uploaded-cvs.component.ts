import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uploaded-cvs',
  templateUrl: './uploaded-cvs.component.html',
  styleUrls: ['./uploaded-cvs.component.scss']
})
export class UploadedCVsComponent implements OnInit {
  cvData:any
  httpclient:any
  load:boolean = true
  filename:string = null
  copyData:any
  page:number = 1
  totalRecords:string

  constructor(private http:HttpClient, private httpbackend:HttpBackend, private route:ActivatedRoute) {
      this.httpclient = new HttpClient(httpbackend)
  }

  searchFilename(event){
    this.filename = event.target.value
    const newData = this.cvData.filter(data => data.name.toLowerCase().includes(this.filename.toLowerCase()))
    this.copyData = newData
  }

  clearSearch(){
    this.filename = ""
    this.copyData = this.cvData
  }

  download(data,type){
    this.http.get(`http://localhost:5500/Cv/${data}`, {responseType: 'blob'}).subscribe((res:Blob) => {
      const blob = new Blob([res], { type: type });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
    },(error)=> {
      if(error.status === 500){
        alert("Sorry could not the requested file.")
      }
      if(error.status === 401){
        alert("File size must be less than 900 KB and must be a PDF document.")
      }
    })
  }

  deletecv(id,fname){
    const confirm = window.confirm("Delete this document?")

    if(confirm){
      this.http.request('delete',`http://localhost:5500/Cv/${id}`, { 
        body:{
          filename: fname
        } 
      }).subscribe(res => {
        if(res){
          alert("Deleted Successfully")
          window.location.reload()
        }
      })
    }
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:5500/Cv/user/${this.route.snapshot.paramMap.get('id')}`).subscribe(res=>{
      this.cvData = res
      if(this.cvData.length > 0){
        this.copyData = this.cvData
        this.totalRecords = this.cvData.length
        this.load = false
      }
      else{
        this.load = false
      }
    })
    
    setTimeout(()=>{
      console.log(this.cvData)
    },2000)
  }

}
