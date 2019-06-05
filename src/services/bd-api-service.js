import stark from '../img/stark.jpg';
import leha from '../img/leha.jpeg';
import men from '../img/men.jpg';
import tigra from '../img/tigra.png';
import clever from '../img/clever.jpeg';

export default class BdApiService {

    _apiBase = 'http://localhost:8080';
    
    _employees = {
        '1': {id: '1', name: 'Алешенька', idBase: '1', rate: '300', img: leha},
        '2': {id: '2', name: 'Лев Петрович', idBase: '2', rate: '400', img: men},
        '3': {id: '3', name: 'Арья Старк', idBase: '3', rate: '400', img: stark},
        '4': {id: '4', name: 'Тигруля', idBase: '4', rate: '500', img: tigra},
        '5': {id: '5', name: 'Мечтающий инженер', idBase: '5', rate: '800', img: clever},
        '6': {id: '6', name: 'Тигруля', idBase: '4', rate: '500', img: tigra},
        '7': {id: '7', name: 'Лев Петрович', idBase: '2', rate: '400', img: men},
    };

    _departments = {
        'dept-1': {
            id: 'dept-1',
            title: 'Design',
            employeesIds: ['4']
        },
        'dept-2': {
            id: 'dept-2',
            title: 'Programming',
            employeesIds: ['3', '1']
        },
        'dept-3': {
            id: 'dept-3',
            title: 'SEO',
            employeesIds: []
        },
        'dept-4': {
            id: 'dept-4',
            title: 'Typesetting',
            employeesIds: ['6', '7']
        },
        'dept-5': {
            id: 'dept-5',
            title: 'Project management',
            employeesIds: ['5', '7']
        },
        'dept-6': {
            id: 'dept-6',
            title: 'Studio',
            employeesIds: ['2']
        },
    };

    _department_order = ['dept-6', 'dept-5', 'dept-4', 'dept-2', 'dept-1', 'dept-3'];

    _all_employees_list = [
        {id: '1', name: 'Алешенька'},
        {id: '2', name: 'Лев Петрович'},
        {id: '3', name: 'Арья Старк'},
        {id: '4', name: 'Тигруля'},
        {id: '5', name: 'Мечтающий инженер'}
    ];

    _personal_info = {
        id: '3',
        name: 'Арья Старк',
        role: 'studio',
        rate: '400 Y',
        img: stark,
        balance: '15 000 Y',
        balanceHistory: [
            {
                id: 1,
                date: '10.01.19',
                spending: '10 000',
                arrival: '',
                balance: '-10 000'
            },
            {
                id: 2,
                date: '20.01.19',
                spending: '25 000',
                arrival: '',
                balance: '-35 000'
            },
            {
                id: 3,
                date: '05.02.19',
                spending: '15 000',
                arrival: '50 000',
                balance: '0'
            },
            {
                id: 4,
                date: '15.02.19',
                spending: '10 000',
                arrival: '20 000',
                balance: '10 000'
            },
            {
                id: 5,
                date: '20.02.19',
                spending: '40 000',
                arrival: '55 000',
                balance: '15 000'
            },
        ]
    };

    _personal_reports = {
        4: [
            {
                id: 1,
                project_id: 4,
                date: '28.02.2019',
                reportText: 'Написал модуль синхронизации желаний заказчика со здравым смыслом.',
                time: '7h',
                status: 1
            },
            {
                id: 2,
                project_id: 4,
                date: '14.03.2019',
                reportText: 'Встретил Матушку, сходили в церковь. Помолился за наше мобильное приложение, поставил свечку. Должно сработать.',
                time: '4h',
                status: 0
            }
        ],
        5: [
            {
                id: 3,
                project_id: 5,
                date: '17.04.2019',
                reportText: 'Я сделал чертеж водонагревающей башни. Возможно это пригодится.',
                time: '8h',
                status: -1
            }
        ]
    };

    _transaction = [
        {
            id: '1',
            title: 'Затрата 1',
            expenditure: {
                idExp: '5',
                title: 'Подстатья 2'
            },
            whom: 'Подрядчику',
            date: '25.03.2019',
            summ: 12000
        },
        {
            id: '2',
            title: 'Выдача ДС',
            expenditure: {
                idExp: '11',
                title: 'Подстатья 8'
            },
            whom: 'Арья Старк',
            date: '25.06.2019',
            summ: 30000
        }
    ];


    getResource = async (url) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${this._apiBase}${url}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getProjectsNew = async () =>  {
        const res = await this.getResource(`/projects/new`);
        return res.projects;
    };

    getProjectsProcess = async () =>  {
        const res = await this.getResource(`/projects/process`);
        return res.projects;
    };

    getProjectsClose = async () => {
        const res = await this.getResource(`/projects/close`);
        return res.projects;
    };

    getExpenditure = async () => {
        const res = await this.getResource(`/finance/expenditure`);
        return res.expenditures;
    };

    getRequestsMoney= async () => {
        const res = await this.getResource(`/finance/request`);
        return res.requests;
    };

    getAllReports = async () => {
        const res = await this.getResource(`/report`);
        return res.reports;
    };

    getTransaction = async () => {
        const res = await this.getResource(`/finance/transaction`);
        return res.transaction;
    };

    getPersonalInfo() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._personal_info)
            }, 800);
        });
    }

    /**************************************************************/

    getEmployees() {
        return  new Promise( (resolve, reject) => {
            setTimeout (() => {
                resolve(this._employees)
            }, 800);
        });
    }

    getDepartments() {
        return  new Promise( (resolve, reject) => {
            setTimeout (() => {
                resolve(this._departments)
            }, 800);
        });
    }

    getDepartmentsOrder() {
        return  new Promise( (resolve, reject) => {
            setTimeout (() => {
                resolve(this._department_order)
            }, 800);
        });
    }



    getListEmployees() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._all_employees_list)
            }, 800);
        });
    }

    getPersonalReports() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._personal_reports)
            }, 800);
        });
    }

    employeeNewAdd (employee) {
        console.log('bd-api-service');
        console.log(employee);
        this._all_employees_list = [
            ...this._all_employees_list,
            employee
        ];
    }
}