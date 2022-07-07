import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  FlatList,
} from "react-native";
import React, { useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MusicAlbum from "./musicAndVideoScreens/MusicAlbumScreen";
import VideoScreens from "./musicAndVideoScreens/videoScreens";
import {
  ArtistList,
  artists,
  MediaPlayerContext,
} from "./musicAndVideoScreens/shared";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../ColorList/colors";
import SongList from "./musicAndVideoScreens/SongList";
import MusicScreens from "./musicAndVideoScreens/musicScreens";
import { StatusBar } from "expo-status-bar";

const AppStack = createNativeStackNavigator();

function HomepageScreen() {
  const textBox = useRef(null);
  const data = [
    <ArtistList
      headerText={"Preachings"}
      nextScreen={"MusicAlbum"}
      sauce={artists.filter((artist) =>
        artist.type == "Preaching" ? artist : null
      )}
      horizontal
      showAll
      type="Preaching"
    />,
    <ArtistList
      headerText={"Browse Music"}
      nextScreen={"MusicAlbum"}
      sauce={artists.filter((artist) =>
        artist.type == "Music" ? artist : null
      )}
      horizontal
      showAll
      type="Music"
    />,
  ];

  const renderLists = ({ item }) => <View>{item}</View>;
  const onSearchPressed = () => {
    alert(
      "this button only makes the textbox grab focus, actual searching soon"
    );
    textBox.current.focus();
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        {/* the whole white bar at the top */}
        <View
          //The first row, which includes the YourOne title and the YourOne icon
          style={styles.titleBar}>
          <Text style={styles.titleText}>YourOne</Text>

          <Image
            style={styles.imageYourOne}
            source={require("../../assets/yourone-gray.png")}
          />
        </View>
        <View
          /*second row, which includes the textbox and search icon*/ style={
            styles.search
          }>
          <TextInput
            ref={textBox}
            style={styles.textinput}
            placeholder={"Search"}
            placeholderTextColor={colors.GRAY}
          />
          <Icon
            name="search"
            size={30}
            style={styles.searchIcon}
            onPress={onSearchPressed}
          />
        </View>
      </View>
      <View
        //the body of the screen
        style={styles.body}>
        {/* other view will display here */}

        <FlatList
          data={data}
          renderItem={renderLists}
          keyExtractor={(item, index) => {
            //console.log(`${item.headerText}_${index}`);
            return `${item.headerText}_${index}`;
          }}
          ListHeaderComponent={
            /* wotd needs to be its own component, to declutter the homescreen */
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingBottom: 10,
                  color: colors.WHITE,
                }}>
                Verse of the day
              </Text>
              {/* word of the day (default for now) */}
              <Image
                style={styles.dailyVerse}
                resizeMode={"cover"}
                source={require("../../assets/verse1.png")}
              />
            </View>
          }
          ListHeaderComponentStyle={{
            height: "30%",
            width: "100%",
            paddingBottom: 80,
            marginBottom: 25,
            paddingTop: 10,
            paddingHorizontal: 10,
            //backgroundColor: "#fff"
          }}
          contentContainerStyle={{}}
        />
      </View>
    </View>
  );
}

function MusicAndVideoScreens() {
  return (
    <MediaPlayerContext>
      <NavigationContainer independent={true}>
        <AppStack.Navigator initialRouteName="homeScreen">
          <AppStack.Screen
            name="homeScreen"
            component={HomepageScreen}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="MusicAlbum"
            component={MusicAlbum}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="ArtistList"
            component={ArtistList}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="SongList"
            component={SongList}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="videoScreens"
            component={VideoScreens}
            options={{ headerShown: false }}
          />
          <AppStack.Screen
            name="Walkman"
            component={MusicScreens}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </MediaPlayerContext>
  );
}
export default function HomeScreen() {
  return <MusicAndVideoScreens />;
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.WHITE },
  header: {
    marginTop: 45,
    marginLeft: "5%",
    //marginBottom: 5,
    marginRight: "5%",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
  },

  imageYourOne: {
    zIndex: 1,
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  search: {
    backgroundColor: "#e6e6e6",
    fontSize: 15,
    borderRadius: 10,
    flexDirection: "row",
    //justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: 5,
  },

  searchIcon: {
    color: colors.GRAY,
    zIndex: 1,
    flex: 1,
  },
  textinput: {
    flex: 9,
    height: 50,
    color: "#696969",
    width: "100%",
    //backgroundColor: "#b0b0b0",
  },
  body: {
    backgroundColor: colors.WHITE,
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 7,
    flexDirection: "column",
  },

  dailyVerse: {
    height: 220,
    width: "90%",
    borderRadius: 40,
    alignSelf: "center",
  },
});
