import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import theme from '../modules/theme';

const BaseKeyboardAvoidingView = ({children}) => {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      //contentContainerStyle={styles.container}
      scrollEnabled>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>*/}
      {children}
      {/*
      </TouchableWithoutFeedback>*/}
    </KeyboardAwareScrollView>
  );
};

export default BaseKeyboardAvoidingView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
});
