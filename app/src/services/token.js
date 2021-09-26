import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export class Token {

    static refreshToken(token) {
        axios.defaults.headers.common['Authorization'] = token
    }

     static  async setItems(token, id, username, password, email) {
        await AsyncStorage.clear();
        await AsyncStorage.multiSet([
            ['token', token],
            ['id', String(id)],
            ['email', email],
            ['username', username],
            ['password', password]
        ]);
    }

}