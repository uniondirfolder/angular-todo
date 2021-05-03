import { Observable } from "rxjs";

export interface CommonDAO<T> { // обобщеный интерфейс
    // CRUD

    add(arg: T): Observable<T>;

    get(id: number): Observable<T | undefined>;

    delete(arg: T): Observable<T>;

    update(arg: T): Observable<T>;

    getAll(): Observable<T[]>;
}

