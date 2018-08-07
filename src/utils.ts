import { createHash } from "crypto";

export function md5(value: string): string {
    return createHash('md5').update(value, 'utf8').digest('hex').toLowerCase();
}

export function sha1(value: string): string {
    return createHash('sha1').update(value, 'utf8').digest('hex').toLowerCase();
}
