import { Injectable } from "@angular/core";
import { Post } from "./posts.model";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  savePost(post: Post) {
    // Send Http request
    return this.http.post<{ name: string }>(
      'https://ng-guide-udemy-7358f-default-rtdb.firebaseio.com/posts.json',
      post,
      {
        observe: 'response'
      }
    )
    .pipe(
      catchError(errorResponse => {
        // e.g. Send to analytics server
        this.error.next(errorResponse.message);

        return throwError(errorResponse);
      })
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>(
      'https://ng-guide-udemy-7358f-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({
          'Custom-Header': "Hello World!"
        }),
        params: searchParams,
        responseType: 'json' // json = default | text => would return the json as a text to be parsed later (aall of this based on the API endpoint response)
      }
    )
      .pipe(
        map(data => {
          const array: Post[] = [];
          for (const key in data) {
            array.push({ ...data[key], id: key });
          }
          return array;
        }),
        catchError(errorResponse => {
          // e.g. Send to analytics server
          this.error.next(errorResponse.message);

          return throwError(errorResponse);
        })
      );
  }

  clearPosts() {
    return this.http.delete(
      'https://ng-guide-udemy-7358f-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    ).pipe(
      tap(event => {
        console.log(event);
        
        if (event.type == HttpEventType.Sent) {
          console.log('Request sent...');          
        }

        if (event.type == HttpEventType.Response) {
          console.log("Response Body: ", event.body);          
        }
      })
    );
  }
}