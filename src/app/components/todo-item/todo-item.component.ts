import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/models/todoTask';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  @Input() newTaskContext: string = '';
  //@Input() todoTasks: TodoTask[] = [];

  @Output() taskEventEmitter = new EventEmitter<TodoTask>()

  emitAddTask = () => {
    if (this.newTaskContext==='') {
      this.showAlert("Empty task name!")
    } else {
      this.taskEventEmitter.emit(new TodoTask(uuidv4(), this.newTaskContext, false));
    }
  }

  showAlert(msg: string) {
    alert(msg);
  }

}
