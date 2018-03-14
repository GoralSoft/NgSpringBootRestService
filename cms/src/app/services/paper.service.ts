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
export class PaperService {
  papersUrl = 'http://localhost:9090/model';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PaperService');
  }

  /** GET papers from the server */
  getPapers (): Observable<any> {
    return this.http.get(this.papersUrl+'/getPapers')
      .pipe(
        catchError(this.handleError('getPapers', []))
      );
  }

  /* GET papers whose name contains search term */
  searchPapers(term: string): Observable<any> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<any>(this.papersUrl, options)
      .pipe(
        catchError(this.handleError<any>('searchPapers', []))
      );
  }

  /** Select: select a paper from the server */
  selectPaper (id: string): Observable<any> {
    const url = `${this.papersUrl}/getPaper/${id}`; 
    console.log('Select paper..... '+url)
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError('selectPaper'))
      );
  }

  //////// Save methods //////////

  /** POST: add a new paper to the database */
  addPaper (paper: any): Observable<any> {
    //console.log('inside addPaper....'+JSON.stringify(paper));    
    const url = `${this.papersUrl}/savePaper`;
    //console.log(url);
    return this.http.post(url, 
    JSON.stringify(paper), httpOptions)
      .pipe(
        catchError(this.handleError('addPaper', paper))
      );
  }

  /** DELETE: delete the paper from the server */
  deletePaper (id: string): Observable<{}> {
    
    const url = `${this.papersUrl}/deletePaper/${id}`; // DELETE api/heroes/42
    console.log('inside deletePaper....'+url);
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deletePaper'))
      );
  }

  /** PUT: update the paper name on the server. Returns the updated paper upon success. */
  updatePaper (paper: any): Observable<any> {
   // httpOptions.headers =
   //   httpOptions.headers.set('Authorization', 'my-new-auth-token');
   const url=`${this.papersUrl}/updatePaper/${paper.papercode}`;
    console.log('inside updatePaper....'+url);
    //console.log(JSON.stringify(paper));
    return this.http.put(url, JSON.stringify(paper), httpOptions)
      .pipe(
        catchError(this.handleError('updatePaper', paper))
      );
  }
}

