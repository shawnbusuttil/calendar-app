export interface Reminder {
    id: number;
    title: string;
    date: {
        day: string,
        month: string;
    };
    time: string;
    text: string;
}