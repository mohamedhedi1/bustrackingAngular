import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StationService } from '../Services/station.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-station-add-edit-component',
  templateUrl: './station-add-edit-component.component.html',
  styleUrls: ['./station-add-edit-component.component.scss']
})
export class StationAddEditComponentComponent implements OnInit  {
  stationForm : FormGroup;
  

  constructor(private _fb :FormBuilder,
     private _stationService : StationService,
     private _dialogRef: MatDialogRef<StationAddEditComponentComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService : CoreService)
  {
    this.stationForm = this._fb.group(
      {
        station : '',
        latitude_position : '',
        longitude_position : ''

      }
    )
  }
  ngOnInit(): void {
    this.stationForm.patchValue(this.data);
   
  }

  onFormSubmit()
  {
    if(this.stationForm.valid)
    {
      if(this.data)
      {
        this._stationService.updateStation(this.data.id ,this.stationForm.value).subscribe(
          {
            next : (val : any) =>
            {
             
              this._coreService.openSnackBar('Station updated!');
          
              this._dialogRef.close(true);
  
            },
            error: (err : any) => 
            {
              console.error(err);
            }
          }
        );

      }else{
          console.log(this.stationForm.value);
      this._stationService.addStation(this.stationForm.value).subscribe(
        {
          next : (val : any) =>
          {
            this._coreService.openSnackBar('Station added successfully');
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

}
