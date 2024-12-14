import { clvs, miliperh, currentYearcDate, hper, tl } from "../TLConstants";
import { v4 as uuidv4 } from 'uuid';
import { cDate, cDateOption, d, h, m, p, y } from "../TLTypes";

// B1. to CDate
export const numbToCDate = (y: y, m: m, d: d, h: h, p: p): cDate => {
    const pad = (num: number): string => num.toString().padStart(2, '0');
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
}
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
export const cDateToGh = (date: cDate) => date ? new Date(date).getTime() / miliperh : 0;
export const pxToRh = (px: number, hPerPx: number) => px * hPerPx;


// B4. add time
export const addTime = (date: cDate, years: number, month: number, day: number, hour: number, min: number): cDate => {
    const date0 = new Date(date);
    const newDate = new Date(date);
    newDate.setFullYear(date0.getFullYear() + years);
    const newDate2 = new Date(new Date(newDate))
    newDate2.setMonth(date0.getMonth() + month);
    const newDate3 = new Date(new Date(newDate2))
    newDate3.setDate(date0.getDate() + day);
    const newDate4 = new Date(new Date(newDate3))
    newDate4.setHours(date0.getHours() + hour);
    const newDate5 = new Date(new Date(newDate4))
    newDate5.setMinutes(date0.getMinutes() + min);

    return dateToCDate(newDate5);
};



// B5. Get Period List
export const getInYearsList = (date: cDate) => {
    const { y, m, d, h } = parseCDate(date);
    const newInYearsList = [] as cDateOption[];
    for (let i = 0; i < 100; i++) {
        const year = {
            id: `inYearsVal-${i}`,
            label: `${y + i}`,
            date: `${y + i}/1/1/1` as cDate,
        } as cDateOption;
        newInYearsList.push(year);
    }
    return newInYearsList;
}
export const getPeriodListUnit1000y = () => {
    const { y, m, d, h, p } = parseCDate(currentYearcDate as cDate);
    const new100yList = [] as cDateOption[];
    for (let i = 0; i < 15; i++) {
        const year = y + i * 1000;
        if (year >= 3000) break;
        const period = {
            id: `${uuidv4()}-${i}`,
            label: `${year} -> ${y + (i + 1) * 1000}`,
            date: `${year}/1/1/1` as cDate,
        } as cDateOption;
        new100yList.push(period);
    }
    return new100yList;
}
export const getPeriodListUnit100y = () => {
    return [{ id: `0`, label: `${2024} -> 2100`, date: numbToCDate(2024, 1, 1, 0, 0) }] as cDateOption[];
}
export const getPeriodListUnit1y = () => {
    const { y, m, d, h } = parseCDate(currentYearcDate as cDate);
    let periodList = [] as cDateOption[];
    for (let i = 0; i < 1000; i++) {
        const year = y + i;
        if (year >= 2100) break;
        const period = {
            id: `${uuidv4()}`,
            label: `${year}`,
            date: addTime(currentYearcDate as cDate, i, 0, 0, 0, 0) as cDate,
        } as cDateOption;
        periodList.push(period);
    }
    const curYearItem = { id: `${uuidv4()}`, label: `Current Year`, date: numbToCDate(y, 1, 1, 0, 0) as cDate }
    periodList = [curYearItem, ...periodList];
    return periodList;
}
export const getPeriodListUnit1m = () => {
    const { y, m, d, h, p } = parseCDate(currentYearcDate as cDate);
    let periodList = [] as cDateOption[];
    for (let i = 0; i < 100; i++) {
        const year = y + i;
        if (year >= 2100) break;
        for (let _m = 0; _m < 12; _m++) {
            const period = {
                id: `${uuidv4()}-${i}`,
                label: `${year}-${_m + 1}`,
                date: numbToCDate(year, m + _m, 1, 0, 0) as cDate,
            } as cDateOption;
            periodList.push(period);
        }
    }
    const curMonth = { id: `${uuidv4()}`, label: `Current Month`, date: numbToCDate(new Date().getFullYear(), new Date().getMonth() + 1, 1, 0, 0) as cDate }
    periodList = [curMonth, ...periodList];
    return periodList;
}



// export const toLocalISOString = (date: Date): string => {
//     const pad = (num: number): string => num.toString().padStart(2, '0');

//     const year = date.getFullYear();
//     const month = pad(date.getMonth() + 1); // Tháng bắt đầu từ 0
//     const day = pad(date.getDate());
//     const hour = pad(date.getHours());
//     const minute = pad(date.getMinutes());
//     const second = pad(date.getSeconds());
//     const millisecond = date.getMilliseconds().toString().padStart(3, '0');

//     const timezoneOffset = -date.getTimezoneOffset();
//     const sign = timezoneOffset >= 0 ? '+' : '-';
//     const offsetHour = pad(Math.floor(Math.abs(timezoneOffset) / 60));
//     const offsetMinute = pad(Math.abs(timezoneOffset) % 60);

