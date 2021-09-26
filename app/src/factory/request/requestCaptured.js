import {Request} from './request';
import Constants from '../../constants/constant';

export class RequestCaptured extends Request{
    constructor(id) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}attempt-capture/${id}`;
        super(url, 'GET', headers, null);
    }
}