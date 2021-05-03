import { Observable, of } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { TestData } from "../../TestData";
import { CategoryDAO } from "../interface/CategoryDAO";

export class CategoryDAOArray implements CategoryDAO{
    search(title: string): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }
    add(arg: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    delete(arg: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    update(arg: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }

}