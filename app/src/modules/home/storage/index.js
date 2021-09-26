import { Executor, RequestSortedPokemon } from '../../../factory/request';

export class StorageHome {
    static getSortedPokemon(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestSortedPokemon(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response.status));
        })
    }
}