import { Request } from './request';
import Constants from '../../constants/constant';

export class RequestUpdateUser extends Request {
    constructor(username, email, password, id) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}user/${id}`;
        const data = {
            username,
            password,
            email
        };
        super(url, 'PUT', headers, data);
    }
}
