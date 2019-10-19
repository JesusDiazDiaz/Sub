import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from 'react-native';
import {Text, Input, Block} from '../components';
import theme from '../modules/theme';
import ProductCard from '../components/Product/ProductCard';

const items = [1, 2, 3, 4];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Input
            center
            flex={false}
            row
            iconLeft={<Image source={require('../assets/icons/search.png')} />}
            disableUnderline
            placeholder="Buscar"
          />
        </Block>
        <FlatList
          horizontal
          scrollEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          data={items}
          style={[styles.mainList, styles.list]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Block paddingHorizontal={theme.sizes.base / 2}>
              <ProductCard large />
            </Block>
          )}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={items}
          numColumns={2}
          style={[styles.secondaryList, styles.list]}
          renderItem={({item}) => (
            <Block padding={theme.sizes.base / 2}>
              <ProductCard />
            </Block>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: theme.sizes.base,
    overflow: 'visible',
  },
  mainList: {
    paddingVertical: theme.sizes.base * 2,
    paddingRight: theme.sizes.base * 3,
  },
  secondaryList: {
    marginBottom: theme.sizes.base * 2,
  },
});
