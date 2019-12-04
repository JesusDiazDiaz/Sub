import React from 'react';
import {Block, Text} from '../components';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import theme from '../modules/theme';

const NotificationsScreen = () => {
  const renderItem = request => {
    return (
      <Block row card shadow color="white" style={styles.request}>
        <Block column middle>
          <Text header style={{paddingVertical: 8}}>
            Tienes un nuevo comentario en tu producto
          </Text>
          <Text caption semibold>
            12/11/2012
          </Text>
        </Block>
      </Block>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Block style={styles.content}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <Text header>Notificaciones</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text semibold>View All</Text>
          </TouchableOpacity>
        </Block>
        <ScrollView
          style={{overflow: 'visible'}}
          showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map(request => (
            <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`}>
              {renderItem(request)}
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
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  request: {
    padding: 20,
    marginBottom: 15,
  },
  content: {
    paddingHorizontal: 15,
  },
});

export default NotificationsScreen;
