import { Executor, RequestPokemon } from '../../../factory/request';

export class StoragePokemonInfo {
    static getPokemon(id) {
        return new Promise((resolve, reject) => {
            Executor.run(new RequestPokemon(id))
                .then(resp => resolve(resp.data))
                .catch(err => reject(err.response.status));
        })
    }
}