
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

const revertDate = (date) => {
    if (new Date(date) != "Invalid Date") {
        const newDate = new Date(date);
        const reg = /\d{2}(?<year>\d{2})-(?<month>\d{1,2})-(?<day>\d{1,2})/g.exec(newDate.toISOString())
        const day = reg.groups.day;
        const month = reg.groups.month;
        const year = reg.groups.year;
        return `${year}${month}${day}`;
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

const toNonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}

const generateCCCDIDName = (name) => {
    let newName = name;
    newName = toNonAccentVietnamese(newName);
    const newStrArr = newName.split(" ");
    let returningName = "";
    for (let index = 0; index < newStrArr.length; index++) {
        if(index === 0) {
            returningName = returningName + newStrArr[index] + "<<";
        } else {
            returningName = returningName + newStrArr[index] + "<";
        }
    }
    return returningName;
}

export { formatTime, formatDate, formatNumber, toNonAccentVietnamese, revertDate, generateCCCDIDName }