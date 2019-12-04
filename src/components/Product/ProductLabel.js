import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Block} from '../index';
import {Text} from '../../components';
import theme from '../../modules/theme';

const ProductLabel = ({time, price, style, ...props}) => {
  const labelStyles = [styles.label, style];

  return (
    <Block row center color="white" shadow style={labelStyles} {...props}>
      <Block row center padding={theme.sizes.base / 2}>
        <Block marginRight={theme.sizes.base / 2}>
          <Image source={require('../../assets/icons/clock.png')} />
        </Block>
        <Text>04hr 19m 03s</Text>
      </Block>

      <Block
        style={styles.price}
        paddingHorizontal={theme.sizes.base / 2}
        center
        middle
        color="primary">
        <Text medium color="white">
          $80k
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  label: {
    borderBottomLeftRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
    width: '90%',
    maxWidth: 160,
  },
  price: {
    flex: 0,
    height: '100%',
  },
});

export default ProductLabel;
