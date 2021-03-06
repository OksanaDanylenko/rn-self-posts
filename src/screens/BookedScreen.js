import React from 'react';
import { useSelector } from 'react-redux';
import { PostList } from '../components/PostList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const BookedScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('PostScreen', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  const bookedPosts = useSelector((state) => state.post.bookedPosts);

  return <PostList data={bookedPosts} onOpen={openPostHandler} />;
};

BookedScreen.options = {
  title: 'Booked',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle drawer"
        iconName="ios-menu"
        onPress={() => console.log('press')}
      />
    </HeaderButtons>
  ),
};
