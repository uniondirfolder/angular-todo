
import { Observable } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { Priority } from "src/app/model-nvv/Priority";
import { Task } from "src/app/model-nvv/Task";
import { CommonDAO } from "./CommonDAO";

export interface TaskDAO extends CommonDAO<Task> {
    // поиск задач по всем параметрам
    //если кокай-либо параметр null - он не будет учитываться при поиске
    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

    // кол-во завершенных задач в заданой категории
    getCompletedCountInCategory(category: Category): Observable<number>;

    // кол-во незавершенных задач в заданой категории
    getUncompletedCountInCategory(category: Category): Observable<number>;

    // кол-во всех задач в заданой категории
    getTotalCountInCategory(category: Category): Observable<number>;

    //кол-во всех задач в общем
    getTotalCount(): Observable<number>;
}