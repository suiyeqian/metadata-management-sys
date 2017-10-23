import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendService {
  // private baseUrl = 'http://10.17.2.26:8190/' + 'mdms/';
  private baseUrl = '/mdms/';
    private loginUrl = 'http://10.17.2.26:8188/bdportal/resources/mdms/login.html';
  // private loginUrl = 'http://data.xiaoniu66.com/bdportal/resources/mdms/login.html';
  jsonHeaders = new Headers({
    'Content-Type': 'application/json',
    'X-Requested-SystemCode' : 'neo_mdms',
    'X-Requested-Ticket': localStorage.getItem('mdms_ticket')
  });
  jsonOption = new RequestOptions({ headers: this.jsonHeaders});


  constructor(private http: Http) {
  }

  getAll(url: string ): Promise<any> {
    return this.http.get(this.baseUrl + url, this.jsonOption)
               .toPromise()
               .then(response => {
                 if (response.json().code === 1004 || response.json().code === 1005) {
                     localStorage.clear();
                     window.location.href = this.loginUrl;
                     return;
                 }
                 return response.json().data;
               })
               .catch(this.handleError);
  }

  getItemsByJsonParams(url: string, params): Promise<any> {
    return this.http.post(this.baseUrl + url, JSON.stringify(params), this.jsonOption)
           .toPromise()
           .then(response => {
             if (response.json().code === 1004 || response.json().code === 1005) {
                 localStorage.clear();
                 window.location.href = this.loginUrl;
                 return;
             }
             return response.json().data;
           })
           .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    if (error.json().message === '登录已过期！请重新登录!') {
      localStorage.clear();
      // window.location.href = 'http://10.14.1.155:8082/bdportal/resources/mdms/login.html';
    }
    return Promise.reject(error.message || error);
  }
}
