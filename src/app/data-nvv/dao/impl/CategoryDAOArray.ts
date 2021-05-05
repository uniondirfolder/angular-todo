import { Observable, of } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { TestData } from "../../TestData";
import { CategoryDAO } from "../interface/CategoryDAO";

export class CategoryDAOArray implements CategoryDAO {
    search(title: string): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }
    add(arg: Category): Observable<Category> {
        if (arg.id === 0) { arg.id = this.getLastIdCategory(); }

        TestData.categories.push(arg);
        return of(arg);
    }
    private getLastIdCategory(): number { // for test array
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
    }
    get(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    delete(arg: Category): Observable<Category> {
        // перед удалением - нужно в задачах занулить все ссылки на удаленное значение
        // в реальной БД сама обновляет все ссылки (cascade update) - здесь нам приходится делать это вручную (т.к. вместо БД - массив)
        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === arg.id) {
                task.category = undefined;
            }
        });

        const tmpCategory = TestData.categories.find(t => t.id === arg.id); // удаляем по id
        if (tmpCategory != undefined) TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

        return of(arg);
    }
    update(arg: Category): Observable<Category> {
        const tmpCategory = TestData.categories.find(t => t.id === arg.id); // обновляем по id
        if (tmpCategory != undefined) TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, arg);

        return of(arg);
    }
    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }

}