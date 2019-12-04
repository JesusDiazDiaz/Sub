// @flow

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Button, Block, Input, Text} from '../components';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import theme from '../modules/theme';
import {
  pushSignUpScreenApp,
  pushForgotPasswordsScreen,
  pushTabBasedApp,
  pushOTPVerification,
} from '../navigation';
import ErrorMessage from '../components/ErrorMessage';

let schema = yup.object().shape({
  username: yup.string().required('Celular es requerido.'),
  password: yup.string().required('Contraseña es requerido.'),
});

const LoginScreen = ({componentId}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({username, password}) => {
    try {
      setLoading(true);
      await Auth.signIn(username, password);
      pushTabBasedApp();
    } catch (err) {
      if (err.code === 'UserNotFoundException') {
        console.log('no existe');
        Alert.alert('No existe el usuario.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseKeyboardAvoidingView>
        <Block middle padding={[0, theme.sizes.base * 2]}>
          <Image
            style={styles.image}
            source={require('../assets/images/lance.png')}
          />
          <View style={styles.title}>
            <Text medium h1>
              Bienvenido
            </Text>
          </View>
          <Formik
            validationSchema={schema}
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={handleLogin}>
            {({handleChange, handleBlur, values, handleSubmit}) => (
              <React.Fragment>
                <View style={styles.formWrapper}>
                  <Input
                    style={styles.input}
                    label="Celular"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  <ErrorMessage name="username" />
                  <Input
                    style={styles.input}
                    secure
                    label="Contraseña"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <ErrorMessage name="password" />
                </View>
                <Button
                  loading={loading}
                  onPress={handleSubmit}
                  large
                  outline
                  color="primary">
                  <Text center h2 semibold color={theme.colors.primary}>
                    Iniciar sesión
                  </Text>
                </Button>
              </React.Fragment>
            )}
          </Formik>
          <Button onPress={() => pushForgotPasswordsScreen(componentId)}>
            <Text center semibold h3 gray>
              Olvidaste tu contraseña ?
            </Text>
          </Button>
          <Block row flex={false} style={styles.social} middle>
            <Button icon style={styles.icon}>
              <Image source={require('../assets/images/facebook.png')} />
            </Button>
            <Button icon style={styles.icon}>
              <Image source={require('../assets/images/google.png')} />
            </Button>
            <Button icon style={styles.icon}>
              <Image source={require('../assets/images/amazon.png')} />
            </Button>
          </Block>
          <Button
            onPress={() => pushSignUpScreenApp(componentId)}
            large
            color="primary">
            <Text center h2 semibold color={theme.colors.white}>
              Registrarse
            </Text>
          </Button>
        </Block>
      </BaseKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginHorizontal: theme.sizes.base,
  },
  image: {
    marginBottom: theme.sizes.base * 2,
    marginTop: theme.sizes.base * 5,
  },
  social: {
    marginTop: theme.sizes.base,
    marginBottom: theme.sizes.base * 2,
  },
  title: {
    marginBottom: theme.sizes.base * 2.5,
  },
  formWrapper: {
    marginBottom: theme.sizes.base * 2,
  },
  input: {
    borderRadius: 0,
  },
});
