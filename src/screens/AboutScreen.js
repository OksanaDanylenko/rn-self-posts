import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>Last version of app</Text>
      <Text>
        Version <Text style={styles.version}>1.0.0</Text>
      </Text>
    </View>
  );
};

AboutScreen.options = ({ navigation }) => ({
  title: 'About App',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle drawer"
        iconName="ios-menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  version: {
    fontFamily: 'open-bold',
  },
});
