import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { UserService } from '../Services/user.service';

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

  constructor(private _loginService: LoginService, private router: Router,private authService: AuthService, private _userService: UserService ) {}


  onFormSubmit() {
    if (this.signin.valid) {
      this.loginError = null; 
  
      this._loginService.login(this.signin.value).subscribe(
        {

          next: (val: any) => {
            console.log(val);
            const accessToken = val.access_token;
            localStorage.setItem('access_token', accessToken);
            sessionStorage.setItem('access_token', accessToken);
           
            this._userService.getUserByCode(this.signin.value.userCode).subscribe(
             { next : (userData : any) =>{
              
              localStorage.setItem('user',userData.prenom+ " "+ userData.nom)
              this.authService.loginUser(userData); 
              this.router.navigate(['/user']);

              },error: (err: any) => {
                console.error(err);}
              }
            )
          },
          error: (err: any) => {
            console.error(err);
            this.loginError = "Check your CUID and your password!"; 
          }
        }
      );
    }
  }
  

  




}
