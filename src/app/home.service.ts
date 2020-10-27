import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private appSafeUrl = "http://shopsafe-env.eba-fsimzrcy.us-east-2.elasticbeanstalk.com/visitsafe";
  //private appSafeUrl = "http://localhost:5000/visitsafe";

  numOfPeople: string;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  displayCount(location: String, time: String) : Observable<String>{
    return this.http.get<String>(`${this.appSafeUrl}?name-location=${location}&time=${time}`, this.httpOptions)
    .pipe(retry(2),
    catchError(this.handleError))
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
