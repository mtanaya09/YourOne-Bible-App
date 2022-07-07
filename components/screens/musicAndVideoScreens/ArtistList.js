import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import sampleList from './shared/artists.json';
import { useNavigation } from "@react-navigation/native";
import VideoScreens from "./videoScreens";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const AppStack = createNativeStackNavigator();

function MyArtistList() {
  // FOR SEARCH BAR
  // const [searchInput, setSearchInput] = useState("");

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
      {/* <Image
        style={{ width: 64, height: 36 }}
        source={{ uri: item.thumbnail }}
      />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text> */}

      <View style={styles.postView}>
        <View style={styles.postTitle}>
          <View style={styles.imageView}>
            <Image
              style={styles.artistPhoto}
              source={{ uri: item.image }}
            />
            <View style={styles.titleView}>
              <Text style={styles.artist_name}>{item.name}</Text>
            </View>
          </View>
          <View>
            <Icon name="options-vertical" color="#989898" />
          </View>
        </View>
        <Image style={styles.coverPhoto} source={{ uri: item.cover }} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.mainView}>
      <Text style={styles.Heading}>Play Videos</Text>

      {/* searchview commented function for now */}

      {/* <View style={styles.TextInputView}>
        <TextInput
          value={searchInput}
          onChangeText={(val) => setSearchInput(val)}
          placeholder={"Search Artist's Name"}
          placeholderTextColor={"#000"}
          style={styles.TextInput}
        ></TextInput>
      </View> */}

      <FlatList
        data={sampleList}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
      />
    </View>
  );
}

function ArtistScreens() {
  return (
    <NavigationContainer independent={true}>
      <AppStack.Navigator initialRouteName="ArtistList">
        <AppStack.Screen
          name="ArtistList"
          component={MyArtistList}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="videoScreens"
          component={VideoScreens}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
export default function ArtistList() {
  return <ArtistScreens />;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  Heading: {
    fontSize: 30,
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: "bold",
  },

  TextInput: {
    height: 39,
    width: "90%",
    backgroundColor: "#EBEBEB",
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 20,
    marginBottom: 20,
  },

  postView: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },

  postTitle: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  imageView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  artistPhoto: {
    backgroundColor: "rgba(0,0,0,0.06)",
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  titleView: {
    marginLeft: 15,
  },

  artist_name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  post_title: {
    fontSize: 11,
    color: "#989898",
  },

  coverPhoto: {
    width: "90%",
    height: 200,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginTop: 20,
    borderRadius: 10,
  },
});
