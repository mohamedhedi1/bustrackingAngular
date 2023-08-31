import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

  
  loginUser(userData: any): void {
    this.currentUser = userData;
  }

  
  isUserAdmin(): boolean {
    return this.currentUser && this.currentUser.role ==='ADMIN';
  }
}
