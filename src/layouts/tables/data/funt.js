import moment from "moment/moment";

export function countUnits({ tStart, tEnd }) {
    const diff = moment.duration(moment(tEnd, 'HH:mm') - moment(tStart, 'HH:mm')).asMinutes() || 0
    switch (true) {
        case diff >= 8 && diff <= 22:
            return 1;
        case diff >= 23 && diff <= 37:
            return 2;
        case diff >= 38 && diff <= 52:
            return 3;
        case diff >= 53 && diff <= 67:
            return 4;
        case diff >= 68 && diff <= 82:
            return 5;
        case diff >= 83 && diff <= 97:
            return 6;
        case diff >= 98 && diff <= 112:
            return 7;
        case diff >= 113 && diff <= 127:
            return 8;
        case diff >= 128 && diff <= 142:
            return 9;
        default:
            return 10;
    }
};

export function duration({ tStart, tEnd }) {
    return moment.duration(moment(tEnd, 'HH:mm') - moment(tStart, 'HH:mm')).asMinutes() || 0
}

export const formInitialData = {
    "description": [],
    "timeStart": "",
    "timeEnd": "",
    "pos": "",
}