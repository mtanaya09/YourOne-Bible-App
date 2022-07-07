import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
//import sampleList from "../videoComponents/sampleList.json"; //test json list object
import { useNavigation } from "@react-navigation/native";
import colors from "../../../ColorList/colors";
import { getArtistType } from "./methods";

const CollectionList = ({
  sauce = {
    //collectionObject
    id: Number(),
    title: String(),
    artist: Number(),
    image: String(),
  } /* an array that contains collectionItems */,
  nextScreen = String() /* the next screen to render after selection */,
  headerText = String() /* Any header texts to render before the list */,
  showAll = true,
}) => {
  //for music and video list
  const navigation = useNavigation();
  const renderList = (
    { item } //might need to change some stuff, depending on the json that will be returned by the server
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate(nextScreen, {
          itemID: item.id,
          artistID: item.artist,
          mediaType: getArtistType(item.artist),
        }); //pass the selected artist's id
      }}>
      <Image
        style={{ width: 160, height: 120, borderRadius: 15 }}
        source={{ uri: item.image }}
      />
      <Text style={styles.title}>{item.title}</Text>
      {/* <Text >{item.caption}</Text> */}
    </TouchableOpacity>
  );
  const list = sauce.id == undefined ? [] : sauce;
  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          borderBottomColor: "#B3B3B3",
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      />
      <Text style={styles.preaching}>{headerText}</Text>
      <FlatList
        numColumns={2}
        data={
          showAll
            ? [
                {
                  id: -1,
                  title: `All ${
                    getArtistType(sauce[0].artist) == "Preaching"
                      ? "preachings"
                      : "songs"
                  }`,
                  artist: sauce[0].artist, //get the artist
                  image:
                    "https://images.wallpaperscraft.com/image/single/treble_clef_musical_notes_multicolored_121263_300x168.jpg",
                },
                ...list,
              ]
            : list
        }
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

export default CollectionList;

const styles = StyleSheet.create({
  container: {},
  preaching: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  item: { marginTop: 10, marginLeft: 10, marginRight: 10 },
  title: {
    //marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.BLACK,
    textAlign: "center",
  },
});
