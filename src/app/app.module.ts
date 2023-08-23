import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CircuitAddEditComponentComponent } from './circuit-add-edit-component/circuit-add-edit-component.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { StationAddEditComponentComponent } from './station-add-edit-component/station-add-edit-component.component';
import {BusAddEditComponentComponent } from './bus-add-edit-component/bus-add-edit-component';
//import {UserAddEditComponentComponent } from './user-add-edit-component/user-add-edit-component';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BusComponent } from './bus/bus.component';
import { StationComponent } from './station/station.component';
import { MapComponent } from './map/map.component';
import { CircuitComponent } from './circuit/circuit.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CircuitUpdateComponent } from './circuit-update/circuit-update.component';
import { BusUpdateComponent } from './bus-update/bus-update';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bus', component: BusComponent },

  { path: 'user', component: UserComponent },
  { path: 'station', component: StationComponent },
  { path: 'map', component: MapComponent },
  { path: 'circuit', component: CircuitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: '**', redirectTo: '' } // Redirect to the home page for any other unknown route
];


@NgModule({
  declarations: [
    AppComponent,
    CircuitAddEditComponentComponent,
    BusAddEditComponentComponent,
    StationAddEditComponentComponent,
  // UserAddEditComponentComponent,

    HomeComponent,
    StationComponent,
    BusComponent,
    UserComponent,
    MapComponent,
    CircuitComponent,
    CircuitUpdateComponent,
    BusUpdateComponent,

   
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }