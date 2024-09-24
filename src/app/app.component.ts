import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service'; // Import UserService

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Smart Timeline</h1>
      <div *ngIf="userProfile" class="global-user-profile">
        <img [src]="userProfile.picture.data.url" alt="User Picture">
        <p>Welcome, {{ userProfile.name }}!</p>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .global-user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .global-user-profile img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
  `]
})
export class AppComponent implements OnInit {
  userProfile: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
    });
  }
}
