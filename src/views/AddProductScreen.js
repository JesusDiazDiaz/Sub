import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Amplify, {API} from 'aws-amplify';
import BaseKeyboardAvoidingView from '../components/BaseKeyboardAvoidingView';
import theme from '../modules/theme';
import {Formik} from 'formik';
import {Block, Button, Input, Text} from '../components';
import ErrorMessage from '../components/ErrorMessage';
import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup.string().required('Nombre es requerido'),
  description: yup.string().required('Descripcion es requerido'),
  price: yup.string().required('Precio es requerido'),
});

const AddProductScreen = ({componentId}) => {
  const handleSave = async data => {
    console.log('calling api');
    const response = await API.post('sub', '/items', {
      body: data,
    });
    alert(JSON.stringify(response, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseKeyboardAvoidingView>
        <Block middle padding={[theme.sizes.base, theme.sizes.base * 2]}>
          <View style={styles.title}>
            <Text medium h1>
              Nueva subasta
            </Text>
            <Block marginTop={theme.sizes.base}>
              <Text body>
                Las subasta tiene un tiempo de vigencia de 24 horas.
              </Text>
            </Block>
          </View>

          <Formik
            validationSchema={schema}
            initialValues={{
              name: '',
              description: '',
              price: '',
            }}
            onSubmit={handleSave}>
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
                    label="Descripcion"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                  <ErrorMessage name="description" />
                  <Input
                    label="Valor inicial"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                  />
                  <ErrorMessage name="price" />
                </View>
                <Button onPress={handleSubmit} large color="primary">
                  <Text center h2 semibold color={theme.colors.white}>
                    Guardar
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

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: theme.sizes.base * 1.5,
  },
  formWrapper: {
    marginBottom: theme.sizes.base * 2,
  },
  leftSpacing: {
    marginLeft: theme.sizes.base / 2,
  },
});
