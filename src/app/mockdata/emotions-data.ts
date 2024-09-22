// emotions-data.ts
import { Emotion } from '../interfaces';

export const EMOTIONS: Emotion[] = [
  { id: 'happy', name: 'Happy', color: '#FFD700', icon: '😊' },
  { id: 'sad', name: 'Sad', color: '#1E90FF', icon: '😢' },
  { id: 'angry', name: 'Angry', color: '#FF4500', icon: '😠' },
  { id: 'excited', name: 'Excited', color: '#FF69B4', icon: '😃' },
  { id: 'anxious', name: 'Anxious', color: '#8A2BE2', icon: '😰' },
  { id: 'calm', name: 'Calm', color: '#3CB371', icon: '😌' },
  { id: 'motivated', name: 'Motivated', color: '#32CD32', icon: '🚀' },
  { id: 'accomplished', name: 'Accomplished', color: '#DAA520', icon: '🏆' },
  { id: 'focused', name: 'Focused', color: '#FF8C00', icon: '🎯' },
  // New emotions
  { id: 'curious', name: 'Curious', color: '#FFB300', icon: '🤔' },
  { id: 'nostalgic', name: 'Nostalgic', color: '#FF6F61', icon: '😌' },
  { id: 'overwhelmed', name: 'Overwhelmed', color: '#FF4500', icon: '😩' },
];
