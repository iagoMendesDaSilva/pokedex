import { Executor, RequestLogin, RequestUser } from '../../../factory/request';

export class StorageAuth {
    static login(username, password) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestLogin(username, password))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response));
        })
    }

    static getDataUser(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUser(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response));
        })
    }
}