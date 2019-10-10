import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import theme from '../modules/theme';

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      outline,
      icon,
      children,
      large,
      loading,
      disabled,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      large && styles.buttonLarge,
      outline && styles.buttonOutline,
      disabled && styles.buttonDisabled,
      color && !outline && styles[color], // predefined styles colors for backgroundColor
      color && !outline && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];

    if (icon) {
      return (
        <TouchableOpacity style={buttonStyles} activeOpacity={opacity || 0.8}>
          {children}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        disabled={disabled}
        activeOpacity={opacity || 0.8}
        {...props}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  opacity: 0.8,
  color: theme.colors.white,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 2,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  buttonLarge: {
    height: theme.sizes.base * 3.8,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    opacity: 0.2,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  secondary: {backgroundColor: theme.colors.secondary},
  tertiary: {backgroundColor: theme.colors.tertiary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.gray3},
  gray4: {backgroundColor: theme.colors.gray4},
});
