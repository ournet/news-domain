
import { TextHelper } from "@ournet/domain";
import { sha1 } from "../utils";

export class NewsHelper {

    static titleHash(title: string) {
        title = TextHelper.removeSymbols(title.toLowerCase())
            .replace(/\s{2,}/g, ' ').trim();
        return sha1(title);
    }

    static createId(urlHash: string, date?: Date) {
        date = date || new Date();
        return `${NewsHelper.formatIdDate(date)}${urlHash.substr(0, 7)}`;
    }

    static formatIdDate(date: Date) {
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        return `${day > 9 ? day : '0' + day}${month > 9 ? month : '0' + month}${date.getUTCFullYear()}`;
    }
}
