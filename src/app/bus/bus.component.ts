import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//partie table 
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../Services/user.service';
import { CoreService } from '../core/core.service';
//import { BusAddEditComponentComponent } from '../bus-add-edit-component/bus-add-edit-component.component';
import { BusAddEditComponentComponent } from '../bus-add-edit-component/bus-add-edit-component';
import { StationAddEditComponentComponent } from '../station-add-edit-component/station-add-edit-component.component';
import { CircuitAddEditComponentComponent } from '../circuit-add-edit-component/circuit-add-edit-component.component';
import { BusUpdateComponent } from '../bus-update/bus-update';
import { BusService } from '../Services/bus.service';


@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent  implements OnInit{
   //table
   displayedColumns: string[] = ['id', 'bus','circuit','users','actions'];
   dataSource!: MatTableDataSource<any>;
   listUsers : any[] = [];

 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
 
   constructor(private _dialog: MatDialog,
      private _busService: BusService,
      private _userService: UserService,
      private _coreService : CoreService
      )
   {}

   ngOnInit(): void {
    this.getBusList();
  }
  
  openAddEditBusForm()
  {
    const dialogRef = this._dialog.open(BusAddEditComponentComponent);
    dialogRef.afterClosed().subscribe(
      {
        next : (val) => {
          if(val)
          {
            this.getBusList();
          }

        }
      }
    )
  }
  getBusList()
  {
    this._busService.getBusList().subscribe(
      {
        next : (res) => 
        {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          res.forEach((bus: any) => {
            this._busService.getListUsersByBus(bus.id).subscribe(
              {
                next: (users) => {
                  bus.users = users; 
                },
                error: (err) => {
                  console.log(err);
                }
              }
            );
          });
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBus(id : number)
  {
    this._busService.deleteBus(id).subscribe(
      {
        next: (res) => 
        {
          this._coreService.openSnackBar('Bus deleted!', 'done');
          this.getBusList();
        },
        error : console.log,
      }
    )
  }

  openEditBusForm(data: any) {
    console.log(data);
    this._userService.getUserListAffectedAndNotAffected(data["id"]).subscribe(
      (res) => {
        this.listUsers = res;
        const dialogRef = this._dialog.open(BusUpdateComponent, {
          data: {
            busData: data,
            userData: this.listUsers
          }
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getBusList();
            }
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }



}
