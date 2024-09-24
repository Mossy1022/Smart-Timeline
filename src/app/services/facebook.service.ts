import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FacebookPost, FacebookAlbum, FacebookPhoto } from '../interfaces';

declare var FB: any; // Ensure FB is declared

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private apiUrl = 'https://graph.facebook.com/v12.0'; // Facebook Graph API version
  private accessToken: string | null = null; // Existing property

  constructor(private http: HttpClient) { }

  /**
   * Sets the Facebook access token.
   * @param accessToken - The access token to set.
   */
  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  /**
   * Fetches Facebook posts using the access token.
   * @param pageId - The Facebook Page ID to fetch posts from.
   * @param accessToken - The access token for authentication.
   * @returns An observable of FacebookPost array.
   */
  getFacebookPosts(pageId: string, accessToken?: string): Observable<FacebookPost[]> {
    const token = accessToken || this.accessToken;
    if (!token) {
      return throwError('Access token is not set.');
    }
    const url = `${this.apiUrl}/${pageId}/posts`;
    let params = new HttpParams()
      .set('access_token', token)
      .set('fields', 'id,message,created_time,attachments{media,subattachments},permissions'); // Added permissions field

    return this.http.get<any>(url, { params })
      .pipe(
        map(response => response.data as FacebookPost[]),
        catchError(this.handleError)
      );
  }

  /**
   * Fetches the user's profile information with specific fields.
   */
  getUserProfile(): Observable<any> {
    return new Observable(observer => {
      FB.api('/me', { 
        fields: 'id,name,email,picture,user_birthday,user_hometown,user_location,user_likes,user_photos,user_videos,user_friends,user_gender,user_age_range,public_profile' 
      }, (response: any) => {
        if (!response || response.error) {
          observer.error(response.error);
        } else {
            // Check for the existence of user_birthday
            if (!response.user_birthday) {
                console.warn('User birthday is not available.');
            }
        console.log(response);
          observer.next(response);
          observer.complete();
        }
      });
    });
  }

  /**
   * Initiates Facebook login and requests specific permissions.
   */
  loginWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          this.accessToken = response.authResponse.accessToken;
          // Fetch user profile information after successful login
          this.getUserProfile().subscribe(
            profile => {
              resolve(profile); // Resolve with the user profile
            },
            error => {
              reject(error); // Reject if there's an error fetching the profile
            }
          );
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'user_birthday,user_hometown,user_location,user_likes,user_photos,user_videos,user_friends,user_posts,user_gender,user_age_range,public_profile' });
    });
  }

  private handleError(error: any) {
    console.error('Facebook API error:', error);
    return throwError(error);
  }
}