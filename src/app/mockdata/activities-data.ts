// activities-data.ts
import { Activity } from '../interfaces';
import { PERSPECTIVES } from './perspectives-data';

export const ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    title: 'Elementary School',
    startDate: new Date('1999-09-01'),
    endDate: new Date('2005-06-15'),
    description: 'Attended elementary school, learning the basics of education.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['education'],
    color: '#2196F3',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'activity-2',
    title: 'High School',
    startDate: new Date('2006-09-01'),
    endDate: new Date('2012-06-15'),
    description: 'Completed high school with a focus on science and mathematics.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['education'],
    color: '#9C27B0',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'activity-3',
    title: 'University Studies',
    startDate: new Date('2012-09-01'),
    endDate: new Date('2016-06-15'),
    description: 'Pursued a degree in Computer Science.',
    perspective: PERSPECTIVES[2],
    categoryIds: ['education'],
    color: '#4CAF50',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  // New activities
  {
    id: 'activity-4',
    title: 'Internship at Tech Company',
    startDate: new Date('2016-06-16'),
    endDate: new Date('2017-06-15'),
    description: 'Gained practical experience in software development.',
    perspective: PERSPECTIVES[3],
    categoryIds: ['work'],
    color: '#FF5722',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'activity-5',
    title: 'Travel to Japan',
    startDate: new Date('2017-08-01'),
    endDate: new Date('2017-08-15'),
    description: 'Explored the culture and technology of Japan.',
    perspective: PERSPECTIVES[4],
    categoryIds: ['travel'],
    color: '#FFC107',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'activity-6',
    title: 'First Job as a Developer',
    startDate: new Date('2017-09-01'),
    endDate: new Date('2020-12-31'),
    description: 'Started my career as a software developer.',
    perspective: PERSPECTIVES[5],
    categoryIds: ['work'],
    color: '#4CAF50',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'activity-7',
    title: 'Family Vacation to Hawaii',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2021-06-15'),
    description: 'Relaxed and enjoyed time with family on the beach.',
    perspective: PERSPECTIVES[0],
    categoryIds: ['family'],
    color: '#2196F3',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
  {
    id: 'activity-8',
    title: 'Started a Blog',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    description: 'Launched a personal blog to share my experiences and thoughts.',
    perspective: PERSPECTIVES[1],
    categoryIds: ['hobby'],
    color: '#9C27B0',
    imageUrl: 'https://i.imgur.com/P9NwwOR.jpeg', // Real image URL
  },
];