export function getDateTimeInfo(): { period: string; dayOfWeek: string; month: number; day: number } {
    const date = new Date();
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    const month = date.getMonth() + 1; // JavaScript中的月份是从0开始计数的，所以要加1
    const day = date.getDate();

    let period ;
    if (hour < 12) {
        period = "上午";
    } else if (hour < 18) {
        period = "下午";
    } else {
        period = "晚上";
    }

    const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const dayOfWeekString = daysOfWeek[dayOfWeek];

    return { period, dayOfWeek: dayOfWeekString, month, day };
}


export function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

export function getCurrentTime(): string {
    return formatDateTime(new Date().toISOString());
}