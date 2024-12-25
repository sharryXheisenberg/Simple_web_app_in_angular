import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <mat-card class="task-card">
      <mat-card-header>
        <mat-card-title>Task List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="add-task-form">
          <mat-form-field>
            <input matInput [(ngModel)]="newTask.title" placeholder="Task title">
          </mat-form-field>
          <mat-form-field>
            <input matInput [(ngModel)]="newTask.description" placeholder="Task description">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="addTask()">Add Task</button>
        </div>

        <mat-list>
          <mat-list-item *ngFor="let task of tasks">
            <span matListItemTitle>{{ task.title }}</span>
            <span matListItemLine>{{ task.description }}</span>
            <div class="task-actions">
              <mat-checkbox [(ngModel)]="task.completed" 
                          (change)="updateTask(task)">
              </mat-checkbox>
              <button mat-icon-button [routerLink]="['/task', task.id]">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteTask(task.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .task-card {
      max-width: 800px;
      margin: 20px auto;
    }
    .add-task-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .task-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Partial<Task> = {
    title: '',
    description: '',
    completed: false
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (this.newTask.title && this.newTask.description) {
      this.taskService.addTask(this.newTask as Omit<Task, 'id'>);
      this.newTask = {
        title: '',
        description: '',
        completed: false
      };
    }
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}