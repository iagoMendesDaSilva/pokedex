import { Executor, RequestCaptured, RequestUpdatePokemon } from '../../../factory/request';

export class StorageCapture {
    static tryCapture(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestCaptured(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response.status));
        })
    }

    static confirmCapture(nickname, id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestUpdatePokemon(nickname, id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response.status));
        })
    }
}