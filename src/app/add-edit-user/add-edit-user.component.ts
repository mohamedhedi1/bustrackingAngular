import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
userForm: FormGroup;
constructor(
   private _fb: FormBuilder,
   private _userService : UserService,
   private _dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private http: HttpClient
)
{
  this.userForm = this._fb.group({
      nom: '',
      prenom : '',
      


    });

   
}

ngOnInit(): void {
  this.userForm.patchValue(this.data);
}
onFormSubmit() 
{
  if (this.userForm.valid) {
    
      
      this._userService.addUser(this.userForm.value).subscribe({
        next : (val : any) => 
        {
          this._coreService.openSnackBar('User added successfully');
          this._dialogRef.close(true);
        }
        ,
          error: (err: any) => {
            console.error(err);
          }
      })
  }


}


}
