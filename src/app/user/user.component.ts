import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//partie table 
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

   //table
   displayedColumns: string[] = ['id', 'userCode', 'prenom','nom','role','lock','bus','actions'];
   dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _userService: UserService,
    )
 {}



  ngOnInit(): void {
    this.getUserList();
  }


  getUserList()
  {
    this._userService.getStationList().subscribe(
      {
        next : (res) =>
        { console.log(res);
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

  openEditUserForm(data : any)
  {

  }
  deleteUser(id : number)
  {}

}