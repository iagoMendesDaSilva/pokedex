
import { Executor, RequestUpdateUser } from '../../../factory/request';

export class StorageEditUser {
    static editUser(username, email, password, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUpdateUser(username, email, password, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response.status));
        })
    }
}