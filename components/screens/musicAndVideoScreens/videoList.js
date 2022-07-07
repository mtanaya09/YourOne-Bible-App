import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import sampleList from "./videoComponents/sampleData.json"; //test json list object
import { useNavigation } from "@react-navigation/native";

const VideoList = () => {
  const navigation = useNavigation();
  const renderList = (
    { item } //might need to change some stuff, depending on the json that will be returned by the server
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("videoScreens", item.id); //pass the selected clip's id
      }}
    >
      <Image
        style={{ width: 64, height: 36 }}
        source={{ uri: item.thumbnail }}
      />
      <Text> {item.title} </Text> <Text> {item.description} </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text> videoList </Text>
      <FlatList
        numColumns={2}
        data={sampleList}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
      />
    </View>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  container: {},
  item: { padding: 20 },
});
