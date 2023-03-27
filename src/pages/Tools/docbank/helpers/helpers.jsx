
const formatDate = (date) => {
    if (new Date(date) != "Invalid Date") {
        const newDate = new Date(date);
        const reg = /(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/g.exec(newDate.toISOString())
        const day = reg.groups.day;
        const month = reg.groups.month;
        const year = reg.groups.year;
        return `${day}/${month}/${year}`;
    } else {
        return <b style={{ color: "red" }}>Ngày không hợp lệ</b>;
    }
}

const formatNumber = (number, addZero) => {
    if (number) {
        if(!isNaN(parseInt(number))) {
            const formatter = Intl.NumberFormat('en-US');
            return addZero ? formatter.format(number) + ".00" : formatter.format(number);
        } else{
            return <b style={{ color: "red" }}>Số không hợp lệ</b>;
        }
    } else {
        return "";
    }
}

const formatTime = (time) => {
    if (new Date(time) != "Invalid Date") {
        const newDate = new Date(time);
        return /^\d{2}:\d{2}:\d{2}/g.exec(newDate.toTimeString())[0];
    } else {
        return <b style={{ color: "red" }}>Giờ không hợp lệ</b>;
    }
}

export { formatTime, formatDate, formatNumber }