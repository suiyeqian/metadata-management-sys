import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OverviewService {
  // private userCntUrl = 'http://xn071213-nb.xiaoniu.com:8088/mdms/servicesoverview/findUsrCntByAppCde';
  private userCntUrl = 'api/datas';
  private companyUrl = 'api/company';
  private platAbilityUrl = 'api/platAbility';

  constructor(private http: Http) {}

  getUsrCnt(): Promise<any> {
    return this.http.get(this.userCntUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getCompony(): Promise<any> {
    return this.http.get(this.companyUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getPlatAbility(): Promise<any> {
    return this.http.get(this.platAbilityUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
