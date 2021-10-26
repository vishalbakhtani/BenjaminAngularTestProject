import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiCallService {

    constructor(
        private http: HttpClient
    ) {
    }

    get<T>(url: string, operation: string, defaultValue: T): Observable<T> {

        var httpOptions = {
            headers: new HttpHeaders(
                {
                    'Authorization': ''
                }
            )
        };

        return this.http.get<T>(url, httpOptions)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(this.handleError(operation, defaultValue))
            );
    }

    /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            //console.error(error); // log to console instead

            switch (error.status) {
                case 404:
                    console.error(error); // log to console instead
                    break;

                case 403:
                    console.log("You don't have permission to perform this operation.");
                    //alert("You don't have permission to perform this operation.");
                    break;

                case 401:
                    console.log("Unauthorized");
                    break;
            }

            if (error.status >= 500) {
                console.error(error);
                console.error("Development error. Please contact customer support");
                console.log(error.message);
                //alert(error.message);
            }

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
