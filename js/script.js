'use strict';

const title = document.getElementsByTagName('h1')[0];
const plusButton = document.querySelector('.screen-btn');
const otherItemsPer = document.querySelectorAll('.percent');
const otherItemsNum = document.querySelectorAll('.number');

const rangeInput = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screensCount: 0,
    screenPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    rollback: 0,
    servicePercentPrice: 0,
    adaptive: true,
    isError: false,
    init: function () {
        appData.addTitle();
        appData.rollbackInput();

        startBtn.addEventListener('click', () => {
            appData.isError = false;
            appData.check();
        });
        plusButton.addEventListener('click', appData.addScreenBlock);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    check: function () {
        screens.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select.value === '' || input.value === '') {
                appData.isError = true;
            }
        });

        if (!appData.isError) {
            appData.start();
        } else {
            return;
        }
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.getServicePercentPrices();

        // appData.logger();
        appData.showResult();
    },
    rollbackInput: function () {
        rangeInput.addEventListener('input', () => {
            rangeValue.textContent = rangeInput.value + '%';
            appData.rollback = rangeInput.value;
        });
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.screensCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            const count = input.value;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: count
            });
        });
    },
    addServices: function () {
        otherItemsPer.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNum.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function () {

        appData.screenPrice = appData.screens.map(item => item.price).reduce((prev, curr) => prev + +curr, 0);

        appData.screensCount = appData.screens.map(item => item.count).reduce((prev, curr) => prev + +curr, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    logger: function () {
        for (let key in appData) {
            console.log(key);
        }
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
    }

};

appData.init();
