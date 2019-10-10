import React from 'react';
import Text from './Text';
import {ErrorMessage as FormikErrorMessage} from 'formik';

const ErrorMessage = ({name, ...props}) => {
  return (
    <Text primary {...props}>
      <FormikErrorMessage name={name} />
    </Text>
  );
};

export default ErrorMessage;
