"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentDateTime = void 0;
const currentDateTime = () => {
    const date = new Date(Date.now());
    // const date = Date.now();
    console.log('date', date);
    const dateTime = date.toLocaleString(); // This will display the date and time in your local time zone
    console.log('dateTime', dateTime);
    return dateTime;
};
exports.currentDateTime = currentDateTime;
