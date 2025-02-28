import {dateToCDate} from "../../S/3_TimeConfig/TimeHelpers";
import { cDate } from "../../S/TLTypes";
import {Fo} from "../0_Fo/FoTypes";
import {Pr} from "../GTypes";



export function displayCDate(date: cDate, format:string = 'mm/dd/yyyy'): string {
    if (!date) return "";
    const date2 = new Date(date);
    const month: string = String(date2.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day: string = String(date2.getDate()).padStart(2, "0");
    const year: number = date2.getFullYear();
    if(format === 'dd/mm') return `${day}/${month}`;
    if(format === 'dd/mm/yyyy') return `${day}/${month}/${year}`; // default
    if(format === 'mm/dd/yyyy') return `${month}/${day}/${year}`; 
    if(format === 'yyyy/mm/dd') return `${year}/${month}/${day}`;
    if(format === 'yyyy/dd/mm') return `${year}/${day}/${month}`;
    return `${day}/${month}/${year}`;

}


export function truncateText(text:string, length:number): string {
    if (text.length > length) {
        return text.slice(0, length) + '...';
    }
    return text;
}


export function getDateFromDayIndex(dayIndex: number, year: number): cDate {
    // Create a Date object for the first day of the year
    const startOfYear = new Date(year, 0, 1);  // January 1st of the given year
    
    // Add the day index to the start date
    startOfYear.setDate(startOfYear.getDate() + dayIndex);
    
    return dateToCDate(startOfYear);
}

export function getDayIndex(date: cDate): number { // InDate == dayIndex 
    const date0 = new Date(date);
    // Get the start of the year (January 1st)
    const startOfYear = new Date(date0.getFullYear(), 0, 1);
    
    // Calculate the difference in milliseconds
    const timeDifference = date0.getTime() - startOfYear.getTime();
    
    // Convert the difference from milliseconds to days (1 day = 86400000 milliseconds)
    const dayIndex = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    return dayIndex;
}

export function getIndexesOfFirstDayOfAllMonth (year: number): number[] {
    return [
        getDayIndex(dateToCDate(new Date(year, 0, 1))),
        getDayIndex(dateToCDate(new Date(year, 1, 1))),
        getDayIndex(dateToCDate(new Date(year, 2, 1))),
        getDayIndex(dateToCDate(new Date(year, 3, 1))),
        getDayIndex(dateToCDate(new Date(year, 4, 1))),
        getDayIndex(dateToCDate(new Date(year, 5, 1))),
        getDayIndex(dateToCDate(new Date(year, 6, 1))),
        getDayIndex(dateToCDate(new Date(year, 7, 1))),
        getDayIndex(dateToCDate(new Date(year, 8, 1))),
        getDayIndex(dateToCDate(new Date(year, 9, 1))),
        getDayIndex(dateToCDate(new Date(year, 10, 1))),
        getDayIndex(dateToCDate(new Date(year, 11, 1))),
    ]
}


export function getAllDescendants2(allItems: (Pr|Fo)[], id: string, includeSelf: boolean = true): (Pr|Fo)[] {
    const result: (Pr|Fo)[] = [];
  
    // Hàm đệ quy để tìm tất cả con cháu
    function collectChildren(parentId: string) {
        // Tìm chính nó
        const currentItem = allItems.find((item) => item.id === parentId);
        if (currentItem) {
            result.push(currentItem);
    
            // Tìm tất cả các con trực tiếp
            const children = allItems.filter((item) => item.parentId === parentId);
            for (const child of children) {
                collectChildren(child.id); // Đệ quy cho từng con
            }
        }
    }
  
    // Bắt đầu đệ quy từ id ban đầu
    collectChildren(id);
    if(!includeSelf) result.shift();
  
    return result;
}
