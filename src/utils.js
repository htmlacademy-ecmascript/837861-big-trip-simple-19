import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM YYYY';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const humanizeDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export { getRandomArrayElement, getRandomNumber, humanizeDate, capitalizeFirstLetter };
