import qs from 'qs';
import axios from 'axios';
import { Request } from './request';
import Constants from '../../constants/constant';

export class RequestRegister extends Request {
    constructor(username, password, email) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}auth/register`;
        const data = {
            username,
            password,
            email
        }
        super(url, 'POST', headers, data);
    }
}

