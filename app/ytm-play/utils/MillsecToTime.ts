function secToTime(time?: number): string {
    if (time == undefined) {
        return "";
    }
    let dateObj = new Date(time*1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString = (hours == 0) ? minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0') :
        hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');

    return timeString;
}

export default secToTime;