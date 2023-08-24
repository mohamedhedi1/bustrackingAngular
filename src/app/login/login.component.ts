import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string | null = null;
  signin: FormGroup = new FormGroup({
    userCode: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get usercodeInput() { return this.signin.get('usercode'); }
  get passwordInput() { return this.signin.get('password'); }  

  constructor(private _loginService: LoginService, private router: Router) {}


  onFormSubmit() {
    if (this.signin.valid) {
      this.loginError = null; // Réinitialiser l'erreur
  
      this._loginService.login(this.signin.value).subscribe(
        {
          next: (val: any) => {
            console.log(val);
            const accessToken = val.access_token;
            localStorage.setItem('access_token', accessToken);
            this.router.navigate(['/user']);
            
          },
          error: (err: any) => {
            console.error(err);
            this.loginError = "Check your CUID and your password!"; // Définir le message d'erreur
          }
        }
      );
    }
  }
  

  




}
