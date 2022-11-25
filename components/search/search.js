import React from 'react';
import {View, TextInput, FlatList, Pressable} from from "react-native";
import prefixTree from '../../helpers/prefixTree.js';

const tagTree = new prefixTree();
const allTags = []; // get request for all tags in database;
for (i = 0; i < allTags.length; i++) {
  tagTree.addword(allTags[i]);
}

const Search = ({ navigation }) =>{
const [tagList, setTagList] = React.useState([]);
const changeHandler = function(prefix){
  if(!prefix){
    setTagList([]);
  }else {
    let tags = tagTree.startsWith(prefix);
    setTagList(tags);
  }
}
const pressHandler = function(tag) {
  //axios call to server for videos by tag
  //cal to video preview grid with my list
}
const on
  return (
    <View>
      <TextInput
        onChangeText={(e)=>{changeHandler(e.target.value)}}
        value={text}
      />
      <FlatList
        data={tagList}
        renderItem={(renderItem) =>{
          <Pressable
          key={renderItem}
          onPress={()=> pressHandler(key) }
          />
        }}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
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
