'use strict';

const title = getTitle(prompt('Как называется ваш проект?', 'Название проекта'));
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?', '10000'));
const service1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 1');
const servicePrice1 = parseFloat(prompt('Сколько это будет стоить?', '2000'));
const service2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 2');
const servicePrice2 = parseFloat(prompt('Сколько это будет стоить?', '3000'));
const adaptive = confirm('Нужен ли адаптив на сайте?');

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    if (price > 30000) {
        return 'Даем скидку в 10%';
    } else if (15000 < price && price <= 30000) {
        return 'Даем скидку в 5%';
    } else if (0 <= price && price >= 15000) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};

const getAllServicePrices = function (servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2;
};

function getFullPrice(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices;
};

function getTitle(string) {
    let lowCase = string.trim().toLowerCase();
    let uppCase = lowCase.charAt(0).toUpperCase() + lowCase.slice(1);
    return uppCase;
};

function getServicePercentPrices(fullPrice, rollback) {
    return fullPrice - rollback;
};

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const rollback = fullPrice * (15 / 100);
const servicePercentPrice = Math.ceil(getServicePercentPrices(fullPrice, rollback));

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log('Итоговая стоимость за вычетом отката посреднику', servicePercentPrice);
