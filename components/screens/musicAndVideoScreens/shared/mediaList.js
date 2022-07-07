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
import { artists } from "./artists.json";
import { getArtistName, sortMediaList } from "./methods";
import { useQueueUpdate } from "./MediaPlayerContext";

const MediaList = ({
  sauce = Array({
    id: Number(),
    title: String(),
    artist: Number(),
    image: String(),
    source: String(),
    duration: Number(),
    caption: String(),
  }),
  nextScreen = String(),
  headerText = String(),
  horizontal = false,
  flexRow = false,
  showArtist = false,
  updateQueue = false,
}) => {
  //for music and video list
  const navigation = useNavigation();
  const update = useQueueUpdate();
  const renderList = (
    { item } //might need to change some stuff, depending on the json that will be returned by the server
  ) => (
    <TouchableOpacity
      style={{
        ...styles.item,
        flexDirection: flexRow != true ? "column" : "row",
      }}
      onPress={() => {
        if (updateQueue) {
          update(sauce);
        }
        navigation.navigate(nextScreen, { itemID: item.id }); //pass the selected clip's id
      }}
    >
      <Image
        style={{ width: 160, height: 120, borderRadius: 15 }}
        source={{ uri: item.image }}
      />
      <View style={styles.imageTitleArtist}>
        <Text style={styles.title}>{item.title}</Text>
        {showArtist && (
          <Text style={{ color: "#b0b0b0" }}>
            {getArtistName(item.artist, artists)}
          </Text>
        )}
      </View>
      {/* <Text >{item.caption}</Text> */}
    </TouchableOpacity>
  );
  sortMediaList(sauce);
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
        horizontal={horizontal == true ? true : false}
        data={sauce}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListEmptyComponent={
          <View>
            <Text style={styles.title}>Empty</Text>
          </View>
        }
      />
    </View>
  );
};

export default MediaList;

const styles = StyleSheet.create({
  container: {},
  preaching: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  item: {
    marginTop: colors.PADDING,
    marginLeft: colors.PADDING,
    marginRight: colors.PADDING,
    justifyContent: "flex-start",
  },
  title: {
    //marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.BLACK,
    flexShrink: 1,
  },
  imageTitleArtist: {
    justifyContent: "space-evenly",
    paddingLeft: colors.PADDING,
    flexShrink: 1,
  },
});
