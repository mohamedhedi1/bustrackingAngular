import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../model/User';
import { Bus } from '../model/Bus';

import { FormBuilder, FormGroup } from '@angular/forms';
import { BusService } from '../Services/bus.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CircuitAddEditComponentComponent } from '../circuit-add-edit-component/circuit-add-edit-component.component';
import { BusAddEditComponentComponent } from '../bus-add-edit-component/bus-add-edit-component';

import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-bus-update',
  templateUrl: './bus-update.html',
  styleUrls: ['./bus-update.scss']
})
export class BusUpdateComponent  implements OnInit{
  users: any[] = [];
  usersSelected : User[]  = [];
  busForm : FormGroup;
  busData : any[] = [];
  userData : any[] = [];

  ngOnInit(): void {
     this.busData = this.dialogData.busData;
     this.userData = this.dialogData.userData;
    console.log("lllllllllllllllllllll");
    console.log('Bus Data:', this.busData);
    console.log('User Data:', this.userData);
    for (const user of this.userData) {
      if (user.bus !== null) {
        this.usersSelected.push(user);
      }
    }
    

  }
  constructor(private _fb :FormBuilder,
     private _busService : BusService,
     private _dialogRef: MatDialogRef<BusAddEditComponentComponent>,
     @Inject(MAT_DIALOG_DATA) public dialogData: any,
     private _coreService : CoreService)
  {
    this.busForm = this._fb.group(
      {
        bus : this.dialogData.busData.bus ,
        user : this.usersSelected

      }
    )
  }



  onUserSelect(user: User, event: any) {
    if (event.target.checked) {
      this.usersSelected.push(user);
    } else {
      const index = this.usersSelected.indexOf(user);
      if (index !== -1) {
        this.usersSelected.splice(index, 1);
      }
    }
    console.log(this.usersSelected);
    this.busForm.controls['user'].setValue(this.usersSelected);

  }


  onFormSubmit()
  {
    if(this.busForm.valid)
    { 
console.log("bus update ici submit")
        this._busService.updateBus(this.busData,this.busForm.value).subscribe(
          {
            next : (val : any) =>
            {
             
              this._coreService.openSnackBar('Bus updated!');
          
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
