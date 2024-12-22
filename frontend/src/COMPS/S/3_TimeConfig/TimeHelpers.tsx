import { useTLBaseBgHelpers } from "../1_TLBaseBg/TLBaseBgHelpers";
import { useTLBaseBgStore } from "../1_TLBaseBg/TLBaseBgStore";
import { clvs, miliperh, sr, tt } from "../TLConstants";
import {
    cDate,
    cDateOption,
    CevelC,
    d,
    h,
    m,
    p,
    TimeTitle,
    y,
} from "../TLTypes";
import { timeConfig, useTimeConfigStore } from "./TimeConfigStore";
import { getWeek } from "date-fns";

export const useTimeHelpers = () => {
    const { timeConfig, setTimeConfig } = useTimeConfigStore();
    const { dateToCDate, h$G_BgEnd } = useTLBaseBgHelpers();
    const { TIList, setZoomLv, keyboardState, dateReal, setFrameScrollLeft } = useTLBaseBgStore();

    const changeTimeStart = (prev: "prev" | "next") => {
        const numb = prev === "prev" ? -1 : 1;
        setZoomLv(1);
        switch (clvs[timeConfig.cevelId].cevelC) {
            case sr.decade.c:
                setTimeConfig({
                    ...timeConfig,
                    timeStart: addTime(
                        timeConfig.timeStart,
                        10 * numb,
                        0,
                        0,
                        0,
                        0
                    ),
                });
                break;
            case sr.year.c:
                setTimeConfig({
                    ...timeConfig,
                    timeStart: addTime(timeConfig.timeStart, numb, 0, 0, 0, 0),
                });
                break;
            case sr.month.c:
                setTimeConfig({
                    ...timeConfig,
                    timeStart: addTime(timeConfig.timeStart, 0, numb, 0, 0, 0),
                });
                break;
            case sr.week.c:
                setTimeConfig({
                    ...timeConfig,
                    timeStart: dateToCDate(
                        prev === "prev"
                            ? getDate$LastMonday(new Date(TIList[0].date))
                            : getDate$NextMonday(new Date(TIList[0].date))
                    ),
                });
                break;
            case sr.day.c:
                setTimeConfig({
                    ...timeConfig,
                    timeStart: addTime(timeConfig.timeStart, 0, 0, numb, 0, 0),
                });
                break;
            default:
                break;
        }
    };
    const changeLevel = (updown: "up" | "down") => {
        if (timeConfig.cevelId===5 && updown === "up") return;
        // if (timeConfig.cevelId===0 && updown === "down") return;
        if (0<=timeConfig.cevelId && timeConfig.cevelId<=5) {
            const newCevelId = timeConfig.cevelId + (updown === "up" ? 1 : -1);
            if(newCevelId<0 || newCevelId>6) return;
            setTimeConfig({
                timeStart:
                    clvs[newCevelId].cevelC === sr.century.c
                        ? dateToCDate(getDate$FirstDayOfCurrentCentury())
                        : clvs[newCevelId].cevelC === sr.decade.c
                        ? dateToCDate(getDate$FirstDayOfCurrentDecade())
                        : clvs[newCevelId].cevelC === sr.year.c
                        ? dateToCDate(getDate$FirstDayOfCurrentYear())
                        : clvs[newCevelId].cevelC === sr.month.c
                        ? dateToCDate(getDate$FirstDayOfCurrentMonth())
                        : clvs[newCevelId].cevelC === sr.week.c
                        ? dateToCDate(getDate$MondayOfCurrentWeek())
                        : clvs[newCevelId].cevelC === sr.day.c
                        ? getDateOf("Today")
                        : dateToCDate(new Date()),
                cevelId: newCevelId,
            });
        }
    };
    const clickNow = () => {
        setTimeConfig({ cevelId: 5, timeStart: getDateOf("Today") });
        setFrameScrollLeft(0);
        setZoomLv(1);
    };
    const isPast = (timeEnd: cDate) => cDateToGh(timeEnd) < cDateToGh(dateToCDate(dateReal));
    const isFuture = (timeEnd: cDate) => cDateToGh(timeEnd) > cDateToGh(dateToCDate(dateReal));

    return { 
        changeTimeStart, 
        changeLevel, 
        clickNow, 
        isPast,
        isFuture,
    };
};

