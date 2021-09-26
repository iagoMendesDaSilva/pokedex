import { Executor, RequestBackPack } from '../../../factory/request';

export class StorageBackpack {
    static getBackPack() {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestBackPack())
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response.status));
        })
    }
}