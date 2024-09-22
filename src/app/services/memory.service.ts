import { Injectable } from '@angular/core';
import { Memory } from '../interfaces';
import { MEMORIES } from '../mockdata/memories-data'; // Ensure this import is correct

// memory.service.ts
@Injectable({ providedIn: 'root' })
export class MemoryService {
  private memories: Memory[] = MEMORIES; // Initialize with mock data

  getMemories(): Memory[] {
    return this.memories;
  }

  addMemory(memory: Memory): void {
    this.memories.push(memory);
  }

  updateMemory(memory: Memory): void {
    const index = this.memories.findIndex(m => m.id === memory.id);
    if (index !== -1) {
      this.memories[index] = memory;
    }
  }

  deleteMemory(id: string): void {
    this.memories = this.memories.filter(m => m.id !== id);
  }
}