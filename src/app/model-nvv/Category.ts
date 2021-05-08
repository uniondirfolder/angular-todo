export class Category {
    id: number;
    title: string;
    completedCount: number = 0;
    uncompletedCount: number = 0;

    // ? означает необязательный для передачи параметр
    constructor(id: number, title: string, completedCount?: number, uncompletedCount?: number) {
        this.id = id;
        this.title = title;
        if (completedCount) this.completedCount = completedCount;
        if (uncompletedCount) this.uncompletedCount = uncompletedCount;
    }
}