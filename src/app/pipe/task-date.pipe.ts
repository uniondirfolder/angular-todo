import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string | undefined, format: string = 'mediumDate'): string {
    if (date === null || date === undefined) {
      return 'Без терміну';
    }
    date = new Date(date);
    const currentDate = new Date().getDate();
    if (date.getDate() === currentDate) {
      return 'Сьогодні';
    }
    if (date.getDate() === currentDate - 1) {
      return 'Вчьора';
    }
    if (date.getDate() === currentDate + 1) {
      return 'Завтра';
    }

    let res = new DatePipe('uk-Uk').transform(date, format); // дата в потрібній локалі
    if (res == null) return "";
    else return res;
  }

}
