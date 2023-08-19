import { Component, Inject, OnInit } from '@angular/core';
import { Station } from '../model/Station';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CircuitService } from '../Services/circuit.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CircuitAddEditComponentComponent } from '../circuit-add-edit-component/circuit-add-edit-component.component';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-circuit-update',
  templateUrl: './circuit-update.component.html',
  styleUrls: ['./circuit-update.component.scss']
})
export class CircuitUpdateComponent  implements OnInit{
  stations: any[] = [];
  stationsSelected : Station[]  = [];
  circuitForm : FormGroup;
  circuitData : any[] = [];
  stationData : any[] = [];

  ngOnInit(): void {
     this.circuitData = this.dialogData.circuitData;
     this.stationData = this.dialogData.stationData;
    console.log("lllllllllllllllllllll");
    console.log('Circuit Data:', this.circuitData);
    console.log('Station Data:', this.stationData);
    for (const station of this.stationData) {
      if (station.circuit !== null) {
        this.stationsSelected.push(station);
      }
    }
    

  }
  constructor(private _fb :FormBuilder,
     private _circuitService : CircuitService,
     private _dialogRef: MatDialogRef<CircuitAddEditComponentComponent>,
     @Inject(MAT_DIALOG_DATA) public dialogData: any,
     private _coreService : CoreService)
  {
    this.circuitForm = this._fb.group(
      {
        nom : this.dialogData.circuitData.nom ,
        station : this.dialogData.stationData

      }
    )
  }


  onStationSelect(station: Station, event: any) {
    if (event.target.checked) {
      this.stationsSelected.push(station);
    } else {
      const index = this.stationsSelected.indexOf(station);
      if (index !== -1) {
        this.stationsSelected.splice(index, 1);
      }
    }
    console.log(this.stationsSelected);
  }


  onFormSubmit()
  {
    if(this.circuitForm.valid)
    { 
      
        this._circuitService.updateCircuit(this.circuitData,this.circuitForm.value, this.stationsSelected).subscribe(
          {
            next : (val : any) =>
            {
             
              this._coreService.openSnackBar('Circuit updated!');
          
              this._dialogRef.close(true);
  
            },
            error: (err : any) => 
            {
              console.error(err);
            }
          }
        );

      

  }
  }
}
