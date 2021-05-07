import { Observable, of } from "rxjs";
import { Category } from "src/app/model-nvv/Category";
import { Priority } from "src/app/model-nvv/Priority";
import { Task } from 'src/app/model-nvv/Task';
import { TestData } from '../../TestData';
import { FilterStateTask } from "../enum/FilterStateTasks";
import { NoValue } from "../enum/NoValue";
import { TaskDAO } from "../interface/TaskDAO";

// реализация работы с задачами в виде массивов
// все методы DAO возвращают тип Observable, для реактивных возможностей
// для работы с БД - нужно изменить реализацию каждого метода, чтобы обращался не к массивам, а делал RESTful запрос или напрямую к БД
export class TaskDAOArray implements TaskDAO {
    search(category: Category | NoValue, searchText: string | NoValue, status: boolean | FilterStateTask, priority: Priority | NoValue): Observable<Task[]> {
        return of(this.searchTasks(category, searchText, status, priority));
    }

    searchTasks(category: Category | NoValue, searchText: string | NoValue, status: boolean | FilterStateTask | NoValue.Yes, priority: Priority | NoValue): Task[] {
        let allTasks = TestData.tasks;
        // застосовуємо по черзі всі вимоги до пошуку і фільтрації
        if (typeof (status) !== 'string') { // costyl :)
            allTasks = allTasks.filter(task => task.completed === status);
        }
        if (typeof (status) === 'string') {
            if (status === FilterStateTask.Solved) {
                allTasks = allTasks.filter(task => task.completed === true);
            }
            if (status === FilterStateTask.Unsolved) {
                allTasks = allTasks.filter(task => task.completed === false);
            }
        }
        if (category !== NoValue.Yes) {
            if (category.id !== 0) {// якщо ні то повертаємо усі таски - позиція категорія "ВСІ"
                allTasks = allTasks.filter(task => task.category === category);
            }
        }
        if (priority !== NoValue.Yes) {
            if (priority.id !== 0) {
                allTasks = allTasks.filter(task => task.priority === priority);
            }
        }
        if (searchText !== NoValue.Yes) {
            const template = searchText.toUpperCase();
            allTasks = allTasks.filter(
                task =>
                    task.title.toUpperCase().includes(template)
            );
        }
        return allTasks;
    }
    // -----------------------------------------------------------------------------
    // кол-во завершенных задач в заданной категории (если category === id=0, то для всех категорий)
    getCompletedCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(this.categoryIsNull(category), NoValue.Yes, true, NoValue.Yes).length)
    }
    // кол-во не завершенных задач в заданной категории 
    getUncompletedCountInCategory(category: Category | undefined): Observable<number> {
        return of(this.searchTasks(this.categoryIsNull(category), NoValue.Yes, false, NoValue.Yes).length)
    }

    getTotalCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(this.categoryIsNull(category), NoValue.Yes, NoValue.Yes, NoValue.Yes).length)
    }

    getTotalCount(): Observable<number> {
        return of(TestData.tasks.length);
    }
    categoryIsNull(category: Category | undefined): Category | NoValue {
        if(category===undefined){return NoValue.Yes}
        if (category.id === 0) { return NoValue.Yes }
        return category;
    }
    // -----------------------------------------------------------------------------
    add(arg: Task): Observable<Task> {
        // if id empty - generete
        if (arg.id === 0) { arg.id = this.getLastIdTask(); }
        TestData.tasks.push(arg);
        return of(arg);
    }
    getLastIdTask(): number { // for test array
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
    }

    get(id: number): Observable<Task | undefined> {
        return of(TestData.tasks.find(todo => todo.id === id));
    }

    delete(arg: Task): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === arg.id);
        if (taskTmp !== undefined) TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
        return of(arg);
    }

    update(arg: Task): Observable<Task> {
        const taskTmp = TestData.tasks.find(t => t.id === arg.id);
        if (taskTmp !== undefined) TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, arg);
        return of(arg);
    }

    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

}
