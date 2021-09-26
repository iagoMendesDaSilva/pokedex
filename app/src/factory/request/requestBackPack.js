import {Request} from './request';
import Constants from '../../constants/constant';

export class RequestBackPack extends Request{
    constructor() {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}backpack`;
        super(url, 'GET', headers, null);
    }
}
