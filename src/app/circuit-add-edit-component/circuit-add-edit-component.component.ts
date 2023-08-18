import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from '../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CircuitService } from '../Services/circuit.service';


@Component({
  selector: 'app-circuit-add-edit-component',
  templateUrl: './circuit-add-edit-component.component.html',
  styleUrls: ['./circuit-add-edit-component.component.scss']
})
export class CircuitAddEditComponentComponent  implements OnInit {

  circuitForm : FormGroup;
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

  ngOnInit(): void {
    this.circuitForm.patchValue(this.data);
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

      }else{
          console.log(this.circuitForm.value);
      this._circuitService.addCircuit(this.circuitForm.value).subscribe(
        {
          next : (val : any) =>
          {
            this._coreService.openSnackBar('Circuit added successfully');
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