// B1. to CDate
export const numbToCDate = (y: y, m: m, d: d, h: h, p: p): cDate => {
    const pad = (num: number): string => num.toString().padStart(2, "0");
    const year = y.toString();
    const month = pad(m);
    const day = pad(d);
    const hour = pad(h);
    const minute = pad(p);

    return `${year}-${month}-${day}T${hour}:${minute}:00.000+07:00` as cDate;
};
export const dateToCDate = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const p = date.getMinutes();
    return numbToCDate(y, m, d, h, p);
};
export const GhToCDate = (h: number) => dateToCDate(new Date(h * miliperh));
export const cDateToUTCDate = (date: cDate) => new Date(date).toISOString();

// B2. parse
export const parseCDate = (date: cDate) => parseDate(new Date(date));
export const parseDate = (date: Date) => {
    return {
        y: date.getFullYear(),
        m: date.getMonth() + 1, // Tháng bắt đầu từ 0, nên cần +1
        d: date.getDate(),
        h: date.getHours(),
        p: date.getMinutes(),
    };
};

// B3. to h
export const cDateToGh = (date: cDate) =>
    date ? new Date(date).getTime() / miliperh : 0;
export const pxToRh = (px: number, hPerPx: number) => px * hPerPx;

// B4. add time
export const addTime = (
    date: cDate,
    years: number,
    month: number,
    day: number,
    hour: number,
    min: number
): cDate => {
    const date0 = new Date(date);
    const newDate = new Date(date);
    newDate.setFullYear(date0.getFullYear() + years);
    const newDate2 = new Date(new Date(newDate));
    newDate2.setMonth(date0.getMonth() + month);
    const newDate3 = new Date(new Date(newDate2));
    newDate3.setDate(date0.getDate() + day);
    const newDate4 = new Date(new Date(newDate3));
    newDate4.setHours(date0.getHours() + hour);
    const newDate5 = new Date(new Date(newDate4));
    newDate5.setMinutes(date0.getMinutes() + min);

    return dateToCDate(newDate5);
};

export const hToRoundedHM = (
    h: number,
    isRoundM?: boolean
): { roundedH: number; roundedM: number } => {
    let roundedH = Math.floor(h);
    const decimalPart = h - roundedH;
    const rawMinutes = decimalPart * 60;
    let roundedM = rawMinutes;
    if (isRoundM) {
        roundedM = Math.round(rawMinutes / 15) * 15;
    }

    // Nếu số phút là 60, đặt lại thành 0 và tăng giờ lên 1
    if (roundedM === 60) {
        roundedM = 0;
        roundedH += 1;
    }

    return { roundedH, roundedM };
};

// B6. get Month's name
export const getMonthShortName = (month: number) => {
    switch (month) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
        default:
            return "";
    }
};

export const getMonthFullName = (month: number) => {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "";
    }
};

// B.7 get day of Monday
export function getDate$MondayOfCurrentWeek(date: Date = new Date()) {
    const today = new Date(date); // Lấy ngày hiện tại
    const dayOfWeek = today.getDay(); // Lấy chỉ số của ngày trong tuần (0: Chủ nhật, 1: Thứ Hai, ...)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Tính khoảng cách đến Thứ Hai
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday); // Cập nhật ngày thành Thứ Hai
    return new Date(
        monday.getFullYear(),
        monday.getMonth(),
        monday.getDate(),
        0,
        0,
        0,
        0
    );
}
export function getDate$NextMonday(date: Date = new Date()) {
    const today = new Date(date); // Lấy ngày hiện tại
    const currentDay = today.getDay(); // Lấy chỉ số ngày trong tuần (0: Chủ nhật, 1: Thứ Hai, ...)

    // Tính số ngày cần thêm để đến thứ Hai tuần sau
    const daysUntilNextMonday = currentDay === 0 ? 1 : 8 - currentDay;

    // Thêm số ngày đó vào ngày hiện tại
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);

    return new Date(
        nextMonday.getFullYear(),
        nextMonday.getMonth(),
        nextMonday.getDate(),
        0,
        0,
        0,
        0
    );
}
export function getDate$LastMonday(date: Date = new Date()): Date {
    const today = new Date(date); // Lấy ngày hiện tại
    const currentDay = today.getDay(); // Lấy chỉ số ngày trong tuần (0: Chủ nhật, 1: Thứ Hai, ...)

    const daysSinceLastMonday = currentDay === 0 ? 6 : currentDay - 1 + 7;

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceLastMonday);

    return new Date(
        lastMonday.getFullYear(),
        lastMonday.getMonth(),
        lastMonday.getDate(),
        0,
        0,
        0,
        0
    );
}

