import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//partie table 
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StationService } from '../Services/station.service';
import { CoreService } from '../core/core.service';
import { StationAddEditComponentComponent } from '../station-add-edit-component/station-add-edit-component.component';


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent  implements OnInit{
   //table
   displayedColumns: string[] = ['id', 'station', 'latitude', 'longitude','circuit','actions'];
   dataSource!: MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
 
   constructor(private _dialog: MatDialog,
      private _stationService: StationService,
      private _coreService : CoreService
      )
   {}

   ngOnInit(): void {
    this.getStationList();
  }
  
  openAddEditStationForm()
  {
    const dialogRef = this._dialog.open(StationAddEditComponentComponent);
    dialogRef.afterClosed().subscribe(
      {
        next : (val) => {
          if(val)
          {
            this.getStationList();
          }

        }
      }
    )
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
          
          this._coreService.openSnackBar('Station deleted!', 'done');
          this.getStationList();
        },
        error : console.log,
      }
    )
  }

  openEditStationForm(data : any)
  {
    const dialogRef = this._dialog.open(StationAddEditComponentComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(
      {
        next : (val) => {
          if(val)
          {
            this.getStationList();
          }

        }
      }
    )

    
   
  }



}
