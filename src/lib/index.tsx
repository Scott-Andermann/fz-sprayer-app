export const convertToMins = (seconds: number) => {
    if (seconds < 0) {
        return '0:00';
    }
    const mins = Math.floor(seconds / 60);
    let resultSeconds;
    if (seconds % 60 < 10) {
        resultSeconds = `0${seconds % 60}`;
    }
    else resultSeconds = seconds % 60;
    return `${mins}:${resultSeconds}`
}