import React from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { TextInput } from '@react-native-material/core';
import prefixTree from '../../helpers/prefixTree.js';
import Thumbnails from '../profile/Thumbnails.js';
import { LightButton } from '../lib/buttons/CustomButton';
import axios from 'axios';

const tagTree = new prefixTree();

export default function Search({ navigation }) {
  const [tagList, setTagList] = React.useState([]);
  const [videos, setVideos] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const changeHandler = function (prefix) {
    if (!prefix) {
      setTagList([]);
    } else {
      let tags = tagTree.startsWith(prefix);
      console.log(tags);
      setTagList(tags);
    }
  };
  React.useEffect(() => {
    axios
      .get('https://yummy-production.up.railway.app/videos/tags')
      .then((res) => {
        const allTags = res.data;
        for (let i = 0; i < allTags.length; i++) {
          tagTree.addword(allTags[i].tag);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    changeHandler(searchText);
  }, [searchText]);

  const handleTouch = () => {
    navigation.navigate('ProfileVideos');
  };
  const pressHandler = function (tag) {
    axios
      .get(`https://yummy-production.up.railway.app/videos/${tag}`)
      .then((res) => {
        setTagList([]);
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="Search by for tags here..."
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <FlatList
        data={tagList}
        renderItem={({ item }) => {
          return <LightButton key={item} onPress={() => pressHandler(item)} text={item} />;
        }}
      />
      <Thumbnails videos={videos} handleTouch={handleTouch} />
    </View>
  );
}

//import prefixtree
// query db for list of unique tags currently in db
// add all tags to the prefix tree

//render searchbar
//onchange search prefixtree for tags
//populate dropdown options with tags from pefixtree
//onsubmit tell video carosel to populate based on that tag.
