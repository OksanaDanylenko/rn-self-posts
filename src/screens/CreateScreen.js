import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { DrawerActions } from '@react-navigation/native';

export const CreateScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>CreateScreen</Text>
    </View>
  );
};

CreateScreen.options = ({ navigation }) => ({
  title: 'Create Post',
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
});
