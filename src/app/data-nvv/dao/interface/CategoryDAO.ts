import { Observable } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { CommonDAO } from "./CommonDAO";

export interface CategoryDAO extends CommonDAO<Category> {
    search(title: string): Observable<Category[]>; // пошук категорії по назві
}