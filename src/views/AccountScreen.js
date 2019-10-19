import React from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import {pushLoginScreen} from '../navigation';

const AccountScreen = () => {
  const handleLogout = async () => {
    try {
      await Auth.signOut({global: true});
      pushLoginScreen();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={handleLogout} title="logout" />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
