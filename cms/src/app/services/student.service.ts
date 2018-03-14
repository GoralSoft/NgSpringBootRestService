import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class StudentService {

  studentsUrl = 'http://localhost:9090/student';  // URL to web api
  private handleError: HandleError;

  
  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('StudentService');
  }

  /** GET Students from the server */
  getStudents (): Observable<any> {
    return this.http.get(this.studentsUrl+'/getStudents')
      .pipe(
        catchError(this.handleError('getStudents', []))
      );
  }

  selectStudent (regno: string): Observable<any> {
    const url = `${this.studentsUrl}/getPaper/${regno}`; 
    console.log('Select student..... '+url)
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError('selectStudent'))
      );
  }

  addStudent (student: any): Observable<any> {
    console.log('inside addPaper....'+JSON.stringify(student));    
    const url = `${this.studentsUrl}/saveStudent`;
    console.log(url);
    return this.http.post(url, JSON.stringify(student), httpOptions)
      .pipe(
        catchError(this.handleError('saveStudent', student))
      );
  }

  /** DELETE: delete the paper from the server */
  deleteStudent (regno: string): Observable<{}> {
    
    const url = `${this.studentsUrl}/deleteStudent/${regno}`; // DELETE api/heroes/42
    console.log('inside deleteStudent....'+url);
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteStudent'))
      );
  }

  /** PUT: update the paper name on the server. Returns the updated paper upon success. */
  updateStudent (student: any): Observable<any> {
   // httpOptions.headers =
   //   httpOptions.headers.set('Authorization', 'my-new-auth-token');
   console.log(JSON.stringify(student));
   const url=`${this.studentsUrl}/updateStudent/${student.regno}`;
    console.log('inside updateStudent....'+url);
    //console.log(JSON.stringify(paper));
    return this.http.put(url, JSON.stringify(student), httpOptions)
      .pipe(
        catchError(this.handleError('updateStudent', student))
      );
  }
}
