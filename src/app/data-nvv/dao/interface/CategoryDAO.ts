import { Observable } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { CommonDAO } from "./CommonDAO";
import { CategorySearchValues } from "./SearchObjects";

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface CategoryDAO extends CommonDAO<Category> {
    // поиск категорий по любым параметрам, указанных в CategorySearchValues
    findCategories(categorySearchValues: CategorySearchValues): Observable<any>; // пошук категорії по назві
}