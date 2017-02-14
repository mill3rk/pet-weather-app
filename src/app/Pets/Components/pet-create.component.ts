import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Response } from '@angular/http';

import { PetService } from '../Services/pet.service';
import { Pet } from '../Interfaces/pet.interface';
import { Breed } from '../Model/breed';
import { Type } from '../Model/type';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Component({
  moduleId: module.id,
  selector: 'pet-create',
  templateUrl: './pet-create.component.html',
})
export class PetCreateComponent implements OnInit {
    pet: Pet;
    breeds: Breed[];
    types: Type[];
    errorMessage: string;
    
    constructor(
        private petService: PetService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}
    
    ngOnInit(): void {
        this.petService.getTypes()
            .subscribe(
                // the first argument is a function which runs on success
                (types: Type[]) => {
                    this.petService.getBreeds()
                        .subscribe((breeds: Breed[]) => {
                            this.types = types;
                            this.breeds = breeds;
                        }
                    )
                },
                // the second argument is a function which runs on error
                err => {
                    console.error('error', err);
                },
                // the third argument is a function which runs on completion
                () => console.log('done loading')
            );
    }
    
    goBack(): void {
        this.location.back();
    }
    
    save(pet: Pet, isValid: boolean) {
        if (!isValid) {
            this.errorMessage = 'Please finish filling out the form!';
            return;
        }
        
        this.petService
            .create(pet)
            .subscribe(
                (resp) => {
                    console.log(resp);
                    this.router.navigate(['/pets']);
                },
                // the second argument is a function which runs on error
                (err) => {
                    let errorTemp = err.json();
                    this.errorMessage = errorTemp.message.substring(errorTemp.message.lastIndexOf("[")+1, errorTemp.message.lastIndexOf("]"));
                    console.error('error', errorTemp);
                },
                // the third argument is a function which runs on completion
                () => console.log('done loading')
            );
    }
}
