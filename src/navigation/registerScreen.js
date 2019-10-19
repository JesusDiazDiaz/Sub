// @flow

import React from 'react';
import {Navigation} from 'react-native-navigation';

import {
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  HomeScreen,
  MyProductsScreen,
  AddProductScreen,
  NotificationsScreen,
  AccountScreen,
  OTPVerification,
  NewPasswordScreen,
} from '../views';
import {Provider} from 'react-redux';

import {
  LOGIN_SCREEN,
  SIGN_UP_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  HOME_SCREEN,
  MY_PRODUCTS_SCREEN,
  NOTIFICATIONS_SCREEN,
  ADD_PRODUCT_SCREEN,
  ACCOUNT_SCREEN,
  OTP_VERIFICATION,
  NEW_PASSWORD,
} from './Screens';

import {configureStore} from '../config';

// let store = configureStore();

export default function() {
  Navigation.registerComponent(LOGIN_SCREEN, () => LoginScreen);
  Navigation.registerComponent(SIGN_UP_SCREEN, () => SignUpScreen);
  Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
  Navigation.registerComponent(MY_PRODUCTS_SCREEN, () => MyProductsScreen);
  Navigation.registerComponent(NOTIFICATIONS_SCREEN, () => NotificationsScreen);
  Navigation.registerComponent(ADD_PRODUCT_SCREEN, () => AddProductScreen);
  Navigation.registerComponent(ACCOUNT_SCREEN, () => AccountScreen);
  Navigation.registerComponent(OTP_VERIFICATION, () => OTPVerification);
  Navigation.registerComponent(NEW_PASSWORD, () => NewPasswordScreen);
  Navigation.registerComponent(
    FORGOT_PASSWORD_SCREEN,
    () => ForgotPasswordScreen,
  );
  console.info('All screens have been registered...');
}
