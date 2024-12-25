import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    RouterModule
  ],
  template: `
    <mat-card class="task-detail-card">
      <mat-card-header>
        <mat-card-title>Edit Task</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form *ngIf="task">
          <mat-form-field>
            <input matInput [(ngModel)]="task.title" name="title" placeholder="Task title">
          </mat-form-field>
          <mat-form-field>
            <input matInput [(ngModel)]="task.description" name="description" placeholder="Task description">
          </mat-form-field>
          <mat-checkbox [(ngModel)]="task.completed" name="completed">
            Completed
          </mat-checkbox>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="saveTask()">Save</button>
        <button mat-button routerLink="/">Back</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .task-detail-card {
      max-width: 600px;
      margin: 20px auto;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-card-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }
  `]
})
export class TaskDetailComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
    
    if (!this.task) {
      this.router.navigate(['/']);
    }
  }

  saveTask() {
    if (this.task) {
      this.taskService.updateTask(this.task);
      this.router.navigate(['/']);
    }
  }
}