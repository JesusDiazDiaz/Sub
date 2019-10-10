import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Block, Text} from '../index';
import theme from '../../modules/theme';

const ProductCard = () => {
  return (
    <Block style={styles.wrapper}>
      <Block card style={styles.card}>
        <Image
          source={{uri: 'https://picsum.photos/400/300'}}
          style={styles.image}
        />
        <Block
          padding={[
            theme.sizes.base * 2,
            theme.sizes.base,
            theme.sizes.base,
            theme.sizes.base,
          ]}>
          <Text h2 semibold>
            Computadora
          </Text>
          <Text gray h3>
            Marca Dell de segunda mano
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  wrapper: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius,
  },
  card: {
    elevation: 1,
    borderRadius: theme.sizes.radius,
    overflow: 'hidden',
  },
  image: {
    height: 150,
  },
});
