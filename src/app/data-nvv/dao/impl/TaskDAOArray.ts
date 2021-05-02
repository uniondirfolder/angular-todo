import { Observable, of } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { Priority } from "src/app/model-nvv/Priority";
import { Task } from "src/app/model-nvv/Task";
import { TestData } from "../../TestData";
import { TaskDAO } from "../interface/TaskDAO";

export class TaskDAOArray implements TaskDAO {
    search(category: Category | boolean, searchText: string | boolean, status: boolean | string, priority: Priority | boolean): Observable<Task[]> {
        return of(this.searchTasks(category, searchText, status, priority));
    }
    private searchTasks(category: Category | boolean, searchText: string | boolean, status: boolean | string, priority: Priority | boolean): any {
        let allTasks = TestData.tasks;
        if (category != false) {
            allTasks = allTasks.filter(task => task.category === category);
        }
        return allTasks;
    }


    getCompletedCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }

    getUncompletedCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }

    getTotalCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }

    getTotalCount(): Observable<number> {
        throw new Error("Method not implemented.");
    }

    add(arg: Task): Observable<Task> {
        throw new Error("Method not implemented.");
    }

    get(id: number): Observable<Task | undefined> {
        return of(TestData.tasks.find(todo => todo.id === id));
    }

    delete(id: number): Observable<Task> {
        throw new Error("Method not implemented.");
    }

    update(arg: Task): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === arg.id);
        if (taskTmp!=undefined) TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, arg);
        console.log(arg)
        return of(arg);
    }

    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

}