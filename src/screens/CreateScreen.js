import React, { useState, useRef } from 'react';
import { CommonActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { DrawerActions } from '@react-navigation/native';
import { addPost } from '../store/actions/post';
import { THEME } from '../theme';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const imgRef = useRef();

  const img =
    'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80';

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false,
    };
    dispatch(addPost(post));
    // navigation.goBack('MainScreen');
    navigation.navigate('Blog', {
      screen: 'StackNavigator',
    });

    // this.props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'MainScreen' }],
    //   }),
    // );
  };

  const pickHandler = (uri) => {
    imgRef.current = uri;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new post</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Enter text note"
            onChangeText={setText}
            multiline
          />
          <Image
            style={{ width: '100%', height: 200, marginBottom: 10 }}
            source={{
              uri: imgRef.current,
            }}
          />
          <PhotoPicker onPick={pickHandler} />
          <Button
            title="Create post"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
});
