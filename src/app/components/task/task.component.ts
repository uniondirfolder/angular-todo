import { Component, Input, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/models/todoTask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() taskList: TodoTask[]=[];
}
