import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import {Auth} from 'aws-amplify';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import {Block, Input, Button, Text} from '../components';
import theme from '../modules/theme';
import {
  pushLoginScreen,
  popCurrentScreen,
  pushOTPVerification,
} from '../navigation';
import ErrorMessage from '../components/ErrorMessage';

let schema = yup.object().shape({
  name: yup.string().required(),
  phoneNumber: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

const SignUpScreen = ({componentId}) => {
  const handleSignUp = async ({email, phoneNumber, name, password}) => {
    console.info('sign up user...');
    try {
      await Auth.signUp({
        username: phoneNumber,
        password,
        attributes: {
          // name,
          email,
        },
      });
      pushOTPVerification(componentId, phoneNumber);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseKeyboardAvoidingView>
        <Block middle padding={[theme.sizes.base, theme.sizes.base * 2]}>
          <View style={styles.title}>
            <Text medium h1>
              Crear cuenta
            </Text>
          </View>
          <Formik
            validationSchema={schema}
            initialValues={{
              email: '',
              name: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            va
            onSubmit={handleSignUp}>
            {({handleChange, handleBlur, values, handleSubmit}) => (
              <React.Fragment>
                <View style={styles.formWrapper}>
                  <Input
                    label="Nombre"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  <ErrorMessage name="name" />
                  <Input
                    label="Celular"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  <ErrorMessage name="name" />
                  <Input
                    email
                    label="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <ErrorMessage name="email" />
                  <Input
                    label="Contraseña"
                    secure
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <ErrorMessage name="password" />
                  <Input
                    label="Confirmar Contraseña"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secure
                  />
                  <ErrorMessage name="confirmPassword" />
                </View>
                <Button onPress={handleSubmit} large color="primary">
                  <Text center h2 semibold color={theme.colors.white}>
                    Registrar
                  </Text>
                </Button>
              </React.Fragment>
            )}
          </Formik>
          <Button onPress={() => popCurrentScreen(componentId)}>
            <Block row middle>
              <Text center semibold h3 gray>
                Tienes una cuenta?
              </Text>
              <Text style={styles.leftSpacing} center semibold h3 primary>
                Iniciar sesión
              </Text>
            </Block>
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
    marginBottom: theme.sizes.base * 2.5,
  },
  formWrapper: {
    marginBottom: theme.sizes.base * 2,
  },
  leftSpacing: {
    marginLeft: theme.sizes.base / 2,
  },
});
