// все возможные параметры поиска категорий
export class CategorySearchValues {
    title: string = '';
}

// все возможные параметры поиска приоритетов
export class PrioritySearchValues {
    title: string = '';
}

// все возможные параметры поиска категорий
export class TaskSearchValues {

    // начальные значения по-умолчанию
    title = '';
    completed: number = 0;
    priorityId: number = 0;
    categoryId: number = 0;
    pageNumber = 0; // 1-я страница (значение по-умолчанию)
    pageSize = 5; // сколько элементов на странице (значение по-умолчанию)

    // сортировка
    sortColumn = 'title';
    sortDirection = 'asc';

}