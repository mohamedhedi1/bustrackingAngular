import { Component, OnInit } from '@angular/core';



import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { CircuitService } from '../Services/circuit.service';
import { MatDialog } from '@angular/material/dialog';
import { CircuitAddEditComponentComponent } from '../circuit-add-edit-component/circuit-add-edit-component.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CircuitUpdateComponent } from '../circuit-update/circuit-update.component';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
})
export class CircuitComponent implements OnInit {
  //table
  displayedColumns: string[] = ['id', 'circuit', 'stations', 'actions'];
  dataSource!: MatTableDataSource<any>;
  listStationAffAndNot : any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

   constructor(private _dialog: MatDialog,
    private _circuitService: CircuitService,
    private _coreService : CoreService
    )
 {}
  ngOnInit(): void {
    this.getCircuitList();
  }

  openAddEditCircuitForm()
  {
    const dialogRef = this._dialog.open(CircuitAddEditComponentComponent);
    dialogRef.afterClosed().subscribe(
      {
        next : (val) => {
          if(val)
          {
            this.getCircuitList();
          }

        }
      }
    )
  }

  getCircuitList() {
    this._circuitService.getCircuitList().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          
          res.forEach((circuit: any) => {
            this._circuitService.getListStationByCircuit(circuit.id).subscribe(
              {
                next: (stations) => {
                  circuit.stations = stations; 
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

  deleteCircuit(id : number)
  {
    this._circuitService.deleteCircuit(id).subscribe(
      {
        next: (res) => 
        {
          
          this._coreService.openSnackBar('Circuit deleted!', 'done');
          this.getCircuitList();
        },
        error : console.log,
      }
    )
  }

  openEditCircuitForm(data: any) {
    console.log(data);
    this._circuitService.getListAffectedAndNotAffected(data.id).subscribe(
      (res) => {
        this.listStationAffAndNot = res;
        const dialogRef = this._dialog.open(CircuitUpdateComponent, {
          data: {
            circuitData: data,
            stationData: this.listStationAffAndNot
          }
        });
  
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getCircuitList();
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
