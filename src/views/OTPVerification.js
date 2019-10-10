import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Auth} from 'aws-amplify';
import {Text, Button, Block} from '../components';
import theme from '../modules/theme';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import {pushTabBasedApp} from '../navigation';

const OTPVerification = ({componentId, username}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(username);

  const handleVerification = async () => {
    try {
      setLoading(true);
      const data = await Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true,
      });
      console.log(data);
      pushTabBasedApp();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseKeyboardAvoidingView>
        <Block middle padding={[theme.sizes.base, theme.sizes.base * 2]}>
          <Text medium h1>
            Verificacion OTP
          </Text>
          <Block marginTop={theme.sizes.base}>
            <Text gray h2>
              Ingrese el código de verificación enviado a
            </Text>
            <Text semibold h2>
              +573002792095
            </Text>
          </Block>
          <OTPInputView
            style={styles.input}
            pinCount={6}
            code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={value => setCode(value)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
              //setIsValid(true);
            }}
          />
          <Button>
            <Text primary semibold h2>
              Reenviar codigo
            </Text>
          </Button>
          <Block marginTop={theme.sizes.base * 2}>
            <Button
              disabled={code.length < 6}
              onPress={handleVerification}
              large
              loading={loading}
              color="primary">
              <Text center h2 semibold color={theme.colors.white}>
                Continuar
              </Text>
            </Button>
          </Block>
        </Block>
      </BaseKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 150,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    color: theme.colors.black,
    backgroundColor: theme.colors.gray,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 46,
    height: 66,
    borderRadius: 5,
    color: theme.colors.black,
    backgroundColor: 'rgba(165,165,182, 0.5)',
    fontSize: theme.sizes.h2,
    borderWidth: 0,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
