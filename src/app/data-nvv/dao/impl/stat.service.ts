import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Stat } from 'src/app/model-nvv/Stat';
import { StatDAO } from '../interface/StatDAO';

// глобальная переменная для хранения URL
export const STAT_URL_TOKEN = new InjectionToken<string>('url');

// класс реализовывает методы доступа к данным с помощью RESTful запросов в формате JSON
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})
export class StatService implements StatDAO{

  //@ts-ignore
  constructor(@Inject(STAT_URL_TOKEN) private baseUrl,
  private http: HttpClient // для выполнения HTTP запросов
  ) { }

  // общая статистика
  getOverallStat(): Observable<Stat> {
    return this.http.get<Stat>(this.baseUrl);
  }
}
