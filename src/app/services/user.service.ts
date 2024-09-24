import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject to hold the current user profile
  private userProfileSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  // Observable for components to subscribe to user profile changes
  public userProfile$: Observable<any> = this.userProfileSubject.asObservable();

  /**
   * Updates the user profile.
   * @param profile - The user profile data to set.
   */
  setUserProfile(profile: any): void {
    this.userProfileSubject.next(profile);
  }

  /**
   * Clears the user profile data.
   */
  clearUserProfile(): void {
    this.userProfileSubject.next(null);
  }
}