export interface ITodoTask {
    id: number | string;
    context: string;
    isCompleted: boolean;
}

export class TodoTask implements ITodoTask {
    public readonly id: number | string;
    public context: string;
    public isCompleted: boolean;

    constructor(id: number | string, context: string, isCompleted: boolean = false) {
        this.id = id;
        this.context = context;
        this.isCompleted = isCompleted;
    }

    toString(): string {
        return `Id: ${this.id}, Context: ${this.context}, Completed: ${this.isCompleted} `;
    }
}
