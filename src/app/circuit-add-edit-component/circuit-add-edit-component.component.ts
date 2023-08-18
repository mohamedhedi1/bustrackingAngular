import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from '../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CircuitService } from '../Services/circuit.service';
import { Station } from '../model/Station';



@Component({
  selector: 'app-circuit-add-edit-component',
  templateUrl: './circuit-add-edit-component.component.html',
  styleUrls: ['./circuit-add-edit-component.component.scss']
})
export class CircuitAddEditComponentComponent  implements OnInit {
  stationsSelected : Station[]  = [];
  
  circuitForm : FormGroup;
  stations: any[] = [];
  stationsAffNo : any[] = [];

  constructor(private _fb :FormBuilder,
     private _circuitService : CircuitService,
     private _dialogRef: MatDialogRef<CircuitAddEditComponentComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService : CoreService)
  {
    this.circuitForm = this._fb.group(
      {
        nom : '',
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
  
  

  ngOnInit(): void {
    this.circuitForm.patchValue(this.data);
    this.loadStations();
  }

  loadStations() {
    this._circuitService.getListStationNotAffected().subscribe(
      {
        next: (res) => {
          this.stations = res; 
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
    console.log(this.stationsSelected);
  }

  onFormSubmit()
  {
    if(this.circuitForm.valid)
    { 
      if(this.data)
      {
        this._circuitService.updateCircuit(this.data.id ,this.circuitForm.value).subscribe(
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
      else{
        console.log('le formulaaire ')
          console.log(this.circuitForm.value);
      this._circuitService.addCircuit(this.circuitForm.value,this.stationsSelected).subscribe(
        { 
          next : (val : any) =>
          {
            this._coreService.openSnackBar('Circuit added successfully');
            this._dialogRef.close(true);

          },
          error: (err : any) => 
          {
            this._coreService.openSnackBar('Circuit added successfully');
            this._dialogRef.close(true);
            console.error(err);
          }
        }
      );

      }
    

    }

  }

  

}
