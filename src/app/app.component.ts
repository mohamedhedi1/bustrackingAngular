import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CircuitAddEditComponentComponent } from './circuit-add-edit-component/circuit-add-edit-component.component';
import { StationAddEditComponentComponent } from './station-add-edit-component/station-add-edit-component.component';
import { StationService } from './Services/station.service';
//partie table 
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
}
