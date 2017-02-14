import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Pet } from '../Model/pet';
import { Pet as PetInterface } from '../Interfaces/pet.interface';
import { Breed } from '../Model/breed';
import { Type } from '../Model/type';

import { environment } from '../../../environments/environment';

@Injectable()
export class PetService {
    private baseUrl: string = environment.apiUrl;
    
    constructor(private http : Http){}
    
    getAll(): Observable<Pet[]> {
        return this.http
            .get(`${this.baseUrl}/pets`, {headers: this.getHeaders()})
            .map((resp:Response) => resp.json())
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Pet[]>([]);
            });
    }
    
    getById(id: number): Observable<Pet> {
        return this.http
            .get(`${this.baseUrl}/pets/${id}`, {headers: this.getHeaders()})
            .map((res:Response) => res.json());
    }
    
    create(pet: PetInterface): Observable<Pet> {
        return this.http
            .post(`${this.baseUrl}/pets`, pet, {headers: this.getHeaders()})
            .map((res:Response) => res.json());
    }
    
    getTypes(): Observable<Type[]> {
        return this.http
            .get(`${this.baseUrl}/types`, {headers: this.getHeaders()})
            .map((resp:Response) => resp.json())
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Type[]>([]);
            });
    }
    
    getBreeds(): Observable<Breed[]> {
        return this.http
            .get(`${this.baseUrl}/breeds`, {headers: this.getHeaders()})
            .map((resp:Response) => resp.json())
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Breed[]>([]);
            });
    }
    
    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}
