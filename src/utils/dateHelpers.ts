export const formatDate = (date: Date, format: string): string => {
    switch(format) {
        case 'yyyy-MM-dd':
            return date.toISOString().split('T')[0];
        case 'd':
            return date.getDate().toString();
        case 'MMMM':
            return date.toLocaleString('default', { month: 'long' });
        default:
            return date.toString();
    }
};

export const getMonthDays = (year: number, month: number): Date[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
    }

    return days;
}