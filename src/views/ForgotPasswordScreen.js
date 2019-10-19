import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import theme from '../modules/theme';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Auth} from 'aws-amplify';
import ErrorMessage from '../components/ErrorMessage';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import {Block, Input, Button, Text} from '../components';
import {pushOTPVerification} from '../navigation';

let schema = yup.object().shape({
  phoneNumber: yup.string().required('Celular es requerido.'),
});

const SignUpScreen = ({componentId}) => {
  const handleResetPassword = async ({phoneNumber}) => {
    await Auth.forgotPassword(phoneNumber);
    pushOTPVerification(componentId);
  };

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
          <Formik
            validationSchema={schema}
            initialValues={{
              phoneNumber: '',
            }}
            onSubmit={handleResetPassword}>
            {({handleChange, handleBlur, values, handleSubmit}) => (
              <React.Fragment>
                <View style={styles.formWrapper}>
                  <Input
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    phone
                    label="Telefono"
                  />
                  <ErrorMessage name="phoneNumber" />
                </View>
                <Button onPress={handleSubmit} large color="primary">
                  <Text center h2 semibold color={theme.colors.white}>
                    Enviar
                  </Text>
                </Button>
              </React.Fragment>
            )}
          </Formik>
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
