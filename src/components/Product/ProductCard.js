import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {Block, Text} from '../index';
import theme from '../../modules/theme';
import ProductLabel from './ProductLabel';

const {width} = Dimensions.get('window');

const ProductCard = ({large}) => {
  const cardStyle = [large && styles.cardLarge, styles.card];

  return (
    <Block card color="white" shadow>
      <Block card style={cardStyle}>
        <Image
          source={{uri: 'https://picsum.photos/400/300'}}
          style={large ? styles.imageLarge : styles.image}
        />
        <Block relative>
          <ProductLabel style={styles.label} />
          <Block padding={[theme.sizes.base * 2, theme.sizes.base]}>
            <Text h3 semibold>
              Computadora
            </Text>
            <Block marginTop={theme.sizes.base / 2}>
              <Text gray>Marca Dell de segunda mano</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [{translateY: -18.5}],
  },
  card: {
    elevation: 1,
    borderRadius: theme.sizes.radius,
    overflow: 'hidden',
  },
  image: {
    height: 130,
  },
  cardLarge: {
    width: width * 0.6,
  },
  imageLarge: {
    height: 180,
  },
});
