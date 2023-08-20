import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusService } from '../Services/bus.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bus-add-edit-component',
  templateUrl: './bus-add-edit-component.html',
  styleUrls: ['./bus-add-edit-component.scss']
})
export class BusAddEditComponentComponent implements OnInit {
  busForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _busService: BusService,
    private _dialogRef: MatDialogRef<BusAddEditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private http: HttpClient
  ) {
    this.busForm = this._fb.group({
      bus: '',
      circuit: '',
      users: ''
    })
  }

  ngOnInit(): void {
    this.busForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.busForm.valid) {
      if (this.data) {
        this._busService.updateBus(this.data.id, this.busForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Bus updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._busService.addBus(this.busForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Bus added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
