import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Category } from 'src/app/model-nvv/Category';
import { Priority } from 'src/app/model-nvv/Priority';
import { PriorityDAO } from '../interface/PriorityDAO';
import { CategorySearchValues } from '../interface/SearchObjects';
import { CommonService } from './common.service';


// глобальная переменная для хранения URL
export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class PriorityService extends CommonService<Priority> implements PriorityDAO {

  //@ts-ignore
  constructor(@Inject(PRIORITY_URL_TOKEN) private baseUrl,
    private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  findPriorities(categorySearchValues: CategorySearchValues) {
    return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
