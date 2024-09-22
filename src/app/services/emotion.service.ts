import { Injectable } from '@angular/core';
import { Emotion } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmotionService {
  private emotions: Emotion[] = [];

  getEmotions(): Emotion[] {
    return this.emotions;
  }

  addEmotion(emotion: Emotion): void {
    this.emotions.push(emotion);
  }

  updateEmotion(emotion: Emotion): void {
    const index = this.emotions.findIndex(e => e.id === emotion.id);
    if (index !== -1) {
      this.emotions[index] = emotion;
    }
  }

  deleteEmotion(id: string): void {
    this.emotions = this.emotions.filter(e => e.id !== id);
  }
}