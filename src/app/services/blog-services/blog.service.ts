import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Article } from 'app/model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService { 
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Base URL
  baseurl = 'http://cgo-indonesia.azurewebsites.net/wp-json/cgo/';

  constructor(private http: HttpClient) { }
  // GET
  GetArticles(): Observable<Article> {
    return this.http.get<Article>(this.baseurl + 'article/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

   // GET BY ID
  GetArticle(id): Observable<Article> {
    return this.http.get<any>(this.baseurl + `article/id?id=${id}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET CATEGORY
  GetCategory(): Observable<any> {
    return this.http.get<any>(this.baseurl + `category`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
