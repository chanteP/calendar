/*
    calendar('2015-11-22'); 
    calendar('2015-11'); 
    calendar('11'); 
    calendar(new Date);

    output:
        Array([{year, month, date, day, timestamp, id}, ...])

    calendar.parseDate = dateString -> date
    calendar.getInfo = date -> dayInfo
*/
var MS = 1000 * 60 * 60 * 24;

var calendar = function(date){
    date = calendar.parseDate(date);
    var cur = calendar.getInfo(date);

    var monthFistDay = new Date(cur.year, cur.month, 1);
    var monthInfo = calendar.getInfo(monthFistDay);

    var result = [];
    result.currentDate = cur;

    for(var i = 0; i < 42; i++){
        var day = new Date(monthInfo.year, monthInfo.month, monthInfo.date - monthInfo.day - (monthInfo.day ? 0 : 7) + i);
        result.push(calendar.getInfo(day))
    }
    return result;
}
calendar.getInfo = function(date){
    if(typeof date === 'string'){
        date = calendar.parseDate(date);
    }
    var y = date.getFullYear(),
        M = +date.getMonth() + 1,
        d = +date.getDate();
    return {
        year : date.getFullYear(),
        month : date.getMonth(),
        date : date.getDate(),
        day : date.getDay(),
        dateString : [y, M < 10 ? '0' + M : M, d < 10 ? '0' + d : d].join('-'),
        timestamp : date.getTime(),
        id : Math.floor(date.getTime() / MS)
    }
}
calendar.transId = function(id){
    var date = new Date(id * MS);
    var info = calendar.getInfo(date);
    return info.year + '-' + (info.month + 1) + '-' + info.date;
}
calendar.parseDate = function(stringData){
    //Date
    //timestamp
    //2015-11-29 | 2015-11 | 11
    var date;
    if(Object.prototype.toString.call(stringData) === '[object Date]'){
        date = stringData;
    }
    else if(typeof stringData === 'number' && Number(stringData).length === 13){
        date = new Date(stringData)
    }
    else{
        var match = /^([\d]{4})?([\-\/])?([\d]{1,2})\2?([\d]{1,2})?/.exec(stringData);
        if(!match){
            date = new Date();
        }
        else{
            date = new Date(match[1] || new Date().getFullYear(), match[3] - 1, match[4] || 1);
        }
    }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}
export default calendar
