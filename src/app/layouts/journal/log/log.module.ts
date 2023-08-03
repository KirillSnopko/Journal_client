import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


import { LogListComponent } from './log-list/log-list.component';


export const StudentLayoutRoutes: Routes = [
  { path: 'logs', component: LogListComponent },
];

@NgModule({
  declarations: [
    LogListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule
  ]
})
export class LogModule { }
