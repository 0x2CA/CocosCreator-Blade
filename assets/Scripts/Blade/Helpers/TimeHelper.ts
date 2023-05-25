import { Duration, Moment } from "../Libs/Moment/moment";

class TimeHelper {

    public static getMoment() {
        return moment(blade.timer.getTime()) as Moment;
    }

    public static FormatDate(date: Date, fmt: string) { //author: meizz
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    public static FormatTime(time: Duration, fmt: string) { //author: meizz
        let o = {
            "M+": time.months() + 1, //月份
            "d+": time.days(), //日
            "h+": time.hours(), //小时
            "m+": time.minutes(), //分
            "s+": time.seconds(), //秒
            "q+": Math.floor((time.months() + 3) / 3), //季度
            "S": time.milliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.years() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}


export default TimeHelper;