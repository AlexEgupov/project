const title = 'Разработка сайтов';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 10000;
const rollback = 15;
const fullPrice = 20000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log('Стоимость верстки экранов ', screenPrice, ' рублей / долларов / гривен / юани');
console.log('Стоимость разработки сайта', fullPrice, 'рублей / долларов / гривен / юани');
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));