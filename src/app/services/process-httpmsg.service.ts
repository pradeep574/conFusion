import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public handleError(error : HttpErrorResponse | any){
    let errMsg : string;
    if(error.error instanceof ErrorEvent){
      errMsg = error.error.message;
    }
    else{
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(errMsg);
  }
}