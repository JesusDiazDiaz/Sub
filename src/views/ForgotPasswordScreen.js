import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import {Block, Input, Button, Text} from '../components';
import theme from '../modules/theme';
//import {pushLoginScreen} from '../navigation';

const SignUpScreen = ({componentId}) => {
  return (
    <SafeAreaView style={styles.container}>
      <BaseKeyboardAvoidingView>
        <Block middle padding={[theme.sizes.base, theme.sizes.base * 2]}>
          <View style={styles.title}>
            <Text medium h1>
              Olvidaste tu
            </Text>
            <Text medium h1>
              contraseña ?
            </Text>
          </View>
          <View style={styles.text}>
            <Text gray h3>
              Ingresa tu numero de teléfono, nosotros enviaremos un código para
              restaurar tu contraseña
            </Text>
          </View>
          <View style={styles.formWrapper}>
            <Input phone label="Telefono" />
          </View>
          <Button large color="primary">
            <Text center h2 semibold color={theme.colors.white}>
              Enviar
            </Text>
          </Button>
        </Block>
      </BaseKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: theme.sizes.base * 1.5,
  },
  text: {
    marginBottom: theme.sizes.base * 2.5,
  },
  formWrapper: {
    marginBottom: theme.sizes.base * 4,
  },
});
