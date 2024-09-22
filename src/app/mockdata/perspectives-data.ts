// perspectives-data.ts
import { Perspective } from '../interfaces';
import { EMOTIONS } from './emotions-data';

export const PERSPECTIVES: Perspective[] = [
  {
    emotions: [EMOTIONS.find((e) => e.id === 'excited')!],
    thoughts: ['Looking forward to mastering Angular.'],
    physicalStates: ['Energetic'],
    sensoryDetails: ['The smell of coffee while coding.'],
    contextualFactors: ['Working from a cozy café.'],
    attitudesBeliefs: ['Believe that continuous learning is key.'],
    importance: 5, // High importance
  },
  {
    emotions: [EMOTIONS.find((e) => e.id === 'motivated')!],
    thoughts: ['Need to improve endurance.'],
    physicalStates: ['Tired'],
    sensoryDetails: ['Cool breeze during morning runs.'],
    contextualFactors: ['Running in the park.'],
    attitudesBeliefs: ['Health is wealth.'],
    importance: 4, // Medium-high importance
  },
  {
    emotions: [EMOTIONS.find((e) => e.id === 'happy')!],
    thoughts: ['Progressing well with Angular.'],
    physicalStates: ['Focused'],
    sensoryDetails: ['Clicking of keyboard keys.'],
    contextualFactors: ['Quiet home office.'],
    attitudesBeliefs: ['Persistence pays off.'],
    importance: 3, // Medium importance
  },
  // New perspectives
  {
    emotions: [EMOTIONS.find((e) => e.id === 'calm')!],
    thoughts: ['Enjoying the moment with family.'],
    physicalStates: ['Relaxed'],
    sensoryDetails: ['Fresh mountain air.'],
    contextualFactors: ['Surrounded by nature.'],
    attitudesBeliefs: ['Family time is precious.'],
    importance: 2, // Low-medium importance
  },
  {
    emotions: [EMOTIONS.find((e) => e.id === 'anxious')!],
    thoughts: ['Feeling overwhelmed with work.'],
    physicalStates: ['Stressed'],
    sensoryDetails: ['The sound of notifications.'],
    contextualFactors: ['Busy office environment.'],
    attitudesBeliefs: ['Need to find balance.'],
    importance: 1, // Low importance
  },
  {
    emotions: [EMOTIONS.find((e) => e.id === 'accomplished')!],
    thoughts: ['Achieved a new personal best.'],
    physicalStates: ['Energetic'],
    sensoryDetails: ['Heartbeat pounding during the run.'],
    contextualFactors: ['Sunny weather.'],
    attitudesBeliefs: ['Hard work leads to success.'],
    importance: 5, // High importance
  },
];