// timeline.component.ts
import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DataSet } from 'vis-data';
import { Timeline, TimelineOptions } from 'vis-timeline';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment for API key
import { OpenAIService } from '../services/openai.service'; // Import OpenAIService
import { FacebookService } from '../services/facebook.service'; // New import for FacebookService
import { FacebookPost } from '../interfaces'; // Import FacebookPost interface

import { MemoryService } from '../services/memory.service';
import { ActivityService } from '../services/activity.service';
import { CategoryService } from '../services/category.service';
import { SettingsService } from '../services/settings.service';
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
  private facebookPosts: FacebookPost[] = []; // New property to store Facebook posts

  private settingsSubscription!: Subscription;
  selectedCategories: string[] = [];
  showImages: boolean = true;

  searchQuery: string = '';
  description: string = ''; // Add this property to hold the description

  private highlightedItemIds: Set<string> = new Set(); // To track highlighted items

  originalItemsArray: any[] = [];

  constructor(
    private memoryService: MemoryService,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private settingsService: SettingsService,
    private openAIService: OpenAIService,
    private facebookService: FacebookService // Inject FacebookService
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
    this.originalItemsArray = this.mapToTimelineItems(
      this.memories,
      this.activities,
      this.categories,
      this.showImages
    );
    this.items = new DataSet<any>(this.originalItemsArray);

    // Check if items are being mapped correctly
    console.log('Mapped Items:', this.originalItemsArray);

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

    // Subscribe to settings changes
    this.settingsSubscription = this.settingsService.settings$.subscribe((settings) => {
      this.showImages = settings.showImages;
      this.selectedCategories = settings.selectedCategories;
      this.applyFilters();
    });

    console.log('Initial Selected Categories:', this.selectedCategories); // Add this for debugging

    // Add 'facebook' group to groups DataSet
    this.groups.add({ id: 'facebook', content: 'Facebook Posts' });

    const pageId = environment.facebookPageId; // Ensure these are set in environment.ts
    const accessToken = environment.facebookAccessToken;

    this.facebookService.getFacebookPosts(pageId, accessToken)
      .subscribe(
        (posts: FacebookPost[]) => {
          this.facebookPosts = posts;
          // Map Facebook posts to timeline items
          const fbItems = this.mapFacebookPostsToTimelineItems(this.facebookPosts);
          this.originalItemsArray = this.originalItemsArray.concat(fbItems);
          this.items.add(fbItems);
          this.applyFilters();
        },
        (error: any) => {
          console.error('Error fetching Facebook posts:', error);
        }
      );
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

    // Add rangechange event listener
    this.timeline.on('rangechange', (props: any) => this.onRangeChange(props));
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.off('select', this.onSelect);
      this.timeline.off('mouseover', this.onMouseOver);
      this.timeline.off('rangechange', this.onRangeChange);
      this.timeline.destroy();
    }
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  public onMouseOver(event: any): void {
    // console.log('onMouseOver: ', event);
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
    categories: Category[],
    showImages: boolean
  ): any[] {
    const items: any[] = [];
    const existingIds = new Set<string>(); // To track existing IDs

    // Define minimum and maximum heights
    const minHeight = 100; // in pixels
    const maxHeight = 200; // in pixels

    // Collect all importance values to determine the scaling factors
    const importanceValues = [
      ...activities.map(activity => activity.perspective?.importance || 1),
      ...memories.map(memory => memory.perspective?.importance || 1)
    ];
    const minImportance = Math.min(...importanceValues);
    const maxImportance = Math.max(...importanceValues);

    // Helper function to calculate height based on importance
    const calculateHeight = (importance: number): number => {
      if (maxImportance === minImportance) {
        return (minHeight + maxHeight) / 2;
      }
      // Linear scaling
      return minHeight + ((importance - minImportance) / (maxImportance - minImportance)) * (maxHeight - minHeight);
    };

    // Map Activities
    activities.forEach((activity) => {
      const groupIds = this.getCategoryGroupIds(activity.categoryIds);
      groupIds.forEach((groupId) => {
        if (!existingIds.has(activity.id)) { // Check for duplicates
          const category = categories.find(c => c.id === groupId);
          const color = category ? category.color : '#2196F3'; // Default color if not found

          // Calculate height based on importance, ensuring it's between minHeight and maxHeight
          const importance = activity.perspective?.importance || 1;
          const calculatedHeight = calculateHeight(importance);
          const itemHeight = `${calculatedHeight}px`;

          // Create content with or without image based on showImages
          const content = `
            <div class="vis-item" style="height: ${itemHeight};">
              ${showImages && activity.imageUrl ? `<img src="${activity.imageUrl}" style="height: -webkit-fill-available;" />` : ''}
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
            style: `border-color: ${color}; height: ${itemHeight}; border-width: 5px;`, // Use category color and dynamic height
            originalStyle: `border-color: ${color}; height: ${itemHeight}; border-width: 5px;`, // Store original style
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
          const category = categories.find(c => c.id === groupId);
          const color = category ? category.color : '#FFC107'; // Default color if not found

          // Calculate height based on importance, ensuring it's between minHeight and maxHeight
          const importance = memory.perspective?.importance || 1;
          const calculatedHeight = calculateHeight(importance);
          const itemHeight = `${calculatedHeight}px`;

          // Determine if the memory is a single instant
          const isSingleInstant = !memory.startDate && !memory.endDate;

          // Create content with or without image based on zoom level
          const content = `
            <div class="vis-item" style="height: ${itemHeight};">
              ${!isSingleInstant && showImages && memory.imageUrl ? `<img src="${memory.imageUrl}" style="height: -webkit-fill-available;" />` : ''}
              <span class="memory-label">${memory.label}</span>
            </div>
          `;

          items.push({
            id: memory.id,
            content: content, // Use the HTML content
            start: memory.date,
            group: groupId,
            type: isSingleInstant ? 'point' : 'box', // Use 'point' for single instant
            title: this.generateMemoryTooltip(memory),
            style: `height: ${itemHeight}; border-bottom: 1px !important;`, // Use category color and dynamic height
            originalStyle: `height: ${itemHeight}; border-bottom: 1px !important;`, // Store original style
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
    return categoryIds;
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

  // Apply filters based on selected categories and showImages flag
  private applyFilters(): void {


    // Filter items based on selectedCategories
    if (this.selectedCategories.length > 0) {
      this.items.clear();
      const filteredItems = this.originalItemsArray.filter(item => this.selectedCategories.includes(item.group));
      this.items.add(filteredItems);
    } else {
      // If no category is selected, show all items
      this.items.clear();
      this.items.add(this.originalItemsArray);
    }
  }

  public toggleImages(): void {
    this.settingsService.updateShowImages(this.showImages);
  }

  /**
   * Creates a filtered version of itemsData by removing unnecessary properties.
   */
  private getFilteredItemsData(): any[] {
    return this.items.get().map(item => ({
      id: item.id,
      start: item.start,
      end: item.end,
      group: item.group,
      type: item.type,
      title: item.title
      // Excluded properties: content, style, originalStyle, etc.
    }));
  }

  /**
   * Analyzes the search query and highlights relevant items.
   */
  public onSearch(): void {
    if (!this.searchQuery.trim()) {
      console.warn('Search query is empty.');
      return;
    }

    // Reset any previous highlights and description before applying new ones
    this.clearHighlights();
    this.description = '';

    const itemsData = this.getFilteredItemsData(); // Use filtered data

    const prompt = `
      Analyze the following items data and highlight connections based on the user's query.

      Items Data:
      ${JSON.stringify(itemsData)}

      User Query:
      ${this.searchQuery}.

      **IMPORTANT:** Respond **only** with a JSON object in the exact format shown below. Do not include any additional text or explanations, and when referencing the highlighted items in the description, reference them by their title, not their id. Do not use tick marks to send back the JSON. We just want the brackets and the data inside. Here is the format:

      {
        "highlightedItems": [list_of_item_ids],
        "description": "description_text_explaining_the_highlighted_items_and_their_connections_as_found_in_the_query"
      }

    `;

    this.openAIService.getCompletion(prompt)
      .subscribe(
        (response: any) => {
          try {
            const content = response.choices[0].message?.content;
            console.log('OpenAI response:', content);
            if (content) {
              // Attempt to find the first curly brace which indicates the start of JSON
              const jsonStartIndex = content.indexOf('{');
              if (jsonStartIndex !== -1) {
                const jsonString = content.substring(jsonStartIndex);
                const data = JSON.parse(jsonString.trim());
                this.highlightItems(data.highlightedItems);
                this.description = data.description || ''; // Set the description
              } else {
                console.error('No JSON object found in OpenAI response:', content);
              }
            } else {
              console.error('Empty content received from OpenAI response.');
            }
          } catch (e) {
            console.error('Error parsing OpenAI response:', e);
          }
        },
        (error) => {
          console.error('Error with OpenAI API:', error);
        }
      );
  }

  /**
   * Highlights the specified items by updating their styles.
   * @param itemIds Array of item IDs to highlight.
   */
  private highlightItems(itemIds: string[]): void {
    const itemsArray = this.mapToTimelineItems(
      this.memories,
      this.activities,
      this.categories,
      this.showImages
    );

    itemIds.forEach(id => {
      const item = this.items.get(id);
      if (item) {
        // Store the original style if not already stored
        if (!item.originalStyle) {
          item.originalStyle = item.style;
        }

        this.items.update({ id: id, style: 'border-color: red; border-width: 2px; height: 275px;' });
        this.highlightedItemIds.add(id);
      }
    });

    this.items.clear();
    const filteredItems = itemsArray.filter(item => itemIds.includes(item.id));
    this.items.add(filteredItems);
  }

  /**
   * Clears all highlighted items by resetting their styles to original.
   */
  public clearHighlights(): void {

    this.items.clear();
    this.items.add(this.originalItemsArray);

    this.highlightedItemIds.forEach(id => {
      const item = this.items.get(id);
      if (item && item.originalStyle) {
        this.items.update({ id: id, style: item.originalStyle });
      }
    });

    this.highlightedItemIds.clear();
    this.description = ''; // Clear the description
  }

  // New method to map Facebook posts to timeline items
  private mapFacebookPostsToTimelineItems(posts: FacebookPost[]): any[] {
    return posts.map(post => ({
      id: `fb-${post.id}`,
      content: `
        <div class="vis-item facebook-item">
          <span class="memory-label">Facebook Post</span>
          <p>${post.message || ''}</p>
        </div>
      `,
      start: new Date(post.created_time),
      group: 'facebook', // Assign to 'facebook' group
      type: 'point',
      title: post.message,
      style: `background-color: #4267B2; color: white;`,
      originalStyle: `background-color: #4267B2; color: white;`,
    }));
  }

  // New method to handle range change
  private onRangeChange(props: any): void {
    const { start, end } = props;
    console.log('Range change detected:', start, end);
    const isMonthScale = this.isZoomedToMonth(start, end);
    this.updateItemsVisibility(isMonthScale);
  }

  // Check if the current zoom level is at the month scale
  private isZoomedToMonth(start: number, end: number): boolean {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const monthDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    console.log('Month difference:', monthDifference);
    return monthDifference === 0; // Check if the start and end are within the same month
  }

  // Update items visibility based on zoom level
  private updateItemsVisibility(isMonthScale: boolean): void {
    this.items.forEach(item => {
        if (item.type === 'point' && item.content.includes('memory-label')) {
            const memoryId = item.id; // Get the memory ID
            const memory = this.memories.find(mem => mem.id === memoryId.replace('fb-', '')); // Find the corresponding memory

            // Determine if the memory is a single instant
            const isSingleInstant = !memory?.startDate && !memory?.endDate;

            // Show image only if zoomed to month scale and it's not a single instant
            const showImage = isMonthScale && !isSingleInstant; 
            const content = showImage 
                ? item.content // Keep the original content with image
                : item.content.replace(/<img[^>]*>/, ''); // Remove image if not showing

            this.items.update({ id: item.id, content: content });
        }
    });
  }
}