// B.8 get Year's name
export function getDate$FirstDayOfLastMonth(date: Date = new Date()) {
    const firstDayOfPreviousMonth = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        1
    ); // Ngày đầu tiên của tháng trước
    return firstDayOfPreviousMonth;
}

export function getDate$FirstDayOfCurrentMonth(date: Date = new Date()) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1); // Ngày đầu tiên của tháng
    return firstDay;
}
export function getDate$FirstDayOfNextMonth(date: Date = new Date()) {
    const firstDayOfNextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
    ); // Ngày đầu tiên của tháng tiếp theo
    return firstDayOfNextMonth;
}

export function getDate$FirstDayOfLastYear(date: Date = new Date()) {
    const firstDayOfLastYear = new Date(date.getFullYear() - 1, 0, 1); // Ngày đầu tiên của năm ngoái
    return firstDayOfLastYear;
}
export function getDate$FirstDayOfCurrentYear(date: Date = new Date()) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1); // Ngày đầu tiên của năm
    return firstDayOfYear;
}
export function getDate$FirstDayOfNextYear(date: Date = new Date()) {
    const nextYear = date.getFullYear() + 1; // Năm tiếp theo
    const firstDayOfNextYear = new Date(nextYear, 0, 1); // Ngày đầu tiên của năm tới
    return firstDayOfNextYear;
}
export function getDate$FirstDayOfCurrentDecade(date: Date = new Date()) {
    const currentYear = date.getFullYear(); // Lấy năm hiện tại
    const startOfDecade = Math.floor(currentYear / 10) * 10; // Tính năm đầu tiên của thập kỷ
    const firstDayOfDecade = new Date(startOfDecade, 0, 1); // Tạo ngày đầu tiên của thập kỷ
    return firstDayOfDecade;
}
export function getDate$FirstDayOfCurrentCentury(date: Date = new Date()) {
    const currentYear = date.getFullYear(); // Lấy năm hiện tại
    const startOfCentury = Math.floor(currentYear / 100) * 100; // Tính năm đầu tiên của thế kỷ
    const firstDayOfCentury = new Date(startOfCentury, 0, 1); // Ngày 1 tháng 1 của năm đầu tiên của thế kỷ
    return firstDayOfCentury;
}
export function getDAYOfWeek(date: Date) {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = new Date(date).getDay(); // Lấy chỉ số ngày trong tuần
    return days[dayIndex]; // Trả về tên ngày
}

