
import { Observable } from "rxjs";
import { Task } from "src/app/model-nvv/Task";
import { CommonDAO } from "./CommonDAO";
import { TaskSearchValues } from "./SearchObjects";

// специфичные методы для работы с задачами (которые не входят в обычный CRUD)
export interface TaskDAO extends CommonDAO<Task> {
    // поиск задач по любым параметрам из TaskSearchValues
    // если какой-либо параметр равен null - он не будет учитываться при поиске
    findTasks(taskSearchValues: TaskSearchValues): Observable<any>;
}