require.config({
    paths:{
        "date":"date"
    }
});

define(['date'],function (date) {
    var initSelectGroup = function () {
        var selectGroup
            =
            "<section name='calendarSelections'>" +
            "<select id='year'>" +
            "<option value='2020'>2020</option>"+
            "<option value='2019'>2019</option>"+
            "<option value='2018'>2018</option>"+
            "<option value='2017'>2017</option>"+
            "<option value='2016'>2016</option>"+
            "<option value='2015'>2015</option>"+
            "<option value='2014'>2014</option>"+
            "<option value='2013'>2013</option>"+
            "<option value='2012'>2012</option>"+
            "<option value='2011'>2011</option>"+
            "</select>"+
            "<button class='control-btn' id='decMonth'>&lt;</button>"+
            "<select id='month'>" +
            "<option value='1'>1</option>"+
            "<option value='2'>2</option>"+
            "<option value='3'>3</option>"+
            "<option value='4'>4</option>"+
            "<option value='5'>5</option>"+
            "<option value='6'>6</option>"+
            "<option value='7'>7</option>"+
            "<option value='8'>8</option>"+
            "<option value='9'>9</option>"+
            "<option value='10'>10</option>"+
            "<option value='11'>11</option>"+
            "<option value='12'>12</option>"+
            "</select>" +
            "<button class='control-btn' id='incMonth'>&gt;</button>"+
            "</section>";
        return selectGroup;
    };
    var initCalendar = function ( year, month ) {
        var y = parseInt(year,10) || date.getNowYear(),
            m = parseInt(month,10) || date.getNowMonth(),
            line = 0;
        var tableWrapper
            =
            "<table border='1' class='calendar-wrapper' id='calendarTable'><thead><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></thead>" +
            "<tbody>";
        var temp = date.getMonthFirstDay(date.create(y,m,date.getNowDay()));
        var preMonthDate = date.getPreMonthTotalDay(date.create(y,m,date.getNowDay()));
        var dayCounter = preMonthDate - temp + 2, nextMonthDay = 1;
        while(line < 6){
            tableWrapper += "<tr>";
            for (var d = 1; d <= 7; d++){
                if (line == 0 && d < temp){
                    tableWrapper+="<td class='preMonth'>"+ dayCounter +"</td>";
                    dayCounter++;
                }else if ((d+(line)*7 - temp+1) < date.create(y,m,0).getDate()){
                    tableWrapper+="<td class='curMonth'>"+ (d+(line)*7 - temp+1) +"</td>"
                }else{
                    tableWrapper+="<td class='nextMonth'>"+ nextMonthDay +"</td>";
                    nextMonthDay++;
                }
            }
            tableWrapper += "</tr>";
            line++;
        }
        tableWrapper+="</tbody></table>";
        return tableWrapper;
    };
    var init = function (ele) {
        var outYear, outMonth;
        var parentNode = ele.parentNode;
        parentNode.style.position = 'relative';
        var selectGroup = initSelectGroup();
        var tableWrapper = initCalendar();
        parentNode.innerHTML += selectGroup;
        parentNode.innerHTML += tableWrapper;
        var year = document.getElementById('year'),
            month = document.getElementById('month');
        var yearOptions = year.getElementsByTagName('option'),
            monthOptions = month.getElementsByTagName('option');
        for (var i = 0; i < yearOptions.length; i++){
            if (yearOptions[i].innerHTML == date.getNowYear()){
                outYear = date.getNowYear();
                yearOptions[i].setAttribute('selected','true');
            }
        }
        for (var i = 0; i < monthOptions.length; i++){
            if (monthOptions[i].innerHTML == date.getNowMonth() + 1){
                outMonth = date.getNowMonth();
                monthOptions[i].setAttribute('selected','true')
            }
        }

        /*year.onchange = function (e) {
            var evt = e || window.event,
                target = evt.target || evt.srcElement;
            var newtable = initCalendar(target.value, outMonth);
            outYear = target.value;
            parentNode.removeChild(parentNode.childNodes[4]);
            parentNode.innerHTML += newtable;dwq
        }
        month.onchange = function (e) {
            var evt = e || window.event,
                target = evt.target || evt.srcElement;
            var newtable = initCalendar(outYear, target.value);
            outMonth = target.value;
            parentNode.removeChild(parentNode.childNodes[4]);
            parentNode.innerHTML+= newtable;
        }*/
    };

    return {
        init:init
    }
});