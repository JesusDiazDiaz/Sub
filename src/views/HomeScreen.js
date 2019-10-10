import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Text, Input, Block} from '../components';
import theme from '../modules/theme';
import ProductCard from '../components/Product/ProductCard';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Input
            iconLeft={<Image source={require('../assets/icons/search.png')} />}
            disableUnderline
            placeholder="Buscar"
          />
          <ProductCard />
        </Block>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
