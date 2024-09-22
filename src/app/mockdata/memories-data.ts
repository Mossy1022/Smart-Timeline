// memories-data.ts
import { Memory } from '../interfaces';
import { PERSPECTIVES } from './perspectives-data';

export const MEMORIES: Memory[] = [
  {
    id: 'memory-1',
    label: 'First Day of School',
    date: new Date('1999-09-01'),
    activityIds: ['activity-1'],
    description: 'Excited and nervous on my first day of school.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['education'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-2',
    label: 'Learned to Ride a Bike',
    date: new Date('2000-05-15'),
    activityIds: [],
    description: 'Finally learned to ride my bike without training wheels.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['personal'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-3',
    label: 'Graduated High School',
    date: new Date('2012-06-15'),
    activityIds: ['activity-2'],
    description: 'Graduated with honors and celebrated with friends and family.',
    perspective: PERSPECTIVES[2],
    categoryIds: ['education'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-4',
    label: 'Moved to a New City',
    date: new Date('2015-05-20'),
    activityIds: [],
    description: 'Moved to San Francisco for a new job opportunity.',
    perspective: PERSPECTIVES[4],
    categoryIds: ['personal'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-5',
    label: 'Traveled to Europe',
    date: new Date('2018-08-10'),
    activityIds: ['activity-4'],
    description: 'Visited several countries in Europe and experienced different cultures.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['travel'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-6',
    label: 'Started a New Hobby',
    date: new Date('2023-01-10'),
    activityIds: [],
    description: 'Took up painting as a new hobby to express creativity.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['hobby'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
];