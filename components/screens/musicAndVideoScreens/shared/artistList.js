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

const ArtistList = ({
  sauce = [
    { id: "", artist: "", image: "", cover: "", type: "" },
  ] /* an array that contains artistItems */,
  nextScreen = "" /* the next screen to render after selection */,
  headerText = "" /* Any header texts to render before the list */,
  headerTextStyle = StyleSheet.style,
  horizontal = false /* whether to render the list horizontally */,
  showAll = false,
  type = "Music" || "Preaching",
}) => {
  //for music and video list
  const navigation = useNavigation();
  //console.log(headerTextStyle);
  const renderList = (
    { item } //might need to change some stuff, depending on the json that will be returned by the server
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        //console.log(item.artist);
        item.id == -1
          ? navigation.navigate("SongList", {
              itemID: item.id,
            }) // go straight to songs screen when song all is selected
          : navigation.navigate(nextScreen, {
              itemID: item.id,
            }); //pass the selected artist's id
      }}>
      <Image
        style={{ width: 160, height: 120, borderRadius: 15 }}
        source={{ uri: item.image }}
      />
      <Text style={styles.title}>{item.name}</Text>
      {/* <Text >{item.caption}</Text> */}
    </TouchableOpacity>
  );
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
      <View style={styles.titleSeeAll}>
        {/* =====================================header===================================== */}
        <Text
          style={
            headerTextStyle == undefined ? styles.preaching : headerTextStyle
          }>
          {headerText}
        </Text>
        {showAll && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SongList", {
                itemID: -1,
                artistID: undefined,
                mediaType: type,
              });
            }}>
            <Text
              style={{
                color: colors.BLACK,
                fontSize: 20,
                textDecorationLine: "underline",
              }}>
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        horizontal={horizontal == true ? true : false}
        data={sauce}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

export default ArtistList;

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
  },
  titleSeeAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
