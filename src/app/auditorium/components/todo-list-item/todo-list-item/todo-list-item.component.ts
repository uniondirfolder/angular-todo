import { Component, Input, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/models/todoTask';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {

  constructor() { }

  @Input() taskList: TodoTask[] = [];

  ngOnInit(): void {
  }

 
}