//     return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}${sign}${offsetHour}:${offsetMinute}`;
// };

export const hToRoundedHM = (h: number, isRoundM?: boolean): { roundedH: number, roundedM: number } => {
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
        case 1: return 'Jan'
        case 2: return 'Feb'
        case 3: return 'Mar'
        case 4: return 'Apr'
        case 5: return 'May'
        case 6: return 'Jun'
        case 7: return 'Jul'
        case 8: return 'Aug'
        case 9: return 'Sep'
        case 10: return 'Oct'
        case 11: return 'Nov'
        case 12: return 'Dec'
        default: return ''
    }
}

export const getMonthFullName = (month: number) => {
    switch (month) {
        case 1: return 'January'
        case 2: return 'February'
        case 3: return 'March'
        case 4: return 'April'
        case 5: return 'May'
        case 6: return 'June'
        case 7: return 'July'
        case 8: return 'August'
        case 9: return 'September'
        case 10: return 'October'
        case 11: return 'November'
        case 12: return 'December'
        default: return ''
    }
}

// B.7 get day of Monday
export function getDate$MondayOfCurrentWeek(date: Date = new Date()) {
    const today = new Date(date); // Lấy ngày hiện tại
    const dayOfWeek = today.getDay(); // Lấy chỉ số của ngày trong tuần (0: Chủ nhật, 1: Thứ Hai, ...)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Tính khoảng cách đến Thứ Hai
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday); // Cập nhật ngày thành Thứ Hai
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 0, 0, 0, 0);
}
export function getDate$NextMonday(date: Date = new Date()) {
    const today = new Date(date); // Lấy ngày hiện tại
    const currentDay = today.getDay(); // Lấy chỉ số ngày trong tuần (0: Chủ nhật, 1: Thứ Hai, ...)

    // Tính số ngày cần thêm để đến thứ Hai tuần sau
    const daysUntilNextMonday = (currentDay === 0 ? 1 : 8 - currentDay);

    // Thêm số ngày đó vào ngày hiện tại
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);

    return new Date(nextMonday.getFullYear(), nextMonday.getMonth(), nextMonday.getDate(), 0, 0, 0, 0);
}
export function getDate$LastMonday(date: Date = new Date()): Date {
    const today = new Date(date); // Lấy ngày hiện tại
    const currentDay = today.getDay(); // Lấy chỉ số ngày trong tuần (0: Chủ nhật, 1: Thứ Hai, ...)

    // Tính số ngày cần trừ để đến thứ Hai tuần trước
    const daysSinceLastMonday = currentDay === 0 ? 6 : currentDay - 1 + 7;

    // Trừ số ngày đó từ ngày hiện tại
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceLastMonday);

    return new Date(lastMonday.getFullYear(), lastMonday.getMonth(), lastMonday.getDate(), 0, 0, 0, 0);
}

// B.8 get Year's name
export function getDate$FirstDayOfCurrentMonth() {
    const today = new Date(); // Lấy ngày hiện tại
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tiên của tháng
    return firstDay;
}
export function getDate$FirstDayOfCurrentYear() {
    const today = new Date(); // Lấy ngày hiện tại
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1); // Ngày đầu tiên của năm
    return firstDayOfYear;
}
export function getDate$FirstDayOfCurrentDecade() {
    const today = new Date(); // Lấy ngày hiện tại
    const currentYear = today.getFullYear(); // Lấy năm hiện tại
    const startOfDecade = Math.floor(currentYear / 10) * 10; // Tính năm đầu tiên của thập kỷ
    const firstDayOfDecade = new Date(startOfDecade, 0, 1); // Tạo ngày đầu tiên của thập kỷ
    return firstDayOfDecade;
}
export function getDate$FirstDayOfCurrentCentury() {
    const today = new Date(); // Lấy ngày hiện tại
    const currentYear = today.getFullYear(); // Lấy năm hiện tại
    const startOfCentury = Math.floor(currentYear / 100) * 100; // Tính năm đầu tiên của thế kỷ
    const firstDayOfCentury = new Date(startOfCentury, 0, 1); // Ngày 1 tháng 1 của năm đầu tiên của thế kỷ
    return firstDayOfCentury;
}
export function getDAYOfWeek(date: Date) {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = new Date(date).getDay(); // Lấy chỉ số ngày trong tuần
    return days[dayIndex]; // Trả về tên ngày
}


// B.9 check Sat/Sun
export function isWeekend(date: cDate) {
    // Lấy ngày trong tuần (0 = Chủ Nhật, 6 = Thứ Bảy)
    const day = new Date(date).getDay();
    // Kiểm tra nếu là Thứ Bảy (6) hoặc Chủ Nhật (0)
    return day === 0 || day === 6;
  }