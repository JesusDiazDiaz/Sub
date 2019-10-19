import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Block, Text} from '../index';
import theme from '../../modules/theme';

const ProductCard = ({large}) => {
  return (
    <Block card color="white" shadow>
      <Block card style={styles.card}>
        <Image
          source={{uri: 'https://picsum.photos/400/300'}}
          style={large ? styles.imageLarge : styles.image}
        />
        <Block relative>
          <Block row center color="white" shadow style={styles.label}>
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
          <Block padding={[theme.sizes.base * 2, theme.sizes.base]}>
            <Text h3 semibold>
              Computadora
            </Text>
            <Block marginTop={theme.sizes.base / 2}>
              <Text gray title>
                Marca Dell de segunda mano
              </Text>
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
    borderBottomLeftRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [{translateY: -18.5}],
    width: '90%',
    maxWidth: 160,
  },
  price: {
    flex: 0,
    height: '100%',
  },
  card: {
    elevation: 1,
    borderRadius: theme.sizes.radius,
    overflow: 'hidden',
  },
  image: {
    height: 130,
  },
  imageLarge: {
    height: 180,
  },
});
