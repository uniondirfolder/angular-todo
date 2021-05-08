import { Observable } from "rxjs";
import { Priority } from "src/app/model-nvv/Priority";
import { CommonDAO } from "./CommonDAO";
import { PrioritySearchValues } from "./SearchObjects";

// специфичные методы для работы приоритетами (которые не входят в обычный CRUD)
export interface PriorityDAO extends CommonDAO<Priority>{
    // поиск категорий по любым параметрам, указанных в PrioritySearchValues
    findPriorities(categorySearchValues: PrioritySearchValues): Observable<any>;
}