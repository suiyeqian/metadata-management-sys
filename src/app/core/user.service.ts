import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class UserService implements CanActivate {
    private userUrl = 'http://10.14.1.155:8188/mdms/user/find_user_by_ticket';
    private ticketUrl = 'http://10.14.1.155:8188/mdms/access_ticket';
    ticket: string;
    onceticket: string;
    user: any;
    private headers  ;
    private options ;
    canActivate() {
        if (sessionStorage.getItem('mdms_ticket')) {
            return true;
        } else {
            this.getParam('ticket');
            // alert(sessionStorage.getItem('mdms_ticket'));
            if (!sessionStorage.getItem('mdms_ticket')) {
                return false;
            }
            return true;
        }
    }

    constructor(
        private http: Http
    ) {
    }
    getParam(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            let r = window.location.search.substr(1).match(reg);
            if ( r != null ) {
                this.onceticket = r[2];
            }
            this.getTicket();
    }
    getTicket(): Promise<any> {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-SystemCode' : 'neo_mdms', 'X-Requested-Ticket' : this.onceticket});
        this.options = new RequestOptions({ headers: this.headers});
        this.http.post(this.ticketUrl, null, this.options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
            .then((res) => {
                if (res.success) {
                    this.ticket = res.data.ticket;
                    sessionStorage.setItem('mdms_ticket', res.data.ticket);
                    this.getUser();
                }else {
                    if (res.code === '1004' || res.code === '1005') {
                        sessionStorage.removeItem('mdms_ticket');
                        sessionStorage.removeItem('user');
                        window.location.href = res.data + '/resources/mdms/login.html';
                    }
                }
            });
        return;
    }
    getUser( ): Promise<any> {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-SystemCode' : 'neo_mdms', 'X-Requested-Ticket' : sessionStorage.getItem('mdms_ticket')});
        this.options = new RequestOptions({ headers: this.headers});
        this.http.post(this.userUrl, null, this.options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError)
            .then((res) => {
                this.user.id = res.id;
                this.user.name = res.cnName;
                sessionStorage.setItem('user', JSON.stringify(this.user));
            });
        return;
    }
    private handleError(error: any): Promise<any> {
        console.log(error);
        return Promise.reject(error.message || error);
    }
}
