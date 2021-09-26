import { Executor, RequestRegister } from '../../../factory/request';

export class StorageRegister {
    static register(username, password,email) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestRegister(username, password,email))
                .then(resp => resolve(resp.data))
                .catch(_ => reject());
        })
    }
}