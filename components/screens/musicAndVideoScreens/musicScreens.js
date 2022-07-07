import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import songs from "./musicComponents/MusicArtistListSample.json"; //"./musicComponents/musicData";
import { Video } from "expo-av";
import {
  convertFromMillisecond,
  togglePause,
  syncSeekValue,
  getMediaItem,
  getArtistName,
  useQueueContext,
} from "./shared";

const { width } = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("window").width;

const MusicScreens = ({ route }) => {
  const { itemID } = route.params;
  const queue = useQueueContext(); //song queue that the music player will use, is an array of MediaItems
  const [pause, setPause] = useState(false);
  const [status, setStatus] = useState({});

  const [repeatMusic, setRepeatMusic] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const [duration, setDuration] = useState({
    minutes: 0,
    seconds: 0,
    absoluteSeconds: 0, //raw seconds
  });
  const [currentPosition, setPos] = useState({
    minutes: 0,
    seconds: 0,
    absoluteSeconds: 0, //raw seconds
  });
  const [currentTrack, setCurrentTrack] = useState(getMediaItem(itemID, queue)); //ipapasa sa currentTrack yung songs and index
  const [songIndex, setSongIndex] = useState(0); //kukunin yung index ng kanta sa queue
  const video = React.useRef(null); // useRef
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(Animated.FlatList);
  const [updateTimer, setTimer] = useState(0);

  //214,413

  const updateStatus = (currentStatus) => {
    setStatus(currentStatus);
    if (currentStatus.didJustFinish) {
      if (!repeatMusic) {
        //stop the playback if repeat is off and it just finished playing
        togglePause(setPause, pause);
        video.current.stopAsync();
        if (autoPlay) {
          //if autoplay is enabled and repeat is disabled, proceed to the next video
          skipToNext();
        }
      }
      //console.log(status);
    }
    setPos(convertFromMillisecond(currentStatus.positionMillis));
    //console.log(status.positionMillis);
  };

  //Loop area
  const playRepeatMusic = () => {
    if (repeatMusic == false) {
      setRepeatMusic(true);
    } else {
      setRepeatMusic(false);
    }
    //console.log(repeatMusic);
  };

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };
  //useEffect==================================================================>

  useEffect(() => {
    //snaps the list to center
    scrollX.addListener(({ value }) => {
      //console.log('Scroll X', scrollX);
      //console.log('device', width);
      const index = Math.round(value / width);
      setSongIndex(index);

      // console.log('index', index);
    });
    syncSeekValue(setTimer, video, pause);
    setSongIndex(queue.findIndex(({ id }) => currentTrack.id == id)); //converts the id of the song to its index on the current queue
    return () => {
      clearInterval(updateTimer);
      scrollX.removeAllListeners();
      video.current.stopAsync();
    };
  }, []);
  useEffect(() => {
    //triggers when the user switches songs via scrolling/buttons
    //console.log(songIndex);
    //setCurrentTrack(getMediaItem(songIndex));
    setCurrentTrack(queue[songIndex]); //sets song based on its index
  }, [songIndex]);

  useEffect(() => {
    setPause(true);
    //console.log("current track: ", currentTrack);
  }, [currentTrack]);
  //useEffect=================================================================/>
  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }} //currentTrack = song[]
      >
        <View style={styles.artworkWrapper}>
          <Image
            source={{ uri: queue[index].image }}
            style={styles.artworkImg}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{ width: width }}>
          <Animated.FlatList
            ref={songSlider}
            data={queue}
            initialScrollIndex={songIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: (index) * width,
              index,
            })}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          />
        </View>

        {/* Song Title and Artist */}
        <View>
          <Text style={styles.title}>{currentTrack?.title}</Text>
          <Text style={styles.artist}>
            {getArtistName(currentTrack?.artist)}
          </Text>
        </View>

        <Video
          ref={video}
          source={{ uri: currentTrack?.source }}
          shouldPlay={pause}
          isLooping={repeatMusic}
          onPlaybackStatusUpdate={(status) => updateStatus(status)}
          onLoad={(status) =>
            setDuration(convertFromMillisecond(status.durationMillis))
          }
        />

        {/* Song Progress bar/seek bar */}
        <View>
          <Slider
            style={styles.progressContainer}
            value={currentPosition.absoluteSeconds}
            minimumValue={0}
            maximumValue={duration.absoluteSeconds}
            thumbTintColor="#6B4198"
            minimumTrackTintColor="#6B4198"
            maximumTrackTintColor="#DBB5E5"
            onSlidingComplete={(value) => {
              //console.log(value * 1000, "s currentpos");
              video.current.setPositionAsync(value * 1000);
            }}
          />
        </View>

        {/* Duration */}
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelTxt}>{`${currentPosition.minutes}:${
            currentPosition.seconds < 10 ? "0" : ""
          }${currentPosition.seconds}`}</Text>
          <Text style={styles.progressLabelTxt}>{`${duration.minutes}:${
            duration.seconds < 10 ? "0" : ""
          }${duration.seconds}`}</Text>
        </View>

        {/* Controls */}
        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="#000000"
              style={{
                marginTop: 25,
              }}
            />
          </TouchableOpacity>

          {pause ? (
            <TouchableOpacity onPress={() => togglePause(setPause, pause)}>
              <Ionicons name="ios-pause-circle" size={75} color="#000000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => togglePause(setPause, pause)}>
              <Ionicons name="ios-play-circle" size={75} color="#000000" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#000000"
              style={{
                marginTop: 25,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={playRepeatMusic}
            style={repeatMusic ? styles.toggledOn : styles.toggledOff}
          >
            <Ionicons name="repeat" size={30} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(queue);
              console.log("<===============End of Queue===============>");
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: screenHeight,
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  artworkWrapper: {
    width: 310,
    height: 250,
    marginBottom: 25,
  },

  artworkImg: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
  },

  artist: {
    fontSize: 16,
    fontWeight: "200",
    textAlign: "center",
    color: "#000000",
  },

  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },

  progressLabelContainer: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressLabelTxt: {
    color: "#000000",
  },

  musicControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 15,
  },
  toggledOn: {
    backgroundColor: "#DBB5E5",
    padding: 1,
    borderRadius:16,
    width: 32,
    height: 32,
  },
  toggledOff: {
    backgroundColor: "#FFF0",
  },

  bottomContainer: {
    borderTopColor: "#393E46",
    borderTopWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },

  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
