import { Observable, of } from "rxjs";
import { Priority } from "src/app/model-nvv/Priority";
import { TestData } from "../../TestData";
import { PriorityDAO } from "../interface/PriorityDAO";

// реализация работы с приоритетами в виде массивов
// все методы DAO возвращают тип Observable, для реактивных возможностей
// для работы с БД - нужно изменить реализацию каждого метода, чтобы обращался не к массивам, а делал RESTful запрос или напрямую к БД

export class PriorityDAOArray implements PriorityDAO{
    add(arg: Priority): Observable<Priority> {
        if (arg.id === null || arg.id === 0) {
            arg.id = this.getLastIdPriority();
        }
        TestData.priorities.push(arg);

        return of(arg);
    }
    get(id: number): Observable<Priority| undefined> {
        return of(TestData.priorities.find(priority => priority.id === id));
    }
    delete(arg: Priority): Observable<Priority> {
        TestData.tasks.forEach(task => {
            if (task.priority && task.priority.id === arg.id) {
                task.priority.id = 0 ;
            }
        });

        const tmpPriority = TestData.priorities.find(t => t.id === arg.id); // удаляем по id
        if(tmpPriority !== undefined){
            TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);
            return of(tmpPriority);
        }

        return of(arg);
    }
    update(arg: Priority): Observable<Priority> {
        const tmp = TestData.priorities.find(t => t.id === arg.id); // обновляем по id
        if(tmp !== undefined) TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, arg);

        return of(arg);
    }
    getAll(): Observable<Priority[]> {
        return of(TestData.priorities);
    }

    getLastIdPriority(): number {
        return Math.max.apply(Math, TestData.priorities.map(c => c.id)) + 1;
    }

}