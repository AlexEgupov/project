'use strict';

const title = document.getElementsByTagName('h1')[0];
const plusButton = document.querySelector('.screen-btn');
const otherItemsPer = document.querySelectorAll('.percent');
const otherItemsNum = document.querySelectorAll('.number');
const checkBox = document.querySelectorAll('.custom-checkbox');

const rangeInput = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let selectItems = document.querySelectorAll('select');
let screensInput = document.querySelectorAll('.screen input[type="text"]');
let screens = document.querySelectorAll('.screen');
let interval;

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
        this.addTitle();
        this.rollbackInput();

        startBtn.addEventListener('click', () => {
            this.isError = false;
            this.check();
        });
        resetBtn.addEventListener('click', () => {
            this.reset();
        });
        plusButton.addEventListener('click', this.addScreenBlock);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    check: function () {
        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select.value === '' || input.value === '') {
                this.isError = true;
            }
        });

        if (!this.isError) {
            this.start();
        } else {
            alert('Выберите тип и количество экранов.');
            return;
        }
    },
    start: function () {
        this.disable();
        this.addScreens();
        this.addServices();
        this.addPrices();
        // this.getServicePercentPrices();

        // this.logger();
        this.showResult();
    },
    disable: function () {
        selectItems = document.querySelectorAll('select');
        screensInput = document.querySelectorAll('.screen input[type="text"]');

        this.lockToggle(checkBox);
        this.lockToggle(selectItems);
        this.lockToggle(screensInput);

        plusButton.style.display = 'none';
        startBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
    },
    lockToggle: function (elem) {
        if (elem.length > 1) {
            elem.forEach((item) => {
                item.disabled = !item.disabled;
            });
        } else {
            elem[0].disabled = !elem[0].disabled;
        }
    },
    reset: function () {
        selectItems = document.querySelectorAll('select');
        screensInput = document.querySelectorAll('.screen input[type="text"]');

        while (screens.length > 1) {
            screens[screens.length - 1].remove();
            screens = document.querySelectorAll('.screen');
        }
        checkBox.forEach((elem) => {
            if (elem.checked) {
                elem.checked = !elem.checked;
            }
        });

        plusButton.style.display = 'inline-block';
        startBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
        screensInput[0].value = '';
        selectItems[0].value = '';

        this.lockToggle(checkBox);
        this.lockToggle(selectItems);
        this.lockToggle(screensInput);
        this.clear();
    },
    clear: function () {
        this.screens = [];
        this.screensCount = 0;
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.rollback = 0;
        this.servicePercentPrice = 0;
        this.showResult();
    },
    rollbackInput: function () {
        rangeInput.addEventListener('input', () => {
            rangeValue.textContent = rangeInput.value + '%';
            this.rollback = rangeInput.value;
            this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
            this.showResult();
        });
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.screensCount;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            const count = input.value;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: count
            });
        });
    },
    addServices: function () {
        otherItemsPer.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNum.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll('.screen');
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function () {

        this.screenPrice = this.screens.map(item => item.price).reduce((prev, curr) => prev + curr, 0);

        this.screensCount = this.screens.map(item => item.count).reduce((prev, curr) => +prev + +curr);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
    },
    logger: function () {
        for (let key in this) {
            console.log(key);
        }
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
    }

};

appData.init();
