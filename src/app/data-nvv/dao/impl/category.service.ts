import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Category } from 'src/app/model-nvv/Category';
import { CategoryDAO } from '../interface/CategoryDAO';
import { CategorySearchValues } from '../interface/SearchObjects';
import { CommonService } from './common.service';

// глобальная переменная для хранения URL
export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным

export class CategoryService extends CommonService<Category> implements CategoryDAO {
  //@ts-ignore 
  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl,
    private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  findCategories(categorySearchValues: CategorySearchValues) {
    return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}

