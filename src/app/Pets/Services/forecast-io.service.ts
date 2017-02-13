import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp} from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class ForecastIoService {
    private baseUrl: string = 'https://api.darksky.net/forecast';
    private secretKey: string = '4a16173d176ce4dc83a024c83fcae8fb';
    private times: number = 0;
    
    constructor(private jsonp : Jsonp){
        this.times = 0;
    }
    
    getForecastByLngLat(longitude: string, latitude: string) {
        return this.jsonp
            .get(
                `${this.baseUrl}/${this.secretKey}/${longitude},${latitude}?callback=JSONP_CALLBACK`,
                {headers: this.getHeaders()}
            )
            .map((resp:Response) => {
                return resp.json()
            });
    }
    
    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}
