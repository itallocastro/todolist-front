import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalTasksComponent} from './modal-tasks/modal-tasks.component';
import {TasksService} from '../../services/tasks.service';
import {TaskModel} from '../../models/task.model';
import {Task} from 'protractor/built/taskScheduler';
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  formGroup: FormGroup;
  newTask: TaskModel = new TaskModel();
  typesTask = ['Tarefas Pendentes', 'Tarefas Concluídas'];
  openNewTask: boolean = false;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private taskService: TasksService) { }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
    this.getListTasks();
  }

  list(): FormArray {
    return this.formGroup.get('list') as FormArray;
  }

  generateForm() {
    return this.fb.group({
      list: this.fb.array([]),
    });
  }

  generateFormTask(task: TaskModel) {
    return this.fb.group(task);
  }

  getListTasks() {
    this.taskService.find().subscribe((tasks: TaskModel[]) => {
      const list = this.list();
      tasks.forEach((task: TaskModel) => {
        list.push(this.generateFormTask(task));
      });
    }, (err) => {
      console.log(err);
    });
  }

  openFormNewTask() {
    this.openNewTask = !this.openNewTask;
  }

  createTask() {
    const list = this.list();
    this.taskService.create(this.newTask).subscribe((result: TaskModel) => {
      list.push(this.generateFormTask(result));
      this.newTask = new TaskModel();
      this.openFormNewTask();
    }, (err) => {
      console.log(err);
    });
  }

  editTaskDescription(index) {
    let list = this.list();
    const dialogRef = this.dialog.open(ModalTasksComponent, {
      width: '800px',
      data: list.value[index]
    });

    dialogRef.afterClosed().subscribe((taskEdited) => {
      if(taskEdited) {
        this.taskService.edit(taskEdited).subscribe((result) => {
          list.controls[index].patchValue(result);
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  valueTaskChange(index) {
    const list = this.list();
    const task = list.value[index];
    this.taskService.edit(task).subscribe((result: TaskModel) => {
      list.controls[index].patchValue(result);
    }, (err) => {
      console.log(err);
    });
  }

  removeTask(index) {
    const list = this.list();
    const task = list.value[index];
    this.taskService.delete(task).subscribe((result) => {
      if(result) {
        list.removeAt(index);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
