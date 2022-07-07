import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MusicArtistListSample from "./musicComponents/MusicArtistListSample.json";
import { useNavigation } from "@react-navigation/native";
import { collections, CollectionList, getArtistName, artists } from "./shared";
import { StatusBar } from "expo-status-bar";
const AppStack = createNativeStackNavigator();
const numColumns = 2;

function AlbumsScreen({ route }) {
  // FOR SEARCH BAR
  // const [searchInput, setSearchInput] = useState("");
  const { itemID } = route.params; //artist's ID
  const navigation = useNavigation();
  const list = collections.filter((collection) =>
    collection.artist == itemID ? collection : null
  );
  
  return (
    <View style={styles.mainView}>
      <StatusBar style="light" />
      <View>
        <Text style={styles.Heading}>
          {getArtistName(itemID, artists)}
        </Text>
        <CollectionList
          nextScreen={"SongList"}
          sauce={list.length == 0 ? [{ artist: itemID }] : list}
        />
      </View>
    </View>
  );
}

export default AlbumsScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Heading: {
    fontSize: 25,
    marginTop: 50,
    marginBottom: 25,
    marginLeft: 22,
    color: 'black',
    fontWeight: "bold",

  },

  postView: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },

  titleView: {
    marginLeft: 15,
  },

  artist_name: {
    fontSize: 16,
    marginTop: 5,
    bottom: 10,
    opacity: 0.8,
    color: "white",
    marginLeft: 3,
  },
  coverStyle: {
    height: 180,
    width: 155,
    flex: 1,
    marginBottom: 10,
  },
});
