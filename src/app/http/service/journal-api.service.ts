import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';

var apiUrl = "https://localhost:7193/";

@Injectable({
  providedIn: 'root'
})
export class JournalApiService {
  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.get(apiUrl + url, httpOptions)
      .pipe(map((response: any) => this.ReturnResponseData(response)), catchError(this.handleError));
  }

  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.post(apiUrl + url, model, httpOptions)
      .pipe(map((response: any) => this.ReturnResponseData(response)), catchError(this.handleError));
  }

  put(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.put(apiUrl + url, model, httpOptions)
      .pipe(map((response: any) => this.ReturnResponseData(response)), catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.delete(apiUrl + url, httpOptions)
      .pipe(map((response: any) => this.ReturnResponseData(response)), catchError(this.handleError));
  }

  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
