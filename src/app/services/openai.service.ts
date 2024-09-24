import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Correct import

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';  // Use the Chat Completions API

  constructor(private http: HttpClient) { }

  getCompletion(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openaiApiKey}`  // Ensure correct casing
    });

    const body = {
      model: 'gpt-4o',  // Corrected model name
      messages: [{ role: 'user', content: prompt }],  // Adapt prompt for Chat API
      temperature: 0.7
    };

    return this.http.post(this.apiUrl, body, { headers })
      .pipe(
        catchError(error => {
          console.error('OpenAI API error:', error);
          return throwError(error);
        })
      );
  }
}
