export const formatLongDateTimeString = (date: Date): string => {
    // format -> day, month date year at time
    let dateFormat = date.toDateString();
    dateFormat = dateFormat.split(" ")[0] + ", " + dateFormat.split(" ").splice(1).join(" ");
    let timeFormat = date.toLocaleTimeString("en-us");
    timeFormat = timeFormat.split(" ")[0].split(":").splice(0, 2).join(":") + " " + timeFormat.split(" ")[1];
    return `${dateFormat} at ${timeFormat}`;
};

export const formatDateTimeString = (date: Date): string => {
    // format -> time, month date
    let dateFormat = date.toDateString();
    dateFormat = dateFormat.split(" ").splice(1, 2).join(" ");
    let timeFormat = date.toLocaleTimeString("en-us");
    timeFormat = timeFormat.split(" ")[0].split(":").splice(0, 2).join(":") + " " + timeFormat.split(" ")[1];
    return `${timeFormat}, ${dateFormat}`;
};
