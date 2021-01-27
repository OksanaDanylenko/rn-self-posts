import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { toggleBooked, removePost } from '../store/actions/post';

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  let unsubscribe;
  React.useEffect(() => {
    unsubscribe = navigation.addListener('focus', () => {
      // do something
    });

    return unsubscribe;
  }, [navigation]);

  const { postId } = route.params;

  const post = useSelector((state) =>
    state.post.allPosts.find((p) => p.id === postId),
  );

  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId),
  );

  useEffect(() => {
    if (unsubscribe) navigation.setParams({ booked });
  }, [booked]);

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (unsubscribe) navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const removeHandler = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('MainScreen');
            dispatch(removePost(postId));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  if (!post) {
    return null;
  }

  return (
    <ScrollView style={styles.center}>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{post.text}</Text>
      </View>
      <Button
        title="Delete"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

PostScreen.options = ({ route }) => {
  const date = route.params.date;
  const booked = route.params.booked;
  const toggleHandler = route.params.toggleHandler;

  const iconName = booked ? 'ios-star' : 'ios-star-outline';
  return {
    title: 'Post ' + new Date(date).toLocaleDateString(),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title="Star" iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  text: {
    fontFamily: 'open-regular',
  },
});