function isEqualDate(date1: cDate, date2: cDate) {
    const { y: year1, m: month1, d: day1 } = parseCDate(date1);
    const { y: year2, m: month2, d: day2 } = parseCDate(date2);

    return year1 === year2 && month1 === month2 && day1 === day2;
}
export function getTimeTitle(timeConfig: timeConfig): TimeTitle | string {
    const cevelC = clvs[timeConfig.cevelId].cevelC;
    const timeStart = timeConfig.timeStart;

    const { y, m, d, h, p } = parseCDate(timeStart);
    const paddedD = d.toString().padStart(2, "0");
    const paddedM = m.toString().padStart(2, "0");
    const dayStr = `${paddedD}.${paddedM}`;

    switch (cevelC) {
        case sr.hour.c:
        case sr.day.c:
            if (isEqualDate(timeStart, getDateOf(tt.today as TimeTitle)))
                return tt.today as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.tomorrow as TimeTitle))
            )
                return tt.tomorrow as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.yesterday as TimeTitle))
            )
                return tt.yesterday as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.afterTomorrow as TimeTitle))
            )
                return tt.afterTomorrow as TimeTitle;
            else if (
                isEqualDate(
                    timeStart,
                    getDateOf(tt.beforeYesterday as TimeTitle)
                )
            )
                return tt.beforeYesterday as TimeTitle;
            else return dayStr;

        case sr.week.c:
            if (isEqualDate(timeStart, getDateOf(tt.thisWeek as TimeTitle)))
                return tt.thisWeek as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.lastWeek as TimeTitle))
            )
                return tt.lastWeek as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.nextWeek as TimeTitle))
            )
                return tt.nextWeek as TimeTitle;
            else return "Week: " + getWeek(new Date(timeStart));
        case sr.month.c:
            if (isEqualDate(timeStart, getDateOf(tt.thisMonth as TimeTitle)))
                return tt.thisMonth as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.lastMonth as TimeTitle))
            )
                return tt.lastMonth as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.nextMonth as TimeTitle))
            )
                return tt.nextMonth as TimeTitle;
            else return `${getMonthFullName(m)} ${y}`;
        case sr.year.c:
            if (isEqualDate(timeStart, getDateOf(tt.thisYear as TimeTitle)))
                return tt.thisYear as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.lastYear as TimeTitle))
            )
                return tt.lastYear as TimeTitle;
            else if (
                isEqualDate(timeStart, getDateOf(tt.nextYear as TimeTitle))
            )
                return tt.nextYear as TimeTitle;
            else return `${y}`;
        case sr.decade.c:
            if (isEqualDate(timeStart, getDateOf(tt.thisDecade as TimeTitle)))
                return tt.thisDecade as TimeTitle;
            else return `${Math.floor(y / 10)}0s`;
        case sr.century.c:
            if (isEqualDate(timeStart, getDateOf(tt.thisCentury as TimeTitle)))
                return tt.thisCentury as TimeTitle;
            else return "CAN NOT GET CENTURY";
    }
    return dayStr;
}

export function getDateOf(timeTitle: TimeTitle): cDate {
    const date = dateToCDate(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            0,
            0,
            0,
            0
        )
    );

    switch (timeTitle) {
        case tt.today:
            return date;
        case tt.tomorrow:
            return addTime(date, 0, 0, 1, 0, 0);
        case tt.yesterday:
            return addTime(date, 0, 0, -1, 0, 0);
        case tt.afterTomorrow:
            return addTime(date, 0, 0, 2, 0, 0);
        case tt.beforeYesterday:
            return addTime(date, 0, 0, -2, 0, 0);
        case tt.lastWeek:
            return dateToCDate(getDate$LastMonday(new Date(date)));
        case tt.thisWeek:
            return dateToCDate(getDate$MondayOfCurrentWeek(new Date(date)));
        case tt.nextWeek:
            return dateToCDate(getDate$NextMonday(new Date(date)));
        case tt.lastMonth:
            return dateToCDate(getDate$FirstDayOfLastMonth(new Date(date)));
        case tt.thisMonth:
            return dateToCDate(getDate$FirstDayOfCurrentMonth(new Date(date)));
        case tt.nextMonth:
            return dateToCDate(getDate$FirstDayOfNextMonth(new Date(date)));
        case tt.lastYear:
            return dateToCDate(getDate$FirstDayOfLastYear(new Date(date)));
        case tt.thisYear:
            return dateToCDate(getDate$FirstDayOfCurrentYear(new Date(date)));
        case tt.nextYear:
            return dateToCDate(getDate$FirstDayOfNextYear(new Date(date)));
        case tt.thisDecade:
            return dateToCDate(getDate$FirstDayOfCurrentDecade(new Date(date)));
        case tt.thisCentury:
            return dateToCDate(
                getDate$FirstDayOfCurrentCentury(new Date(date))
            );
        default:
            return dateToCDate(new Date(new Date().setHours(0, 0, 0, 0)));
    }
}

// B.9 check Sat/Sun
export function isWeekend(date: cDate) {
    // Lấy ngày trong tuần (0 = Chủ Nhật, 6 = Thứ Bảy)
    const day = new Date(date).getDay();
    // Kiểm tra nếu là Thứ Bảy (6) hoặc Chủ Nhật (0)
    return day === 0 || day === 6;
}

// B.10 format Date to display
export function formatTime(date: cDate, levelC: CevelC) {
    switch (levelC) {
        case sr.hour.c:
            const hours = String(new Date(date).getHours()).padStart(2, "0"); // Lấy giờ và thêm 0 nếu cần
            const minutes = String(new Date(date).getMinutes()).padStart(
                2,
                "0"
            ); // Lấy phút và thêm 0 nếu cần
            return `${hours}:${minutes}`;
    }
}
