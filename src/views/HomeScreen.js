import React, {useState, useEffect} from 'react';
import {API, Auth} from 'aws-amplify';
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
import {pushProductScreen} from '../navigation';

const items = [1, 2, 3, 4];

const categories = [
  {
    id: 1,
    name: 'Descubrir',
  },
  {
    id: 2,
    name: 'Tecnologia ',
  },
  {
    id: 3,
    name: 'Hogar',
  },
  {
    id: 4,
    name: 'Juguetes',
  },
  {
    id: 5,
    name: 'Motor',
  },
];

const HomeScreen = ({componentId}) => {
  const [currentCategory, setCurrentCategory] = useState(1);

  const fetchProducts = async () => {
    try {
      console.log('fetch products...');
      const apiResponse = await API.get('sub', '/products/objects/');
      console.log('response:' + apiResponse);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(`with ${currentCategory} category`);
    fetchProducts();
    return () => {};
  }, [currentCategory]);

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
          data={categories}
          style={[styles.list, styles.categoriesList]}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => setCurrentCategory(item.id)}>
              <Block paddingHorizontal={theme.sizes.base / 2}>
                <Text gray={item.id !== currentCategory} h2 semibold>
                  {item.name}
                </Text>
              </Block>
            </TouchableWithoutFeedback>
          )}
        />
        <FlatList
          horizontal
          scrollEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          data={items}
          style={[styles.mainList, styles.list]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => pushProductScreen(componentId)}>
              <Block paddingHorizontal={theme.sizes.base / 2}>
                <ProductCard large />
              </Block>
            </TouchableWithoutFeedback>
          )}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={items}
          numColumns={2}
          style={[styles.secondaryList, styles.list]}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => pushProductScreen(componentId)}>
              <Block padding={theme.sizes.base / 2}>
                <ProductCard />
              </Block>
            </TouchableWithoutFeedback>
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
  categoriesList: {
    paddingTop: theme.sizes.base,
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
