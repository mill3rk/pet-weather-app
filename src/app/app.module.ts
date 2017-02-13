import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { PetsComponent } from './Pets/Components/pets.component';
import { PetCreateComponent } from './Pets/Components/pet-create.component';
import { PetDetailComponent } from './Pets/Components/pet-detail.component';
import { PetService }         from './Pets/Services/pet.service';
import { ForecastIoService } from './Pets/Services/forecast-io.service';

import { AppRoutesModule }     from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PetsComponent,
    PetCreateComponent,
    PetDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutesModule
  ],
  providers: [
    PetService,
    ForecastIoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
