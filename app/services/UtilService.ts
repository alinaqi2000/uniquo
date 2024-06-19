import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default class UtilService {

    static async store(key: string, data: any) {
        return await AsyncStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }

    static async get(key: string) {
        return JSON.parse(await AsyncStorage.getItem(key));
    }

    static convertDateTimeFormat(isoDate: Date) {
        const date = moment(isoDate);

        const formattedDate = date.format('DD.MM.YYYY HH:mm');

        return formattedDate;
    }

    static convertServerStrToTime(isoDate: string) {
        return moment(isoDate, "YYYY-MM-DD, HH:mm A").format("h:mm A MMM DD, YYYY").toString();

    }

    static makeDateTimeFromServer(date: string) {
        return moment(date, "MMM DD, YYYY HH:mm").toDate().toString();
    }

    static convertDisplayDateFormat(date) {
        const momentDate = moment(date);

        const formattedDate = momentDate.format('MMM DD, YYYY');

        return formattedDate;
    }

    static convertDisplayTimeFormat(date) {
        const parsedTime = moment(date);

        const formattedTime = parsedTime.format('h:mm A');

        return formattedTime;
    }

    static convertHoursFormat(time) {
        const parsedTime = moment(time, 'HH:mm');

        const formattedTime = parsedTime.format('h:mm A');

        return formattedTime;
    }
    static generateDateTimeString() {
        const currentDate = moment();

        const minutes = Math.round(currentDate.minutes() / 30) * 30;
        currentDate.minutes(minutes);

        return currentDate.toDate().toString();
    }
    static number(number: number | string) {
        const formatter = Intl.NumberFormat('en')
        return formatter.format(+number)
        // return number.toLocaleString("en-PK", { style: 'currency', currency: 'USD' })
    }

    static generateNumbersArray(num: number) {
        if (typeof num !== 'number' || num <= 0 || !Number.isInteger(num)) {
            return [];
        }

        const result = [];
        for (let i = 1; i <= num; i++) {
            result.push(i);
        }
        return result;
    }
    static likeSearch(keyword, target) {
        keyword = keyword.toLowerCase();
        target = target.toLowerCase();

        return target.includes(keyword);
    }
    static searchItems(data, keyword, keys = []) {
        return data.filter(item => {
            var matched = false;
            keys.forEach(k => {
                if (this.likeSearch(keyword, item[k])) {
                    matched = true
                }
            });
            return matched;
        }
        );
    }
    static updateObject(array, matchKey, matchValue, updatedData) {
        return array.map(obj => {
            if (obj[matchKey] == matchValue) {
                return { ...obj, ...updatedData };
            } else {
                return obj;
            }
        });
    };
    static deleteFromArray(array, item) {
        const itemIndex = array.findIndex(item);
        array.splice(itemIndex, 1);
        return array;
    };
}