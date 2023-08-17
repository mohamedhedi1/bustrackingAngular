import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StationService } from '../Services/station.service';

@Component({
  selector: 'app-station-add-edit-component',
  templateUrl: './station-add-edit-component.component.html',
  styleUrls: ['./station-add-edit-component.component.scss']
})
export class StationAddEditComponentComponent {
  stationForm : FormGroup;
  

  constructor(private _fb :FormBuilder, private _stationService : StationService)
  {
    this.stationForm = this._fb.group(
      {
        station : '',
        latitude_position : '',
        longitude_position : ''

      }
    )
  }

  onFormSubmit()
  {
    if(this.stationForm.valid)
    {
      console.log(this.stationForm.value);
      this._stationService.addStation(this.stationForm.value).subscribe(
        {
          next : (val : any) =>
          {
            alert('Station added successfully');

          },
          error: (err : any) => 
          {
            console.error(err);
          }
        }
      )

    }

  }

}
