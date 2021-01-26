import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { DATA } from '../data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';

export const MainScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('PostScreen', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };
  return <PostList data={DATA} onOpen={openPostHandler} />;
};

MainScreen.options = ({ navigation }) => ({
  title: 'My Blog',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Take photo"
        iconName="ios-camera"
        onPress={() => navigation.push('Create')}
      />
    </HeaderButtons>
  ),
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
