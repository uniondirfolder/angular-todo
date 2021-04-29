import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TodoTask } from './models/todoTask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(public http: HttpClient){}
sendRequest(){
  this.http.get('', {params: {}}).subscribe(result => console.log(result))
}

  title = 'angular-todo';

  todoItems: TodoTask[] = [];

  appAddTask = (event: TodoTask) => {
    // console.log(event.toString())
    this.todoItems.push(event);
  }
}
