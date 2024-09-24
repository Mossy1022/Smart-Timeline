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
  {
    id: 'memory-7',
    label: 'First Job Offer',
    date: new Date('2016-08-01'),
    activityIds: ['activity-10'],
    description: 'Received my first job offer and felt ecstatic.',
    perspective: PERSPECTIVES[5],
    categoryIds: ['work'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-8',
    label: 'Family Vacation to Europe',
    date: new Date('2019-07-01'),
    activityIds: ['activity-11'],
    description: 'Traveled to Europe with family and created unforgettable memories.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['travel'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-9',
    label: 'First Child\'s Birth',
    date: new Date('2021-01-15'),
    activityIds: ['activity-13'],
    description: 'The joy of becoming a father for the first time.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['family'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-10',
    label: 'YouTube Channel Launch',
    date: new Date('2022-01-01'),
    activityIds: ['activity-14'],
    description: 'Launched my YouTube channel and shared my first video.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['hobby'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-11',
    label: 'Learned to Swim',
    date: new Date('2002-08-31'),
    activityIds: ['activity-15'],
    description: 'Felt proud after learning to swim for the first time.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['hobby'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-12',
    label: 'First School Play',
    date: new Date('2005-05-01'),
    activityIds: ['activity-16'],
    description: 'Remembered the excitement of performing in front of an audience.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['education'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-13',
    label: 'Family Road Trip',
    date: new Date('2003-07-15'),
    activityIds: ['activity-17'],
    description: 'Cherished the memories made during the family road trip.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['family'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-14',
    label: 'Learned to Play Guitar',
    date: new Date('2005-06-15'),
    activityIds: ['activity-18'],
    description: 'Felt accomplished after learning my first song on the guitar.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['hobby'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-15',
    label: 'First Sleepover',
    date: new Date('2005-03-02'),
    activityIds: ['activity-19'],
    description: 'Excited about the fun and games during my first sleepover.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['personal'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'memory-16',
    label: 'Won Science Fair',
    date: new Date('2005-04-01'),
    activityIds: ['activity-20'],
    description: 'Proud moment winning the science fair with my volcano project.',
    perspective: PERSPECTIVES[2],
    categoryIds: ['education'],
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
];