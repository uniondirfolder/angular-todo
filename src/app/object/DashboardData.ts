// данные для отображения дашбоарда сверху страницы
export class DashboardData {
    completedTotal: number = 0;
    uncompletedTotal: number = 0;

    constructor(completedTotal?: number, uncompletedTotal?: number) {
        if (completedTotal) this.completedTotal = completedTotal;
        if (uncompletedTotal) this.uncompletedTotal = uncompletedTotal;
    }
}