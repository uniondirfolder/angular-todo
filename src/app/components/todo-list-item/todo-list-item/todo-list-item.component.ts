import { Component, Input, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/models/todoTask';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {

  constructor() { }

  @Input() task: TodoTask = new TodoTask(0, "", false);

  ngOnInit(): void {
  }

  onChecked = () => {
    this.task.isCompleted = !this.task.isCompleted;
  }
}
