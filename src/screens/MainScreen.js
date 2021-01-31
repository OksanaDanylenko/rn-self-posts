import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import { useIsDrawerOpen } from '@react-navigation/drawer';

export const MainScreen = ({ navigation }) => {
  const isDrawerOpen = useIsDrawerOpen();
  console.log('route.name', isDrawerOpen);

  const openPostHandler = (post) => {
    console.log('onOpen', post);
    navigation.navigate('PostScreen', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const allPosts = useSelector((state) => state.post.allPosts);

  return <PostList data={allPosts} onOpen={openPostHandler} />;
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
