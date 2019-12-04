/**
 * @format
 */

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import {startApp} from './src/navigation';
import {Navigation} from 'react-native-navigation';

Amplify.configure(awsconfig);

// TODO don't forget to add your app and js ids

Navigation.events().registerAppLaunchedListener(() => startApp());
