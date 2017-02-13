import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { PetService } from '../Services/pet.service';
import { Pet } from '../Model/pet';

import { ForecastIoService } from '../Services/forecast-io.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Component({
  moduleId: module.id,
  selector: 'pet-detail',
  templateUrl: './pet-detail.component.html',
})
export class PetDetailComponent implements OnInit {
    @Input() pet: Pet
    
    constructor(
        private petService: PetService,
        private forecastIoService: ForecastIoService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.petService.getById(+params['id']))
              .subscribe(
                data => {
                    this.pet = data;
                    this.forecastIoService.getForecastByLngLat(this.pet.longitude, this.pet.latitude)
                        .subscribe(forecast => {
                            this.pet = data;
                            //check if its going to rain or if it's raining currently
                            this.pet.needsUmbrella = (forecast.currently.precipProbability >= 7 || forecast.currently.precipIntensity > 0);
                            console.log(forecast);
                        }
                    )
                },
                err => console.error(err),
                () => console.log('done loading pet')
              );
    }
    
    goBack(): void {
        this.location.back();
    }
}
