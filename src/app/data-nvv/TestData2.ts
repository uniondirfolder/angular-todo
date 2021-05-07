import { Category } from "../model-nvv/Category";
import { Priority } from "../model-nvv/Priority";
import { Task } from "../model-nvv/Task";

export class TestData {

    static categories: Category[] = [
        {id: 1, title: 'Робота'},
        {id: 2, title: 'Сім*я'},
        {id: 3, title: 'Навчання'},
        {id: 4, title: 'Відпочинок'},
        {id: 5, title: 'Спорт'},
        {id: 6, title: 'Їжа'},
        {id: 7, title: 'Фінанси'},
        {id: 8, title: 'Гаджети'},
        {id: 9, title: 'Здоров*я'},
        {id: 10, title: 'Автівка'},
        {id: 11, title: 'Ремонт'},
    ];

    static priorities: Priority[] = [
        {id: 1, title: 'Низкий', color: '#e5e5e5'},
        {id: 2, title: 'Середній', color: '#85D1B2'},
        {id: 3, title: 'Високий', color: '#F1828D'},
        {id: 4, title: 'Терміново!!!', color: '#F1128D'}
    ];

    static tasks: Task[] = [
        {
            id: 1,
            title: 'Заправити автівку',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[9],
            date: new Date('2021-05-10')
        },

        {
            id: 2,
            title: 'Надіслати звіти',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[0],
            date: new Date('2021-05-11')
        },

        {
            id: 3,
            title: 'Прибрати кімнату, полити квіти',
            priority: TestData.priorities[2],
            completed: true,
            category: TestData.categories[1]
        },

        {
            id: 4,
            title: 'Відпочити у парку з рідними. Можливо запросити друзів',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[1],
            date: new Date('2021-06-17')
        },
        {
            id: 5,
            title: 'Знайти підручник з Angular, вичити усе',
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 6,
            title: 'Вебінар з Angular',
            priority: TestData.priorities[1],
            completed: true,
            category: TestData.categories[2],
            date: new Date('2021-06-11')
        },

        {
            id: 7,
            title: 'Замовити авіобілети Земля-Луна',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[3]
        },
        {
            id: 8,
            title: 'Приготувати страви на вечерю (бамбарун в томатному соусі, інше на вибір рідних)',
            completed: false,
            category: TestData.categories[5]
        },
        {
            id: 9,
            title: 'Підтягнутися 10 разів (не вср**я)',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2021-06-12')
        },
        {
            id: 10,
            title: 'Пробігти 1 км',
            priority: TestData.priorities[0],
            completed: true,
            category: TestData.categories[4]
        },

        {
            id: 11,
            title: 'Організувати дитяче свято',
            completed: false
        },

        {
            id: 12,
            title: 'Мітінг "Як програмувати на LILU"',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 13,
            title: 'Закупити продукти на тиждень',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[5],
            date: new Date('2021-07-11')
        },

        {
            id: 14,
            title: 'Скрам по проекту',
            completed: true,
            category: TestData.categories[0]
        },

        {
            id: 15,
            title: 'Скласти іспит з Angular',
            priority: TestData.priorities[2],
            completed: true
        },


        {
            id: 16,
            title: 'Відкрити депозит у банку на 100 000 долярів',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[6]
        },

        {
            id: 17,
            title: 'Сповістити команду про майбутню премію',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[6]
        },

        {
            id: 18,
            title: 'Завітати до сімейного лікаря',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[8],
            date: new Date('2020-07-11')

        },

        {
            id: 19,
            title: 'Зрівняти нову модель айпад з самсунгом',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[7],
            date: new Date('2021-07-11')

        },

        {
            id: 20,
            title: 'Хокей з командою',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2021-07-17')

        }

    ];
}