import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../model/User';
import { Circuit } from '../model/Circuit';

import { Bus } from '../model/Bus';

import { FormBuilder, FormGroup } from '@angular/forms';
import { BusService } from '../Services/bus.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CircuitAddEditComponentComponent } from '../circuit-add-edit-component/circuit-add-edit-component.component';
import { BusAddEditComponentComponent } from '../bus-add-edit-component/bus-add-edit-component';

import { CoreService } from '../core/core.service';
import { UserService } from '../Services/user.service';
import { CircuitService } from '../Services/circuit.service';


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
  circuitData: any[] = [];
  circuits: any;
  selectedCircuit: any;
  alert : string = "";


  loadCircuit()
  {
    this._circuitService.getCircuitsListNotAffectedAndAffected( this.dialogData.busData.id).subscribe(
      {
        next : (res) =>
        {
          this.circuits = res;
          console.log(this.circuits);
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }

  ngOnInit(): void {
     this.busData = this.dialogData.busData;
     this.userData = this.dialogData.userData;
     this.circuitData=this.dialogData.circuitData;
    console.log('Bus Data:', this.busData);
    console.log('User Data:', this.userData);
    console.log('Circuit Data:', this.circuitData);
    this.loadCircuit();
    
    for (const user of this.userData) {
      if (user.bus !== null) {
        this.usersSelected.push(user);
      }
    }
    if (this.circuits.length > 0) {
      this.selectedCircuit = this.circuits[0]; 
    }

  }
  constructor(private _fb :FormBuilder,
    private _circuitService : CircuitService,
     private _busService : BusService,
     private _userService: UserService,
     private _dialogRef: MatDialogRef<BusUpdateComponent>,
     @Inject(MAT_DIALOG_DATA) public dialogData: any,
     private _coreService : CoreService)
  {
    this.busForm = this._fb.group(
      {
        bus : this.dialogData.busData.bus ,
        user : this.usersSelected,
        circuit: this.selectedCircuit

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
 


  onFormSubmit() {
    if (this.busForm.valid) {
      console.log("bus update ici submit");
      this.alert="Choose circuit!"
      
      
      this._busService.updateBus(this.busData, this.busForm.value, []).subscribe(
        (val: any) => {
         
          this._busService.affectCircuitToBus(val,this.busForm.value).subscribe(
            (response: any) => {},
            (error: any) => { console.error(error);}
          );
          
          for (const item of this.usersSelected) {
           
            this._userService.affectUsersToBus(val, item["id"]).subscribe(
              (response: any) => {
                console.log(response);
              },
              (error: any) => {
                console.error(error);
                this._coreService.openSnackBar('Error occurred while adding users to bus');
              }
            );
          }
          this.busForm.controls['circuit'].setValue(this.selectedCircuit);

          
          this._coreService.openSnackBar('Bus updated!');
          this._dialogRef.close(true);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  
}