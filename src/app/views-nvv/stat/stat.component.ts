import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
// "presentational component": отображает полученные данные и отправляет какие-либо действия обработчику
// назначение - показать статистику
export class StatComponent implements OnInit {

  @Input()
  totalTasksInCategory: number = -1; // общее кол-во задач в категории

  @Input()
  completeTasksInCategory: number = -1; // кол-во решенных задач в категории

  @Input()
  uncompleteTasksInCategory: number = -1; // кол-во нерешенных задач в категории

  @Input()
  showStat: boolean = false; // показать или скрыть статистику
  constructor() { }

  ngOnInit(): void {

  }

}
