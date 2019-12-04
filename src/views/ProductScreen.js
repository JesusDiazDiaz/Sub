import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Auth} from 'aws-amplify';
import Icon from 'react-native-vector-icons';
import ProductLabel from '../components/Product/ProductLabel';
import {Button, Divider, Input, Block, Text} from '../components';
import theme from '../modules/theme';

const {width, height} = Dimensions.get('window');

class Product extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button onPress={() => {}}>
          <Icon.Entypo name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
      ),
    };
  };

  renderGallery() {
    const {product} = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            resizeMode="cover"
            style={{
              width,
              height: height / 2.8,
              backgroundColor: theme.colors.gray2,
            }}
          />
        )}
      />
    );
  }

  render() {
    const {product} = this.props;

    return (
      <Block style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderGallery()}
          <ProductLabel style={styles.label} />
          <Block style={styles.product}>
            <Text h3 height={40} semibold>
              {product.name}
            </Text>
            {/* <Block flex={false} row margin={[theme.sizes.base, 0]}>
              {product.tags.map(tag => (
                <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </Block>*/}
            <Text gray height={22}>
              {product.description}
            </Text>

            <Divider margin={[theme.sizes.padding * 0.9, 0]} />

            <Block>
              <Text semibold>Galeria</Text>
              <Block row margin={[theme.sizes.padding * 0.9, 0]}>
                {product.images.slice(1, 3).map((image, index) => (
                  <Image
                    key={`gallery-${index}`}
                    source={{uri: image}}
                    style={styles.image}
                  />
                ))}
                <Block
                  flex={false}
                  card
                  center
                  middle
                  color="rgba(197,204,214,0.20)"
                  style={styles.more}>
                  <Text gray>+{product.images.slice(3).length}</Text>
                </Block>
              </Block>
            </Block>
          </Block>

          <Block padding={[0, theme.sizes.base * 2]}>
            <Button large outline color="primary">
              <Text center h2 semibold color={theme.colors.primary}>
                Comprar
              </Text>
            </Button>

            <Button large color="primary">
              <Text center h2 semibold color={theme.colors.white}>
                Pujar
              </Text>
            </Button>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Product.defaultProps = {
  product: {
    id: 1,
    name: '16 Best Plants That Thrive In Your Bedroom',
    description:
      'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
      // showing only 3 images, show +6 for the rest
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
      'https://picsum.photos/800/800',
    ],
  },
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  label: {
    transform: [{translateY: -18.5}],
    marginLeft: 'auto',
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
    backgroundColor: theme.colors.gray2,
  },
  more: {
    width: 55,
    height: 55,
  },
});
