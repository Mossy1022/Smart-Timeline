import { Emotion, Category } from './interfaces';

export const PHYSICAL_STATES: string[] = [
    'Energetic',
    'Tired',
    'Relaxed',
    'Stressed',
    'Sick',
    'Healthy',
    'Anxious',
    'Calm'
  ];

  export const EMOTIONS: Emotion[] = [
    { id: 'happy', name: 'Happy', color: '#FFD700', icon: '😊' },
    { id: 'sad', name: 'Sad', color: '#1E90FF', icon: '😢' },
    { id: 'angry', name: 'Angry', color: '#FF4500', icon: '😠' },
    { id: 'excited', name: 'Excited', color: '#FF69B4', icon: '😃' },
    { id: 'anxious', name: 'Anxious', color: '#8A2BE2', icon: '😰' },
    { id: 'calm', name: 'Calm', color: '#3CB371', icon: '😌' },
  ];

  export const CATEGORIES: Category[] = [
    { id: 'work', name: 'Work', color: '#2196F3', icon: '💼' },
    { id: 'personal', name: 'Personal', color: '#4CAF50', icon: '🏠' },
    { id: 'health', name: 'Health', color: '#F44336', icon: '❤️' },
    { id: 'hobby', name: 'Hobby', color: '#FFC107', icon: '🎨' },
    { id: 'education', name: 'Education', color: '#9C27B0', icon: '🎓' },
  ];
