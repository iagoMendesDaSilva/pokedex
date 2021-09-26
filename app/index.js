/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {StackNav} from './src/routes/stackNav';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StackNav);
