import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  user: string = ""; 
  
  constructor(private router: Router){}
  
  ngOnInit(): void {
    this.user = localStorage.getItem('user') || ""; 
  }

  logout()
  {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  
  }
}

