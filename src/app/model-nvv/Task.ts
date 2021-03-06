import { Category } from "./Category";
import { Priority } from "./Priority";

export class Task {
    id: number;
    title: string;
    completed: number; // вместо boolean, чтобы удобный было записывать в БД
    priority?: Priority;
    category?: Category;
    date?: Date;

    // сюда будет записывать старое значение,
    // которое изменили на новое (нужно для правильного обновления счетчиков категорий)
    //@ts-ignore
    oldCategory: Category;

    constructor(id: number, title: string, completed: number, priority?: Priority, category?: Category, date?: Date, oldCategory?: Category) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.priority = priority;
        this.category = category;
        this.date = date;
        if (oldCategory) this.oldCategory = oldCategory;
    }
}