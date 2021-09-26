import {Request} from './request';
import Constants from '../../constants/constant';

export class RequestSortedPokemon extends Request{
    constructor(id) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}sorted/${id}`;
        super(url, 'GET', headers, null);
    }
}
