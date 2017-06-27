
define(function () {
    var date = new Date();
    var now = {
        year:date.getFullYear(),
        month:date.getMonth(),
        day:date.getDate()
    };
    var getNowYear = function () {
        return now.year;
    };
    var getNowMonth = function () {
        return now.month;
    };
    var getNowDay = function () {
        return now.day;
    };
    var createDateObj = function (year,month,day) {
        return new Date(year,month,day);
    };
    var getMonthFirstDay = function (date) {
        var newDate = date;
        newDate.setDate(1);
        return newDate.getDay();
    };
    var getPreMonthTotalDay = function (date) {
        var newDate = date;
        newDate.setMonth(newDate.getMonth());
        newDate.setDate(0);
        return newDate.getDate();
    }
    return {
        getNowYear:getNowYear,
        getNowMonth:getNowMonth,
        getNowDay:getNowDay,
        create:createDateObj,
        getMonthFirstDay:getMonthFirstDay,
        getPreMonthTotalDay:getPreMonthTotalDay
    }
});