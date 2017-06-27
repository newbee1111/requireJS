
require.config({
    paths:{
        "outFrame":"outFrame",
        "date":"date"
    }
});

define(["outFrame","date"],function (outFrame,date) {
    var init = outFrame.init;
    var clearTable = function (table) {
        var trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < trs.length; i++){
            var tds = trs[i].getElementsByTagName('td');
            for (var j = 0; j < tds.length; j++){
                tds[j].className = "";
                tds[j].innerHTML = "";
            }
        }
    };
    var fillTable = function (table,year,month) {
        clearTable(table);
        var newDate = date.create(year,month,0),
            monthTotalDay = newDate.getDate(),
            monthFirstDay = date.getMonthFirstDay(newDate),
            trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'),
            dayCounter = 1,
            preMonthTotalDay = date.getPreMonthTotalDay(newDate);
        if (monthFirstDay == 0){ //注意0表示的是星期日
            monthFirstDay = 7;
        }
        var preRestDate = preMonthTotalDay - monthFirstDay + 2;
        for (var i = 0 ; i < trs.length; i++){
            for (var j = 0; j <7; j++){
                var td = trs[i].getElementsByTagName('td')[j];
                if (i==0 && j < monthFirstDay-1){
                    td.className = "preMonth";
                    td.innerHTML = preRestDate;
                    preRestDate++;
                    continue;
                }
                if (dayCounter > monthTotalDay){
                    td.className = "nextMonth";
                    td.innerHTML = dayCounter - monthTotalDay;
                    dayCounter++;
                    continue;
                }
                td.className = 'curMonth';
                td.innerHTML = dayCounter;
                dayCounter++;
            }
        }
    };
    var awakeEvent = function (obj,evt) {
        if (obj.fireEvent){
            obj.fireEvent(evt);
        }else{
            obj.dispatchEvent(evt);
        }
    }
    var datepicker = function (ele) {
        init(ele);
        var table = document.getElementById('calendarTable'),
            year = document.getElementById('year'),
            month = document.getElementById('month'),
            decMonth = document.getElementById('decMonth'),
            incMonth = document.getElementById('incMonth'),
            evt = document.createEvent("HTMLEvents");
        evt.initEvent("change",false,true);
        year.onchange = function (e) {
            var evt = e || window.event,
                target = evt.target || evt.srcElement;
            fillTable(table,target.value,month.value);
        };
        month.onchange = function (e) {
            var evt = e || window.event,
                target = evt.target || evt.srcElement;
            fillTable(table,year.value,target.value);
        };
        decMonth.onclick = function () {
            if (month.value == 1){
                month.value = 12;
                awakeEvent(month,evt);
                return;
            }
            month.value--;
            awakeEvent(month,evt);
            return;
        };
        incMonth.onclick = function () {
            if (month.value == 12){
                month.value = 1;
                awakeEvent(month,evt);
                return;
            }
            month.value++;
            awakeEvent(month,evt);
        };
        table.addEventListener('click',function (e) {
            var evt = e || window.event,
                target = evt.target || evt.srcElement;
            if (target.tagName == 'TD'){
                if (target.className.indexOf('curMonth') >=0){
                    var targetValue = year.value + '-' + month.value + '-' + target.innerHTML;
                }else if (target.className.indexOf('preMonth')>=0){
                    var targetValue = year.value + '-' + (month.value-1) + '-' + target.innerHTML;
                }else{
                    var targetValue = year.value + '-' + (parseInt(month.value,10)+1) + '-' + target.innerHTML;
                }
                this.parentNode.getElementsByTagName('input')[0].setAttribute('value',targetValue);
                removeCalendar(this.parentNode);
            }
        })
    };
    var removeCalendar = function (obj) {
        if (obj.getElementsByTagName('table')[0]){
            obj.removeChild(obj.getElementsByTagName('table')[0]);
        }
        if (obj.getElementsByTagName('section')[0]){
            obj.removeChild(obj.getElementsByTagName('section')[0]);
        }
        return;
    };
    return {
        datepicker:datepicker,
        removeCalendar:removeCalendar
    }
});
