import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    public pet: Pet;
    public breeds: Breed[];
    public types: Type[];
    public errorMessage: string;
    
    constructor(
        private petService: PetService,
        private route: ActivatedRoute,
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
        console.log('pet', pet);
        console.log('isValid', isValid);
        
        this.petService
            .create(pet)
            .subscribe(
                (resp) => {
                    console.log(resp);
                },
                // the second argument is a function which runs on error
                err => {
                    console.error('error', err);
                },
                // the third argument is a function which runs on completion
                () => console.log('done loading')
            );
    }
}
