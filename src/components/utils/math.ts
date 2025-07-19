export function getAgeFromDate(dateStr: string): number {
    const bDate = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bDateThisYear = new Date(today.getFullYear(), bDate.getMonth(), bDate.getDate());
    return (today.getFullYear() - bDate.getFullYear()) +
        (today.valueOf() > bDateThisYear.valueOf() ? 0 : -1);
}