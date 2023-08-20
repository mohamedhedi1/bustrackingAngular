import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-add-edit-component',
  templateUrl: './user-add-edit-component.html',
  styleUrls: ['./user-add-edit-component.scss']
})
export class UserAddEditComponentComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserAddEditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private http: HttpClient
  ) {
    this.userForm = this._fb.group({
      userCode: '',
      nom: '',
      prenom: '',
      bus:'',
    })
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._userService.updateUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User added successfully');
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
