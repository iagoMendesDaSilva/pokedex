import {Request} from './request';
import Constants from '../../constants/constant';

export class RequestPokemon extends Request{
    constructor(id) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}pokemon/${id}`;
        super(url, 'GET', headers, null);
    }
}
