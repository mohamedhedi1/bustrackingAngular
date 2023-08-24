import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusService } from '../Services/bus.service';
import { UserService } from '../Services/user.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { CircuitService } from '../Services/circuit.service';




@Component({
  selector: 'app-bus-add-edit-component',
  templateUrl: './bus-add-edit-component.html',
  styleUrls: ['./bus-add-edit-component.scss']
  
})
export class BusAddEditComponentComponent implements OnInit {
  busForm: FormGroup;
  usersSelected : User[]  = [];
  users: any[] = [];
  circuits : any[] = [];
  selectedCircuit: any;


  




  constructor(
    private _circuitService : CircuitService,
    private _fb: FormBuilder,
    private _busService: BusService,
    private _userService: UserService,

    private _dialogRef: MatDialogRef<BusAddEditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private http: HttpClient
  ) {
    this.busForm = this._fb.group({
      bus: '',
      circuit: '',
      users: '',
     
    })
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
  }
  
  

  ngOnInit(): void {
    this.busForm.patchValue(this.data);
    this.loadUsers();
    this.loadCircuit();
    if (this.circuits.length > 0) {
      this.selectedCircuit = this.circuits[0]; // Sélectionnez le premier circuit par défaut
    }
  }

  loadCircuit()
  {
    this._circuitService.getCircuitsListNotAffectedTobus().subscribe(
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


  loadUsers() {
    this._userService.getUserListNotAffected().subscribe(
      {
        next: (res) => {
          this.users = res; 
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
    console.log(this.usersSelected);
  }

  onFormSubmit() {
    
    if (this.busForm.valid) {
      console.log('Formulaire soumis');
      console.log(this.usersSelected);
      console.log(this.busForm.value);
  
      this._busService.addBus(this.busForm.value, this.usersSelected).subscribe(
        (val: any) => { 
          this._busService.affectCircuitToBus(val,this.busForm.value).subscribe(
            (response: any) => {},
            (error: any) => { console.error(error);}
          );
          for(const item of this.usersSelected )
          {
            this._userService.affectUsersToBus(val,item["id"] ).subscribe(
              (response: any) => {
                console.log(response);
                this._coreService.openSnackBar('Bus added successfully');
               
              },
              (error: any) => {
                console.error(error);
                this._coreService.openSnackBar('Bus added successfully');
              }
            );

          }
          this._dialogRef.close(true);
         
        },
        (error: any) => {
          console.error(error);
          this._coreService.openSnackBar('Error occurred while adding bus');
        }
      );
    }
  }
  

  

}
