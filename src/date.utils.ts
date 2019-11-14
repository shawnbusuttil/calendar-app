export function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

export function hasReminders(reminders: any, month: number, day: number): boolean {
    return reminders[month] && reminders[month][day] && reminders[month][day].length > 0;
}

export function formatDate(date: string): string {
    return +date < 10 ? "0" + date : "" + date;
}

export function parseDate(date: string): string {
    return +date < 10 ? date.charAt(1): date;
}