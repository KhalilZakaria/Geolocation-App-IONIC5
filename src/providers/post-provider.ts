import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {

    //le lien du serveur
    server : string  = '.\.\'
   
    constructor(public http: Http) {
 //185.27.134.11
    }

    postData(body, file){
        let type = 'application/json; charset=utf_8';
        let headers = new Headers({ 'Content-Type': type,
    "Accept":'applicatiton/json'
    });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.server + file, JSON.stringify(body), options)
        .map(res => res.json());
    }
}
