import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Divider, Button, Block, Text, Switch} from '../components';
import theme from '../modules/theme';
import {pushProductScreen} from '../navigation';

const products = [
  {
    id: 1,
    image: 'https://picsum.photos/400/300',
    title: 'Auto clasico',
    time: '04hr 19m 03s',
  },
  {
    id: 2,
    image: 'https://picsum.photos/400/300',
    title: 'Computadora',
    time: '12hr 19m 03s',
  },
];

const MyProductsScreen = ({componentId}) => {
  const renderRequest = product => {
    return (
      <Block row card shadow color="white" style={styles.request}>
        <Block flex={0.25} card color="secondary" style={styles.requestStatus}>
          <Image
            source={{uri: product.image}}
            resizeMode="cover"
            style={styles.productImage}
          />
        </Block>
        <Block flex={0.75} marginLeft={theme.sizes.base} column middle>
          <Text h3 semibold style={{paddingBottom: 8}}>
            {product.title}
          </Text>
          <Text caption semibold>
            {product.time}
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Block flex={0.8} column style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <Text header>Subastas</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text semibold>Todas</Text>
          </TouchableOpacity>
        </Block>
        <ScrollView
          style={{overflow: 'visible'}}
          showsVerticalScrollIndicator={false}>
          {products.map(product => (
            <TouchableOpacity
              onPress={() => pushProductScreen(componentId)}
              activeOpacity={0.8}
              key={`product-${product.id}`}>
              {renderRequest(product)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  request: {
    padding: 20,
    marginBottom: 15,
  },
  requestStatus: {
    overflow: 'hidden',
    height: 90,
  },
  productImage: {
    height: '100%',
    width: '100%',
  },
});

MyProductsScreen.defaultProps = {};

export default MyProductsScreen;
