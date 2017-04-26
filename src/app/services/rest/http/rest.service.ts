import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//import { Configuration } from '../app.constants';

@Injectable()
export class RestService {
    public serverHTTPApi = "http://127.0.0.1/api/";

    private headers: Headers;

    // cache data
    public lastGetAll: Array<any>;
    public lastGet: any;

    constructor(
        private http: Http,
        //private config: Configuration
    )
    {

        //this.serverHTTPApi = this.config.serverHTTPApi;
        this.serverHTTPApi = this.addTrailingSlash(this.serverHTTPApi);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    // HELPERS
    public getAllFromLS(sApiRequest, maxtime = 0): Array<any> {
      let json = localStorage.getItem( 'rest_all_' + sApiRequest );
      if ( json ) {
        let obj = JSON.parse(json);
        if ( obj && (obj.date < (Date.now() - maxtime) ) ) {
          return obj;
        }
      }
    }


    public getFromCache(id): any {
      if (this.lastGetAll) {
        return this.lastGetAll.find((unit) => unit.id === id);
      } else {
        return null;
      }
    }


    // REST functions
    public getAll(sApiRequest): Observable<any[]> {

        return this.http.get(this.serverHTTPApi)
            .map((response: Response) => {
              // getting an array having the same name as the model
              let data = response.json()[sApiRequest];
              // transforming the array from indexed to associative
              let tab = data.records.map((elem) => {
                let unit = {};
                // using the columns order and number to rebuild the object
                data.columns.forEach( (champ, index) => {
                  unit[champ] = elem[index];
                });
                return unit;
              });
              this.lastGetAll = tab;
              let obj = {
                data: tab,
                date: Date.now()
              };
              localStorage.setItem( 'rest_all_' + sApiRequest, JSON.stringify(obj) );
              return tab;
            })
            .catch(this.handleError);
    }

    public get(sApiRequest, id: any): Observable<any> {
        sApiRequest = this.addTrailingSlash(this.serverHTTPApi+sApiRequest);
        return this.http.get(sApiRequest + id)
            .map((response: Response) => {
              let data = response.json();
              this.lastGet = data;
              return data;
            })
            .catch(this.handleError);
    }

    public postAsync (sApiRequest, postData: any){
        sApiRequest = this.addTrailingSlash(this.serverHTTPApi+sApiRequest);
        var headers = new Headers();

        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
            this.http.post(sApiRequest, postData, {headers: headers}).subscribe((data) => {
                    resolve(data.json());
                }
            );
        });
    }

    public add(sApiRequest, item: any): Observable<number> {
        sApiRequest = this.addTrailingSlash(this.serverHTTPApi+sApiRequest);
        let toAdd = JSON.stringify(item);

        return this.http.post(sApiRequest, toAdd, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public addAll(sApiRequest, tab: Array<any>): Observable<Array<number>> {
      sApiRequest = this.addTrailingSlash(this.serverHTTPApi+sApiRequest);
      let toAdd = JSON.stringify(tab);

      return this.http.post(sApiRequest, toAdd, { headers: this.headers })
          .map((response: Response) => response.json())
          .catch(this.handleError);
    }

    public update(sApiRequest, id: number, itemToUpdate: any): Observable<number> {
        sApiRequest = this.addTrailingSlash(this.serverHTTPApi+sApiRequest);

        return this.http.put(sApiRequest+id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public delete(sApiRequest, id: number): Observable<Response> {
        sApiRequest = this.addTrailingSlash(this.serverHTTPApi+sApiRequest);
        return this.http.delete(sApiRequest + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public addTrailingSlash(url){
        var lastChar = url.substr(-1); // Selects the last character
        if (lastChar != '/') {         // If the last character is not a slash
            url = url + '/';            // Append a slash to it.
        }
        return url;
    }

}
