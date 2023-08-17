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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //table
  displayedColumns: string[] = ['id', 'station', 'latitude', 'longitude','circuit','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
     private _stationService: StationService)
  {}

  ngOnInit(): void {
    this.getStationList();
  }


  openAddEditCircuitForm()
  {
    this._dialog.open(CircuitAddEditComponentComponent);
  }
  openAddEditStationForm()
  {
    this._dialog.open(StationAddEditComponentComponent);
  }
  getStationList()
  {
    this._stationService.getStationList().subscribe(
      {
        next : (res) => 
        {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        },
        error: (err) => 
        {
          console.log(err);
        }
      }
    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStation(id : number)
  {
    this._stationService.deleteStation(id).subscribe(
      {
        next: (res) => 
        {
          alert('Station deleted!');

        },
        error : console.log,
      }
    )
  }

}
