import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model-nvv/Task';
import { TaskSearchValues } from '../interface/SearchObjects';
import { TaskDAO } from '../interface/TaskDAO';
import { CommonService } from './common.service';

// глобальная переменная для хранения URL
export const TASK_URL_TOKEN = new InjectionToken<string>('url');

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class TaskService extends CommonService<Task> implements TaskDAO {

  //@ts-ignore
  constructor(@Inject(TASK_URL_TOKEN) private baseUrl,
    private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск задач по любым параметрам
  findTasks(searchObj: TaskSearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }
}
