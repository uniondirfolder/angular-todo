import { Observable } from "rxjs";
import { Priority } from "src/app/model-nvv/Priority";
import { PriorityDAO } from "../interface/PriorityDAO";

export class PriorityDAOArray implements PriorityDAO{
    add(arg: Priority): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    update(arg: Priority): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    getAll(): Observable<Priority[]> {
        throw new Error("Method not implemented.");
    }

}