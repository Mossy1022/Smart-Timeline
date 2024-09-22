// timeline.component.ts
import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DataSet } from 'vis-data';
import { Timeline, TimelineOptions } from 'vis-timeline';

import { MemoryService } from '../services/memory.service';
import { ActivityService } from '../services/activity.service';
import { CategoryService } from '../services/category.service';
import { Memory, Activity, Category, Emotion } from '../interfaces';
import { SettingsComponent } from '../settings/settings.component'; // Import the settings component if needed

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('timeline', { static: false }) timelineContainer!: ElementRef;

  private timeline!: Timeline;
  private items!: DataSet<any>;
  private groups!: DataSet<any>;
  private options!: TimelineOptions;

  private memories: Memory[] = [];
  private activities: Activity[] = [];
  private categories: Category[] = [];

  showImages: boolean = true; // Default to showing images

  constructor(
    private memoryService: MemoryService,
    private activityService: ActivityService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.memories = this.memoryService.getMemories();
    this.activities = this.activityService.getActivities();
    this.categories = this.categoryService.getCategories();

    // Check if data is being fetched correctly
    console.log('Memories:', this.memories);
    console.log('Activities:', this.activities);
    console.log('Categories:', this.categories);

    // Map items
    const itemsArray = this.mapToTimelineItems(
      this.memories,
      this.activities,
      this.categories
    );
    this.items = new DataSet<any>(itemsArray);

    // Check if items are being mapped correctly
    console.log('Mapped Items:', itemsArray);

    // Timeline options
    this.options = {
      stack: true, // Set to true to stack items vertically
      zoomable: true,
      groupOrder: 'content',
      tooltip: {
        followMouse: true,
        overflowMethod: 'cap',
      },
      start: new Date(1990, 0, 1), // Set start date
      end: new Date(2024, 11, 31), // Set end date
      min: new Date(1990, 0, 1), // Set minimum zoom-out date
      max: new Date(2025, 11, 31), // Set maximum zoom-out date
      height: '100%', // Set height to 100% of the parent container
      // Other options as needed
    };
  }

  ngAfterViewInit(): void {
    this.timeline = new Timeline(
      this.timelineContainer.nativeElement,
      this.items,
      this.groups,
      this.options
    );

    // Register event listeners
    this.timeline.on('select', (event: any) => this.onSelect(event));

    this.timeline.on('itemover', (event: any) => this.onMouseOver(event));
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.off('select', this.onSelect);
      this.timeline.off('mouseover', this.onMouseOver);
      this.timeline.destroy();
    }
  }


  public onMouseOver(event: any): void {
    console.log('onMouseOver: ', event);
  }

  public onSelect(event: any): void {
    console.log('onSelect: ', event);
    const selectedItems = event.items;
    if (selectedItems && selectedItems.length > 0) {
      const selectedId = selectedItems[0];
      const item = this.items.get(selectedId);
      if (item) {
        this.openDetailView(item);
      }
    }
  }

  private openDetailView(item: any): void {
    // Implement the logic to open a detailed view or editing form
    console.log('Item selected:', item);
  }

  private mapToTimelineItems(
    memories: Memory[],
    activities: Activity[],
    categories: Category[]
  ): any[] {
    const items: any[] = [];
    const existingIds = new Set<string>(); // To track existing IDs

    // Set a base height for timeline items
    const baseHeight = 115; // Base height in pixels

    // Map Activities
    activities.forEach((activity) => {
        const groupIds = this.getCategoryGroupIds(activity.categoryIds);
        groupIds.forEach((groupId) => {
            if (!existingIds.has(activity.id)) { // Check for duplicates
                const category = categories.find(c => `category_${c.id}` === groupId);
                const color = category ? category.color : '#2196F3'; // Default color if not found

                // Calculate height based on importance
                const itemHeight = `${baseHeight + (activity.perspective?.importance || 1) * 20}px`; // Scale height based on importance

                // Create content with label only
                const content = `
                    <div class="vis-item" style="height: ${itemHeight};">
                        <img src="${activity.imageUrl}" style="height: -webkit-fill-available;" />
                        <span class="memory-label">${activity.title}</span>
                    </div>
                `;

                items.push({
                    id: activity.id,
                    content: content, // Use the HTML content
                    start: activity.startDate,
                    end: activity.endDate,
                    group: groupId,
                    type: 'range',
                    title: this.generateActivityTooltip(activity),
                    style: `border-color: ${color}; height: 150px; border-width: 5px;`, // Use category color and dynamic height
                });
                existingIds.add(activity.id); // Add ID to the set
            } else {
                console.warn(`Duplicate activity ID found: ${activity.id}`);
            }
        });
    });

    // Map Memories
    memories.forEach((memory) => {
        const groupIds = this.getCategoryGroupIds(memory.categoryIds);
        groupIds.forEach((groupId) => {
            if (!existingIds.has(memory.id)) { // Check for duplicates
                const category = categories.find(c => `category_${c.id}` === groupId);
                const color = category ? category.color : '#FFC107'; // Default color if not found

                // Calculate height based on importance
                const itemHeight = `${baseHeight + (memory.perspective?.importance || 1) * 20}px`; // Scale height based on importance

                // Create content with label only
                const content = `
                    <div class="vis-item" style="height: ${itemHeight};">
                        <img src="${memory.imageUrl}" style="height: -webkit-fill-available;" />
                        <span class="memory-label">${memory.label}</span>
                    </div>
                `;

                items.push({
                    id: memory.id,
                    content: content, // Use the HTML content
                    start: memory.date,
                    group: groupId,
                    type: 'box',
                    title: this.generateMemoryTooltip(memory),
                    style: `height: 150px; border-color: ${color}; border-width: 5px;`, // Use category color and dynamic height
                });
                existingIds.add(memory.id); // Add ID to the set
            } else {
                console.warn(`Duplicate memory ID found: ${memory.id}`);
            }
        });
    });

    // Check if items are being created correctly
    console.log('Items Created:', items);
    
    return items;
  }

  private getCategoryGroupIds(categoryIds: string[] | undefined): string[] {
    if (!categoryIds || categoryIds.length === 0) {
      return ['uncategorized'];
    }
    return categoryIds.map((catId) => `category_${catId}`);
  }

  private generateActivityTooltip(activity: Activity): string {
    let tooltip = `<strong>${activity.title}</strong><br/>`;
    if (activity.description) tooltip += `${activity.description}<br/>`;

    // Include Perspective details
    if (activity.perspective) {
      tooltip += this.generatePerspectiveTooltip(activity.perspective);
    }

    // Include Categories
    if (activity.categoryIds && this.categories) {
      const categories = activity.categoryIds
        .map((id) => this.categories.find((c) => c.id === id)?.name)
        .filter((name) => name)
        .join(', ');
      tooltip += `Categories: ${categories}<br/>`;
    }

    return tooltip;
  }

  private generateMemoryTooltip(memory: Memory): string {
    let tooltip = `<strong>${memory.label}</strong><br/>`;
    if (memory.description) tooltip += `${memory.description}<br/>`;

    // Include Perspective details
    if (memory.perspective) {
      tooltip += this.generatePerspectiveTooltip(memory.perspective);
    }

    // Include Categories
    if (memory.categoryIds && this.categories) {
      const categories = memory.categoryIds
        .map((id) => this.categories.find((c) => c.id === id)?.name)
        .filter((name) => name)
        .join(', ');
      tooltip += `Categories: ${categories}<br/>`;
    }

    return tooltip;
  }

  private generatePerspectiveTooltip(perspective: any): string {
    let tooltip = '';
    if (perspective.emotions) {
      const emotions = perspective.emotions.map((e: Emotion) => e.name).join(', ');
      tooltip += `Emotions: ${emotions}<br/>`;
    }
    if (perspective.thoughts) {
      tooltip += `Thoughts: ${perspective.thoughts.join('; ')}<br/>`;
    }
    if (perspective.physicalStates) {
      tooltip += `Physical States: ${perspective.physicalStates.join(', ')}<br/>`;
    }
    if (perspective.sensoryDetails) {
      tooltip += `Sensory Details: ${perspective.sensoryDetails.join('; ')}<br/>`;
    }
    if (perspective.contextualFactors) {
      tooltip += `Contextual Factors: ${perspective.contextualFactors.join('; ')}<br/>`;
    }
    if (perspective.attitudesBeliefs) {
      tooltip += `Attitudes & Beliefs: ${perspective.attitudesBeliefs.join('; ')}<br/>`;
    }
    return tooltip;
  }

  private generateMemoryStyle(memory: Memory): string {
    // Style based on the first emotion's color
    if (
      memory.perspective &&
      memory.perspective.emotions &&
      memory.perspective.emotions.length > 0
    ) {
      const emotionColor = memory.perspective.emotions[0].color || '#FFC107';
      return `background-color: ${emotionColor};`;
    }
    return 'background-color: #FFC107;';
  }

  toggleImages(): void {
    this.showImages = !this.showImages;
    // Optionally, you can trigger a refresh of the timeline items here if needed
  }
}
