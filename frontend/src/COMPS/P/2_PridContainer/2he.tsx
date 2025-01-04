import { cDate } from "../../S/TLTypes";

export function displayCDate(date: cDate): string {
    if (!date) return "";
    const date2 = new Date(date);
    const month: string = String(date2.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day: string = String(date2.getDate()).padStart(2, "0");
    const year: number = date2.getFullYear();
    return `${month}/${day}/${year}`;
}
