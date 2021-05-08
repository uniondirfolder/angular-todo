import { Observable } from "rxjs";
import { Stat } from "src/app/model-nvv/Stat";

// общая статистика по всем задачам
export interface StatDAO {

    getOverallStat(): Observable<Stat>;

}