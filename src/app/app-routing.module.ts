import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component'; // Make sure the path is correct
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { MemoryFormComponent } from './memory-form/memory-form.component';

const routes: Routes = [
  { path: '', component: TimelineComponent },
  { path: 'add-activity', component: ActivityFormComponent },
  { path: 'add-memory', component: MemoryFormComponent },
  { path: 'manage-categories', component: CategoryManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }