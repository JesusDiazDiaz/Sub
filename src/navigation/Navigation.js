// @flow

import {Navigation} from 'react-native-navigation';

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
  PRODUCT_SCREEN,
  SETTINGS_SCREEN,
} from './Screens';
import {Auth} from 'aws-amplify';
import registerScreens from './registerScreen';

import theme from '../modules/theme';

// Register all screens on launch
registerScreens();

export function popCurrentScreen(componentId) {
  Navigation.pop(componentId);
}

export async function startApp() {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: 'transparent',
      },
      title: {
        color: theme.colors.primary,
      },
      backButton: {
        icon: require('../assets/icons/back_button_primary.png'),
        color: theme.colors.primary,
      },
      buttonColor: theme.colors.primary,
      drawBehind: true,
    },
    statusBar: {
      style: 'light',
    },
    layout: {
      orientation: ['portrait'],
    },
    bottomTabs: {
      backgroundColor: 'white',
      // drawBehind: true,
      hideShadow: true,
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    },
  });
  try {
    await Auth.currentAuthenticatedUser();
    pushTabBasedApp();
  } catch (e) {
    console.log(e);
    pushLoginScreen();
  }
}

export function pushLoginScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: LOGIN_SCREEN,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  style: 'dark',
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function pushTabBasedApp() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: HOME_SCREEN,
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/home.png'),
                  testID: 'HOME_SCREEN_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: MY_PRODUCTS_SCREEN,
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/ticket.png'),
                  testID: 'MY_PRODUCTS_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: ADD_PRODUCT_SCREEN,
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/plus.png'),
                  testID: 'ADD_PRODUCT_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: NOTIFICATIONS_SCREEN,
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/bell.png'),
                  testID: 'NOTIFICATIONS_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SETTINGS_SCREEN,
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/account.png'),
                  testID: 'ACCOUNT_BAR_BUTTON',
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function pushSignUpScreenApp(componentId) {
  Navigation.push(componentId, {
    component: {
      name: SIGN_UP_SCREEN,
    },
  });
}

export function pushOTPVerification(componentId, username) {
  Navigation.push(componentId, {
    component: {
      name: OTP_VERIFICATION,
      passProps: {
        username,
      },
      options: {
        topBar: {
          visible: false,
        },
      },
    },
  });
}

export function pushForgotPasswordsScreen(componentId) {
  Navigation.push(componentId, {
    component: {
      name: FORGOT_PASSWORD_SCREEN,
    },
  });
}

export function pushNewPasswordScreen(componentId, {passProps = {}}) {
  Navigation.push(componentId, {
    component: {
      name: NEW_PASSWORD,
      passProps,
    },
  });
}

export function pushProductScreen(componentId, passProps = {}) {
  Navigation.push(componentId, {
    component: {
      name: PRODUCT_SCREEN,
      passProps,
    },
  });
}

export function pushSettingsScreen(componentId, passProps = {}) {
  Navigation.push(componentId, {
    component: {
      name: SETTINGS_SCREEN,
      passProps,
    },
  });
}

//TODO: Example

/* export function pushSingleScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SINGLE_APP_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'SINGLE SCREEN APP',
                  },
                  leftButtons: [
                    {
                      id: 'nav_user_btn',
                      icon: require('../assets/icons/ic_nav_user.png'),
                      color: 'white',
                    },
                  ],
                  rightButtons: [
                    {
                      id: 'nav_logout_btn',
                      icon: require('../assets/icons/ic_nav_logout.png'),
                      color: 'white',
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function pushTabBasedApp() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: TAB1_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'TAB 1',
                        },
                        leftButtons: [
                          {
                            id: 'nav_user_btn',
                            icon: require('../assets/icons/ic_nav_user.png'),
                            color: 'white',
                          },
                        ],
                        rightButtons: [
                          {
                            id: 'nav_logout_btn',
                            icon: require('../assets/icons/ic_nav_logout.png'),
                            color: 'white',
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/ic_tab_home.png'),
                  testID: 'FIRST_TAB_BAR_BUTTON',
                  text: 'Tab1',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: TAB2_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: 'TAB 2',
                        },
                        leftButtons: [
                          {
                            id: 'nav_user_btn',
                            icon: require('../assets/icons/ic_nav_user.png'),
                            color: 'white',
                          },
                        ],
                        rightButtons: [
                          {
                            id: 'nav_logout_btn',
                            icon: require('../assets/icons/ic_nav_logout.png'),
                            color: 'white',
                          },
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../assets/icons/ic_tab_menu.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  text: 'Tab2',
                },
              },
            },
          },
        ],
      },
    },
  });
}
 */
