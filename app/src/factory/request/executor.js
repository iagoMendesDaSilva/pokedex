import axios from 'axios';

export class Executor{

    static run(Request){
        return axios({
            method: Request.method,
            header: Request.header,
            url: Request.url,
            data: Request.params
        });
    }
}