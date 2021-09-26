import {Request} from './request';
import Constants from '../../constants/constant';

export class RequestUpdatePokemon extends Request{
    constructor(nickname,id) {
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const url = `${Constants.URL}backpack/pokemon/${id}`;
        const data = {
          nickname
        };
        super(url, 'PUT', headers, data);
    }
}
