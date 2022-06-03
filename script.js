'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    rollback: 0,
    servicePercentPrice: 0,
    adaptive: true,
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Название проекта');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        }
        while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    getRollbackMessage: function (price) {
        if (price > 30000) {
            return 'Даем скидку в 10%';
        } else if (15000 < price && price <= 30000) {
            return 'Даем скидку в 5%';
        } else if (0 <= price && price <= 15000) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },
    getAllServicePrices: function () {
        let sum = 0;
        let num1,
            num2;

        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 1');

                do {
                    num1 = prompt('Сколько это будет стоить?');
                }
                while (!appData.isNumber(num1));

            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 2');

                do {
                    num2 = prompt('Сколько это будет стоить?');
                }
                while (!appData.isNumber(num2));
            }
        }
        sum = +num1.trim() + +num2.trim();
        return sum;
    },
    getFullPrice: function (screenPrice, allServicePrices) {
        return screenPrice + allServicePrices;
    },
    getTitle: function (string) {
        let lowCase = string.trim().toLowerCase();
        let uppCase = lowCase.charAt(0).toUpperCase() + lowCase.slice(1);
        return uppCase;
    },
    getServicePercentPrices: function (fullPrice, rollback) {
        return fullPrice - rollback;
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(+appData.screenPrice.trim(), appData.allServicePrices);
        appData.rollback = appData.fullPrice * (15 / 100);
        appData.servicePercentPrice = Math.ceil(appData.getServicePercentPrices(appData.fullPrice, appData.rollback));
        appData.title = appData.getTitle(appData.title);
        appData.logger();
    },
    logger: function () {
        for (let key in appData) {
            console.log(key);
        }
    }

};

appData.start();