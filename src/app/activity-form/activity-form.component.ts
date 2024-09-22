// activity-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../services/activity.service';
import { CategoryService } from '../services/category.service';
import { EmotionService } from '../services/emotion.service';
import { Activity, Category, Emotion } from '../interfaces';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  activityForm!: FormGroup;
  categories: Category[] = [];
  emotions: Emotion[] = [];
  physicalStatesList: string[] = ['Energetic', 'Tired', 'Relaxed', 'Stressed'];

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private emotionService: EmotionService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
      perspective: this.fb.group({
        emotions: [[]],
        thoughts: [''],
        physicalStates: [[]],
        sensoryDetails: [''],
        contextualFactors: [''],
        attitudesBeliefs: ['']
      }),
      categoryIds: [[]],
      imageUrl: ['']
    });

    // Load categories and emotions
    this.categories = this.categoryService.getCategories();
    this.emotions = this.emotionService.getEmotions();
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const activity: Activity = this.activityForm.value;
      activity.id = this.generateUniqueId(); // Implement this function
      activity.color = this.assignActivityColor(activity); // Optional
      this.activityService.addActivity(activity);
      // Reset the form or navigate away as needed
      this.activityForm.reset();
    }
  }

  private generateUniqueId(): string {
    // Simple unique ID generator (for demo purposes)
    return 'activity-' + Math.random().toString(36).substr(2, 9);
  }

  private assignActivityColor(activity: Activity): string {
    // Assign a color based on categories or other logic
    // For now, return a default color
    return '#2196F3';
  }
}