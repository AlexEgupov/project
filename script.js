'use strict';

const title = prompt('Как называется ваш проект?', 'Название проекта');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?', '10000'));
const service1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 1');
const servicePrice1 = parseFloat(prompt('Сколько это будет стоить?', '2000'));
const service2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительная услуга 2');
const servicePrice2 = parseFloat(prompt('Сколько это будет стоить?', '3000'));
const fullPrice = (screenPrice + servicePrice1 + servicePrice2);
const adaptive = confirm('Нужен ли адаптив на сайте?');
const rollback = fullPrice * (15 / 100);
const servicePercentPrice = Math.ceil(fullPrice - rollback);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log('Стоимость верстки экранов ', screenPrice, ' рублей');
console.log('Стоимость разработки сайта', fullPrice, ' рублей');
console.log(screens.toLowerCase().split(", "));
console.log('Процент отката посреднику за работу', rollback);
console.log('Итоговая стоимость за вычетом отката посреднику', servicePercentPrice);

switch (true) {
    case fullPrice > 30000:
        console.log('Даем скидку в 10%');
        break;
    case 15000 < fullPrice && fullPrice <= 30000:
        console.log('Даем скидку в 5%');
        break;
    case 0 <= fullPrice && fullPrice >= 15000:
        console.log('Скидка не предусмотрена');
        break;
    default:
        console.log('Что то пошло не так');
        break;
}