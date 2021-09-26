import { Request } from './request';
import Constants from '../../constants/constant';

export class RequestLogin extends Request {
    constructor(username, password) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}auth/login`;
        const data = {
            username,
            password
        }
        super(url, 'POST', headers, data);
    }
}

