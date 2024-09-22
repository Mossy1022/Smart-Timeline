// memory-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemoryService } from '../services/memory.service';
import { ActivityService } from '../services/activity.service';
import { CategoryService } from '../services/category.service';
import { EmotionService } from '../services/emotion.service';
import { Memory, Activity, Category, Emotion } from '../interfaces';
@Component({
  selector: 'app-memory-form',
  templateUrl: './memory-form.component.html',
  styleUrls: ['./memory-form.component.scss']
})
export class MemoryFormComponent implements OnInit {
  memoryForm!: FormGroup;
  activities: Activity[] = [];
  categories: Category[] = [];
  emotions: Emotion[] = [];
  physicalStatesList: string[] = ['Energetic', 'Tired', 'Relaxed', 'Stressed'];

  constructor(
    private fb: FormBuilder,
    private memoryService: MemoryService,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private emotionService: EmotionService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.memoryForm = this.fb.group({
      label: ['', Validators.required],
      date: ['', Validators.required],
      activityIds: [[]],
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

    // Load activities, categories, and emotions
    this.activities = this.activityService.getActivities();
    this.categories = this.categoryService.getCategories();
    this.emotions = this.emotionService.getEmotions();
  }

  onSubmit(): void {
    if (this.memoryForm.valid) {
      const memory: Memory = this.memoryForm.value;
      memory.id = this.generateUniqueId(); // Implement this function
      this.memoryService.addMemory(memory);
      // Reset the form or navigate away as needed
      this.memoryForm.reset();
    }
  }

  private generateUniqueId(): string {
    // Simple unique ID generator (for demo purposes)
    return 'memory-' + Math.random().toString(36).substr(2, 9);
  }
}