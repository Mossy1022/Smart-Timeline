import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  showImages: boolean = true; // Default to showing images

  toggleImages(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showImages = checkbox.checked; // Set showImages based on checkbox state
    // Emit an event or use a service to notify the timeline component
  }
}