import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signin: FormGroup = new FormGroup({
    userCode: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get usercodeInput() { return this.signin.get('usercode'); }
  get passwordInput() { return this.signin.get('password'); }  

  constructor( private _loginService : LoginService)
  {}

  onFormSubmit()
  {
    if(this.signin.valid)
    { this._loginService.login(this.signin.value).subscribe(
      {
        next : (val : any) =>
        {
         
         console.log(val);

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
