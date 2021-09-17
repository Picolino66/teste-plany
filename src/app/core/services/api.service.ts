import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(environment.apiUrl + path, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      environment.apiUrl + path,
      JSON.stringify(body)
    );
  }

  post(path: string, body: Object = {}, isMultipart = false): Observable<any> {

    var params = new HttpParams();
    if (isMultipart) {
      params = params.append('isMultpart', 'true');

      return this.http.post(
        environment.apiUrl + path, body, { params: params });
    }
    else
      return this.http.post(
        environment.apiUrl + path,
        JSON.stringify(body));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      environment.apiUrl + path
    );
  }
}
