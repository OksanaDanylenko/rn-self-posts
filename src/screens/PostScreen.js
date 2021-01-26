import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const PostScreen = ({ route, navigation }) => {
  const { postId } = route.params;

  const post = DATA.find((p) => p.id === postId);

  // useEffect(() => {
  //   navigation.setParams({
  //     booked: post.booked,
  //   });
  // }, []);

  const removeHandler = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {}, style: 'destructive' },
      ],
      { cancelable: false },
    );
  };

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

  const iconName = booked ? 'ios-star' : 'ios-star-outline';
  return {
    title: 'Post ' + new Date(date).toLocaleDateString(),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Star"
          iconName={iconName}
          onPress={() => console.log('press', route.params.booked)}
        />
      </HeaderButtons>
    ),
    // headerStyle: {
    //   backgroundColor: THEME.DANGER_COLOR,
    // },
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
