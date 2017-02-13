import { Component, OnInit } from '@angular/core';

import { Pet } from '../Pets/Model/pet';
import { PetService } from '../Pets/Services/pet.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  pets: Pet[];
  
  constructor(private petService: PetService) { }
  
  ngOnInit(): void {
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
}
