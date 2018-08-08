
import test from 'ava';
import { NewsHelper } from './news-helper';


test('#formatIdDate', t => {
    const date = new Date();
    t.log(`date id for ${date.toUTCString()} is ${NewsHelper.formatIdDate(date)}`);
    t.is(NewsHelper.formatIdDate(date).length, 6);
});

test('#createId', t => {
    const date = new Date();
    const id = NewsHelper.createId('md', 'ru', 'f4fdf46dgfdgfs4ts4ts4gfs4fs4', date);
    t.log(`id for md-ru ${date.toUTCString()} is ${id}`);
    t.is(id.length, 18);
});
