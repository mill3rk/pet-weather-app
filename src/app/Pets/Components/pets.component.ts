import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pet } from '../Model/pet';
import { PetService } from '../Services/pet.service';

@Component({
  moduleId: module.id,
  selector: 'pets-list',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: Pet[];
  selectedPet: Pet;
  
  constructor(  
      private router: Router,
      private petService: PetService
    ) { }
  
  getAll(): void {
    this.petService.getAll()
      .subscribe(
        // the first argument is a function which runs on success
        data => { this.pets = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('done loading pets')
      );
  }
  
  ngOnInit(): void {
    this.getAll();
  }
  
  gotoDetail(pet: Pet): void {
    this.selectedPet = pet;
    this.router.navigate(['/pets', this.selectedPet.id]);
  }
}
