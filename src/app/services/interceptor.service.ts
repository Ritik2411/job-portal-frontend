import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('TKN')
      }
    })

    return next.handle(tokenizedReq)
  }
}
