'use strict';

const title = document.getElementsByTagName('h1')[0];
const hundlerButtons = document.getElementsByClassName('handler_btn');
const plusButton = document.querySelector('.screen-btn');
const otherItemsPer = document.querySelectorAll('.percent');
const otherItemsNum = document.querySelectorAll('.number');
const rangeInput = document.querySelector('.rollback > .main-controls__range > input');
const rangeValue = document.querySelector('.rollback > .main-controls__range > span');
const totalInputs = document.getElementsByClassName('total-input');
let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    services: [],
    allServicePrices: 0,
    fullPrice: 0,
    rollback: 0.1,
    servicePercentPrice: 0,
    adaptive: true,
    start: function () {
        appData.asking();
        appData.appPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    isString: function (str, question) {
        do {
            str = prompt(question);
        } while (appData.isNumber(str));

        return str;
    },
    asking: function () {

        appData.title = appData.isString(appData.title, 'Как называется ваш проект?');

        for (let i = 0; i < 2; i++) {
            let str;
            let name = appData.isString(str, 'Какие типы экранов нужно разработать?');
            let price = 0;

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price.trim() });
        }

        for (let i = 0; i < 2; i++) {
            let str;
            let name = appData.isString(str, 'Какой дополнительный тип услуги нужен?');
            let price = 0;

            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            appData.services.push({ id: i, name: name, price: +price.trim() });
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    appPrices: function () {

        appData.screenPrice = appData.screens.map(item => item.price).reduce((prev, curr) => prev + +curr, 0);

        for (let service of appData.services) {
            appData.allServicePrices += service.price;
        }
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
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * appData.rollback));
    },
    logger: function () {
        for (let key in appData) {
            console.log(key);
        }
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
    }

};

appData.start();
