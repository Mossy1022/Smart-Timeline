import { Injectable } from '@angular/core';
import { Activity } from '../interfaces';
import { ACTIVITIES } from '../mockdata/activities-data'; // Ensure this import is correct

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = ACTIVITIES; // Initialize with mock data

  getActivities(): Activity[] {
    return this.activities;
  }

  addActivity(activity: Activity): void {
    this.activities.push(activity);
  }

  updateActivity(activity: Activity): void {
    const index = this.activities.findIndex(a => a.id === activity.id);
    if (index !== -1) {
      this.activities[index] = activity;
    }
  }

  deleteActivity(id: string): void {
    this.activities = this.activities.filter(a => a.id !== id);
  }
}
