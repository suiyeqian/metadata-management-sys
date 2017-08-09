import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendService {
  private baseUrl = 'http://10.17.2.26:8190/' + 'mdms/';
  // private baseUrl = 'http://xn071213-nb.xiaoniu.com:8088/';
  // private baseUrl = 'http://10.14.1.155:8188/mdms/';
  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
  options = new RequestOptions({ headers: this.headers});
  jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
  jsonOption = new RequestOptions({ headers: this.jsonHeaders});


  constructor(private http: Http) {}

  getAll(url: string ): Promise<any> {
    return this.http.get(this.baseUrl + url)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getItemsByParams(url: string, params): Promise<any> {
    return this.http.post(this.baseUrl + url, params, this.options)
           .toPromise()
           .then(response => response.json().data)
           .catch(this.handleError);
  }

  getItemsByJsonParams(url: string, params): Promise<any> {
    return this.http.post(this.baseUrl + url, JSON.stringify(params), this.jsonOption)
           .toPromise()
           .then(response => response.json().data)
           .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
