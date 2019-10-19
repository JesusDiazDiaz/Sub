import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import theme from '../modules/theme';
import {Block, Button, Input, Text} from '../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as yup from 'yup';
import ErrorMessage from '../components/ErrorMessage';
import {Formik} from 'formik';
import {Auth} from 'aws-amplify';
import {pushTabBasedApp} from '../navigation';

let schema = yup.object().shape({
  password: yup.string().required('Contraseña es requerido.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.')
    .required('Contraseña es requerido.'),
});

//TODO reenviar codigo...
const NewPasswordScreen = ({username, code, componentId}) => {
  const [loading, setLoading] = useState(false);

  const handleSetNewPassword = async ({password}) => {
    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(username, code, password);
      await Auth.signIn(username, password);
      pushTabBasedApp();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseKeyboardAvoidingView>
        <Block middle padding={[theme.sizes.base, theme.sizes.base * 2]}>
          <Text medium h1>
            Restablecer contraseña
          </Text>
          <Block marginTop={theme.sizes.base}>
            <Text gray h2>
              Ingrese su nueva contraseña
            </Text>
          </Block>
          <Formik
            validationSchema={schema}
            initialValues={{
              confirmPassword: '',
              password: '',
            }}
            onSubmit={handleSetNewPassword}>
            {({handleChange, handleBlur, values, handleSubmit}) => (
              <React.Fragment>
                <View style={styles.formWrapper}>
                  <Input
                    label="Contraseña"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <ErrorMessage name="username" />
                  <Input
                    secure
                    label="Confirmar Contraseña"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
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
                    Cambiar contraseña
                  </Text>
                </Button>
              </React.Fragment>
            )}
          </Formik>
          {/*<Button>
            <Text primary semibold h2>
              Reenviar codigo
            </Text>
          </Button>*/}
        </Block>
      </BaseKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    marginBottom: theme.sizes.base * 2,
  },
});
