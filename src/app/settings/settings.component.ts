import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SettingsService } from '../services/settings.service';
import { FacebookService } from '../services/facebook.service'; // Import FacebookService
import { environment } from '../../environments/environment';

declare var FB: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userProfile: any;
  userPhotos: any[] = []; // New property to store user photos
  userPosts: any[] = []; // New property to store user posts
  showImages: boolean = true;
  selectedCategories: string[] = [];
  categories: any[] = []; // Assuming you have categories defined

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    private facebookService: FacebookService // Inject FacebookService
  ) {}

  ngOnInit(): void {
    // Subscribe to user profile changes
    this.userService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
      if (profile) {
        this.fetchUserPhotos(profile.id); // Fetch user photos
        this.fetchUserPosts(profile.id); // Fetch user posts
      }
    });
  }

  loginWithFacebook(): void {
    this.facebookService.loginWithFacebook().then(profile => {
      this.userProfile = profile; // Store the user profile
      this.userService.setUserProfile(profile); // Optionally set it in UserService
    }).catch(error => {
      console.error('Error logging in with Facebook:', error);
    });
  }

  fetchUserProfile(accessToken: string): void {
    FB.api('/me?fields=id,name,picture,email', (response: any) => {
      if (response && !response.error) {
        this.userService.setUserProfile(response);
      } else {
        console.error('Error fetching user profile:', response.error);
      }
    });
  }

  fetchUserPhotos(userId: string): void {
    FB.api(`/${userId}/photos?access_token=${this.settingsService.getFacebookAccessToken()}`, (response: any) => {
      if (response && !response.error) {
        this.userPhotos = response.data; // Store user photos
      } else {
        console.error('Error fetching user photos:', response.error);
      }
    });
  }

  fetchUserPosts(userId: string): void {
    FB.api(`/${userId}/posts?access_token=${this.settingsService.getFacebookAccessToken()}`, (response: any) => {
      if (response && !response.error) {
        this.userPosts = response.data; // Store user posts
      } else {
        console.error('Error fetching user posts:', response.error);
      }
    });
  }

  logoutFromFacebook(): void {
    FB.logout(() => {
      this.userService.clearUserProfile();
      this.userPhotos = []; // Clear photos on logout
      this.userPosts = []; // Clear posts on logout
    });
  }

  toggleImages(): void {
    this.settingsService.updateShowImages(this.showImages);
  }

  onCategorySelectionChange(event: any): void {
    this.selectedCategories = event.value;
    this.settingsService.updateSelectedCategories(this.selectedCategories);
  }
}