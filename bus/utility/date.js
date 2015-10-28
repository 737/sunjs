define(['cUtilDate', 'CalendarTools'], function (cDate, CalendarTools) {



    var M = {};

    /**
    * 获得该Date的所有的节假日信息(公历，农历)
    * @author: ouxz@ctrip.com
    * 
    */
    M.getDateInfo = function (date, curDate) {
        var cal = CalendarTools.calendar;
        var cdaykey = cal.solarDay2(date),
            cMonth = parseInt(cdaykey.substr(0, 2)),
            cDay = parseInt(cdaykey.substr(2, 2)),
            month = String(date.getMonth() + 1),
            day = String(date.getDate()),
            daykey = (month.length == 1 ? '0' + month : month) + (day.length == 1 ? '0' + day : day),
            week = date.getDay();
        curDate = curDate || new Date();

        var curDays = function(a,b){
            a = new Date(a.valueOf());
            b = new Date(b.valueOf());
            a.setHours(0,0,0,0);
            b.setHours(0,0,0,0);
            return parseInt((a - b) / 86400000);
        }(date,curDate);

        var dayTit = ['今天', '明天', '后天'][ curDays];

        var dateTit = cal.cDay(cMonth, cDay);
        var cmontht = dateTit.split('月')[0] + '月';
        var cdayt = dateTit.split('月')[1];

        var ldate = new cDate(date);
        return {
            festival: cal.CONSTANT.CALENDAR_COMMON_HOLIDAY[daykey] || '', //公历节日
            week1: cal.CONSTANT.CALENDAR_WEEKDAY_NAME[week] || '', //周
            week2: cal.CONSTANT.CALENDAR_WEEKDAY_SHORTNAME[week] || '', //周
            week3: cal.CONSTANT.CALENDAR_WEEKDAY_SHORTNAME2[week] || '', //周
            YYMMDD: ldate.format('Y年n月j日'),
            MMDD: ldate.format('n月j日'),                                            //公历日期
            cfestival: cal.CONSTANT.CALENDAR_CHINESE_HOLIDAY[cdaykey] || '', //农历节日
            cdate: dateTit || '', //农历月日
            cmonth: cmontht || '', //农历月
            cday: cdayt || '',   //农历日
            cdaykey: cdaykey,    //农历key
            daykey: daykey,       //公历key
            dayTit: dayTit || ''
        };
    };

    /**
     * 得到当前的时间
     * @param offset {Number} 偏移的时间
     * @param baseDate {Date} 可选 默认时间
     * @return {Date}
     * 
     */
    M.now = function(offset,baseDate){
        offset = offset || 0;
        baseDate = new Date((baseDate || cDate.getServerDate()).valueOf() + offset);
        
        return baseDate;
    }

    return M;
});