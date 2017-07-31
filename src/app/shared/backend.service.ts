import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendService {
  private baseUrl = 'http://10.17.2.26:8188';

  constructor(private http: Http) {}

  getAll(url,type: string = 'get'): Promise<any> {
    if(type == 'post'){
      return this.http.post(this.baseUrl, { userId:'test' })
             .toPromise()
             .then(response => response.json().data)
             .catch(this.handleError);
    }else{
      return this.http.get(this.baseUrl + url)
                 .toPromise()
                 .then(response => response.json().data)
                 .catch(this.handleError);
    }
  }



  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
