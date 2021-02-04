import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskModel} from '../models/task.model';
const URLBASE = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  find() {
    return this.httpClient.get(`${URLBASE}/find`);
  }

  create(task: TaskModel) {
    return this.httpClient.post(`${URLBASE}/create`, task);
  }

  edit(task: TaskModel) {
    return this.httpClient.put(`${URLBASE}/edit/${task.id}`, task);
  }

  delete(task: TaskModel) {
    return this.httpClient.delete(`${URLBASE}/delete/${task.id}`);
  }
}
