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
  GetArticles(search?,page?,size?): Observable<Array<Article>> {

    if(search != null){
      var result = this.http.get<Array<Article>>(this.baseurl + `article?search=${search}`)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }else if(page != null && size != null){
      var result = this.http.get<Array<Article>>(this.baseurl + `article?page=${page}&size=${size}`)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }
    else{
      var result = this.http.get<Array<Article>>(this.baseurl + 'article/')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }
    return result;
  }

  
   // GET BY ID
  GetArticle(id): Observable<Article> {
    return this.http.get<any>(this.baseurl + `article/id?id=${id}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

    // GET BY CATEGORYID
    GetArticleByCategorys(category_id): Observable<Array<Article>> {
      return this.http.get<any>(this.baseurl + `article/category_id?category_ids=${category_id}`)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }

  // GET CATEGORY
  GetCategory(page,size): Observable<any> {
    return this.http.get<any>(this.baseurl + `category?page=${page}` + `&size=${size}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  // GET USER BY USERNAME
  GetUser(username): Observable<any> {
    return this.http.get<any>(this.baseurl + `users/username?username=${username}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET CATEGORY BY IDS
  GetCategoryByIds(ids): Observable<any> {
    return this.http.get<any>(this.baseurl + `category/id?id=${ids}`)
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
