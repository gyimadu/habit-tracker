export interface Habit {
    id: string;
    name: string;
    description?: string;
    completedDays: { [date: string]: boolean };
}