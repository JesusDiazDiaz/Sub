import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ErrorMessage} from 'formik';
import Text from './Text';
import Block from './Block';
import Button from './Button';
import theme from '../modules/theme';

export default class Input extends Component {
  state = {
    toggleSecure: false,
  };

  renderLabel() {
    const {label, error} = this.props;

    return (
      <Block flex={false}>
        {label ? (
          <Text medium header gray={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  }

  renderToggle() {
    const {secure, rightLabel} = this.props;
    const {toggleSecure} = this.state;

    if (!secure) {
      return null;
    }

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({toggleSecure: !toggleSecure})}>
        {rightLabel ? (
          rightLabel
        ) : (
          <View>
            {/* <Icon.Ionicons
              color={theme.colors.gray}
              size={theme.sizes.font * 1.35}
              name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
            /> */}
          </View>
        )}
      </Button>
    );
  }

  renderIconLeft() {
    const {iconLeft} = this.props;

    if (!iconLeft) {
      return;
    }

    return (
      <Block marginRight={theme.sizes.base} flex={false}>
        {iconLeft}
      </Block>
    );
  }

  renderRight() {
    const {rightLabel, rightStyle, onRightPress} = this.props;

    if (!rightLabel) {
      return null;
    }

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel}
      </Button>
    );
  }

  render() {
    const {
      email,
      phone,
      number,
      secure,
      error,
      style,
      disableUnderline = false,
      iconLeft,
      placeholder,
      ...props
    } = this.props;

    const {toggleSecure} = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && {borderColor: theme.colors.accent},
      !disableUnderline && styles.inputUnderline,
      style,
    ];

    const inputType = email
      ? 'email-address'
      : number
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';

    return (
      <React.Fragment>
        <Block margin={[theme.sizes.base / 2, 0]}>
          {this.renderLabel()}
          {this.renderIconLeft()}
          <TextInput
            style={inputStyles}
            secureTextEntry={isSecure}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={placeholder}
            keyboardType={inputType}
            placeholderTextColor={theme.colors.black}
            {...props}
          />
          {this.renderToggle()}
          {this.renderRight()}
        </Block>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 1.8,
  },
  inputUnderline: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: 'rgba(165, 165, 182, 0.4)',
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
    backgroundColor: 'transparent',
  },
});
