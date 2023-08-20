import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//partie table 
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StationService } from '../Services/station.service';
import { CoreService } from '../core/core.service';
import { UserAddEditComponentComponent } from '../user-add-edit-component/user-add-edit-component';
import { BusAddEditComponentComponent } from '../bus-add-edit-component/bus-add-edit-component';

import { StationAddEditComponentComponent } from '../station-add-edit-component/station-add-edit-component.component';
import { CircuitAddEditComponentComponent } from '../circuit-add-edit-component/circuit-add-edit-component.component';


import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  implements OnInit{
   //table
   displayedColumns: string[] = ['id', 'userCode','nom','prenom','bus','actions'];
   dataSource!: MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
 
   constructor(private _dialog: MatDialog,
      private _userService: UserService,
      private _coreService : CoreService
      )
   {}

   ngOnInit(): void {
    this.getUserList();
  }
  
  openAddEditUserForm()
  {
    const dialogRef = this._dialog.open(UserAddEditComponentComponent);
    dialogRef.afterClosed().subscribe(
      {
        next : (val) => {
          if(val)
          {
            this.getUserList();
          }

        }
      }
    )
  }
  getUserList()
  {
    this._userService.getUserList().subscribe(
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

  deleteUser(id : number)
  {
    this._userService.deleteUser(id).subscribe(
      {
        next: (res) => 
        {
          
          this._coreService.openSnackBar('User deleted!', 'done');
          this.getUserList();
        },
        error : console.log,
      }
    )
  }

  openEditUserForm(data : any)
  {
    const dialogRef = this._dialog.open(UserAddEditComponentComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(
      {
        next : (val) => {
          if(val)
          {
            this.getUserList();
          }

        }
      }
    )

    
   
  }

}
