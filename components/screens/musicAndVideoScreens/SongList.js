import { StyleSheet, Text, View } from "react-native";
import React from "react";
//import { useNavigation } from "@react-navigation/native";
import {
  artists,
  collections,
  getArtistName,
  getArtistType,
  getCollectionTitle,
  MediaList,
} from "./shared";
import sampleData from "./musicComponents/MusicArtistListSample.json";
import { StatusBar } from "expo-status-bar";

function SongsScreen({ route }) {
  //FOR SEARCH BAR
  // const [searchInput, setSearchInput] = useState("");
  const { itemID, artistID, mediaType } = route.params; //an itemID of -1 will render all songs of that artist
  const songs =
    itemID == -1 //if id is -1, show media from all collections
      ? artistID == undefined //check if there's any artist filter
        ? sampleData.filter((media) => mediaType == getArtistType(media.artist)) //render all songs if no artistID
        : sampleData.filter(
            (
              song //else render all of the artist's songs
            ) => (song.artist == artistID ? song : null)
          )
      : sampleData.filter(
          //otherwise, render the collection
          (
            song //render all collection's songs
          ) => (song.collection == itemID ? song : null)
        );
  //const navigation = useNavigation();
  /* const renderSongList = (
    { item } //might need to change some stuff, depending on the json that will be returned by the server
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("musicScreens", item.id); //pass the selected clip's id
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.postView}>
          <View style={styles.postTitle}>
            <View style={styles.imageView}>
              <Image
                style={styles.artistPhoto}
                source={{ uri: item.artist_photo }}
              />
              <View style={styles.titleView}>
                <Text style={styles.post_title}> {item.title} </Text>
                <Text style={styles.artist_name}> {item.post_artist} </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ); */
  return (
    <View style={styles.mainView}>
      <StatusBar style="light" />
      <Text style={styles.Heading}>
        {itemID == -1
          ? `All${
              artistID != undefined
                ? " " + getArtistName(artistID, artists)
                : ""
            } ${mediaType == "Preaching" ? "preachings" : "songs"}`
          : getCollectionTitle(itemID, collections)}
      </Text>

      <MediaList
        sauce={songs}
        nextScreen={
          mediaType == "Preaching" ? "videoScreens" : "Walkman"
        }
        flexRow
        showArtist
        updateQueue
      />
    </View>
  );
}
export default SongsScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  Heading: {
    fontSize: 25,
    marginTop: 55,
    marginBottom: 20,
    marginLeft: 20,
    fontWeight: "bold",
    opacity: 0.9,
    color: "#000000",
  },
  /* 
  postView: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
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
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleView: {
    marginLeft: 20,
  },

  artist_name: {
    fontSize: 12,
    color: "white",
    opacity: 0.5,
  },

  post_title: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
    fontWeight: "bold",
  },

  coverPhoto: {
    width: "90%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    width: "95%",
    height: 80,
    marginTop: 5,
    marginEnd: 5,
    marginRight: 5,
    marginLeft: 10,
    borderRadius: 10,
  }, */
});
