import { Priority } from "src/app/model-nvv/Priority";
import { CommonDAO } from "./CommonDAO";

export interface PriorityDAO extends CommonDAO<Priority>{
    // здесь будут специфичные методы для работы с категориями
}