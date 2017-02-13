import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './Dashboard/dashboard.component';
import { PetsComponent } from './Pets/Components/pets.component';
import { PetDetailComponent } from './Pets/Components/pet-detail.component';
import { PetCreateComponent } from './Pets/Components/pet-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'pets/create', component: PetCreateComponent },
  { path: 'pets/:id', component: PetDetailComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutesModule {}
