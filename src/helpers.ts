
import { parse as parseUrl } from 'url';
const ellipsize = require('ellipsize');

export function truncateAt(text: string, maxLength: number): string {
    return ellipsize(text, maxLength, { truncate: false });
}

export function splitUrl(url: string): { host: string | undefined, path: string | undefined } {
    const data = parseUrl(url, true, false);
    return {
        host: data.host,
        path: data.path,
    }
}
