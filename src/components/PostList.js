import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Post } from './Post';

export const PostList = ({ data, onOpen }) => {
  if (!data.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>No Items</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(post) => post.text}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
  },
});
