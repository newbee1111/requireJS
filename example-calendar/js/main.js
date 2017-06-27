
require.config({
    paths:{
        "calendar":"calendar"
    }
});

require(['calendar'],function (calendar) {
    var input = document.getElementsByName('datepicker');
    for (var i = 0; i < input.length; i++){
        input[i].parentNode.addEventListener('click',function (e) {
            var evt = e || window.event,
                target = evt.target || evt.srcElement;
            if (target.tagName !== 'INPUT'){
                return;
            }
            if (document.getElementsByName('calendarSelections').length !== 0){
                calendar.removeCalendar(document.getElementsByName('calendarSelections')[0].parentNode);
            }
            calendar.datepicker(target);
        });
    }
});