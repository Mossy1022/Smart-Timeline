// emotion.ts
export interface Emotion {
    id: string;          // Unique identifier, e.g., 'happy'
    name: string;        // Display name, e.g., 'Happy'
    color?: string;      // Color code for visualization
    icon?: string;       // Icon URL or class
  }


// perspective.ts
export interface Perspective {
    emotions?: Emotion[];           // Emotions felt during the memory or activity
    thoughts?: string[];            // Notable thoughts or reflections
    physicalStates?: string[];      // Physical conditions
    sensoryDetails?: string[];      // Sensory experiences
    contextualFactors?: string[];   // Environmental factors
    attitudesBeliefs?: string[];    // Relevant attitudes or beliefs
    importance?: number;            // Importance level (1-5)
}

// category.ts
export interface Category {
    id: string;
    name: string;
    color: string;       // Color for visual representation
    icon?: string;        // Optional icon for display purposes
  }

// memory.ts
export interface Memory {
    id: string;
    label: string;
    date: Date;
    activityIds?: string[];
    description?: string;
    perspective?: Perspective;
    categoryIds?: string[];
    imageUrl?: string;
    startDate?: Date;
    endDate?: Date;
  }

// activity.ts
export interface Activity {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    perspective?: Perspective;
    categoryIds?: string[];
    color?: string;
    imageUrl?: string;
  }

// FacebookAlbum interface
export interface FacebookAlbum {
    id: string;
    name: string;
    description?: string;
    cover_photo?: string;
    created_time: string;
}

// FacebookPhoto interface
export interface FacebookPhoto {
    id: string;
    album_id: string;
    image_url: string;
    description?: string;
    timestamp: string;
}

// FacebookPost interface
export interface FacebookPost {
    id: string;
    message?: string;
    created_time: string;
    attachments?: FacebookPhoto[];
    album?: FacebookAlbum;
}