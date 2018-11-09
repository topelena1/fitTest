import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailEventsSearchService {
  constructor(private http: HttpClient) {}

  search(email: string, date: string): Observable<any> {
    return this.http
      .get(
        `https://staging.fitpass.mx/api/v4/analytics/events/api?olena=true&date=${date}&type=email&uid=${email}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    return observableThrowError(res.error || 'Server error');
  }
}
