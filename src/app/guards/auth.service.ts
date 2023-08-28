import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any; // Contient les informations de l'utilisateur actuellement connecté

  // Supposez que cette méthode est appelée après une connexion réussie
  loginUser(userData: any): void {
    this.currentUser = userData;
  }

  // Vérifie si l'utilisateur a le rôle "ADMIN"
  isUserAdmin(): boolean {
    return this.currentUser && this.currentUser.role ==='ADMIN';
  }
}
