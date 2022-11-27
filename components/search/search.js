import React from 'react';
import {StyleSheet, View, TextInput, FlatList, Pressable} from from "react-native";
import prefixTree from '../../helpers/prefixTree.js';
import Thumbnails from '../profile/Thumbnails.js';
import { LightButton } from '../lib/buttons/CustomButton';

const tagTree = new prefixTree();

const Search = ({ navigation }) =>{
  const [tagList, setTagList] = React.useState([]);
  const [videos, setVideos] = React.useState([])
  const changeHandler = function(prefix){
    if(!prefix){
      setTagList([]);
    }else {
      let tags = tagTree.startsWith(prefix);
      setTagList(tags);
    }
  }
  React.useEffect(() => {
    axios.get('http://18.212.89.94:3000/videos/tags')
    .then((res) =>{
          const allTags = res.data
          for (i = 0; i < allTags.length; i++) {
            tagTree.addword(allTags[i]);
          }

    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  const handleTouch = () => {
    navigation.navigate("bottombar");
  }
  const pressHandler = function(tag) {
    axios.get(`http://18.212.89.94:3000/videos/${tag}`)
      .then(res => {
        setTagList([]);
        setVideos(res.data);
      })
      .catch(err =>{
        console.log(err)
      })
}
const on
  return (
    <View>
      <View>
      <TextInput
        placeholder="Search by for tags here..."
        onChangeText={(e)=>{changeHandler(e.target.value)}}
        value={text}
      />
      </View>
      <FlatList
        data={tagList}
        renderItem={(renderItem) =>{
          <LightButton
          key={renderItem}
          onPress={()=> pressHandler(key) }
          text={renderItem}
          />
        }}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <Thumbnails videos={videos} handleTouch={handletouch}/>
    </View>
  )

}



//import prefixtree
// query db for list of unique tags currently in db
// add all tags to the prefix tree

//render searchbar
//onchange search prefixtree for tags
  //populate dropdown options with tags from pefixtree
//onsubmit tell video carosel to populate based on that tag.
