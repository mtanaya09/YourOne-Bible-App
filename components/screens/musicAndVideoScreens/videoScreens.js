import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Video } from "expo-av";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import Slider from "@react-native-community/slider";
import * as ScreenOrientation from "expo-screen-orientation";

import {
  convertFromMillisecond,
  syncSeekValue,
  togglePause,
  getMediaItem,
  useQueueContext,
  getArtistName
} from "./shared";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("screen").width;

const VideoScreens = ({ route }) => {
  const { itemID, med } = route.params;
  const video = useRef(null);
  const queue = useQueueContext();

  const [status, setStatus] = useState({});
  const [duration, setDuration] = useState({
    minutes: 0,
    seconds: 0,
    absoluteSeconds: 0,
  });
  const [currentPos, setPos] = useState({
    //current position in time
    minutes: 0,
    seconds: 0,
    absoluteSeconds: 0,
  });
  const [updateTimer, setUpdateTimer] = useState(0);
  let updateFrequency = 500;
  const [pause, setPause] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(
    route.params == undefined ? 0 : queue.findIndex(({ id }) => itemID == id)
  ); //set the selected video to 0, if null else go to the selected video

  const [currentVideo, setCurrentVideo] = useState(getMediaItem(itemID, queue));

  const [repeatVideo, setRepeatVideo] = useState(true);
  //console.log(currentVideo);

  const [switchValue, setswitchValue] = useState(false);
  // const toggleSwitch = (value) => {setswitchValue(value);}
  const toggleSwitch = async (value) => {
    setswitchValue(value);
  };

  const onFullScreenPressed = () => {
    const fullscreen = video.current.presentFullscreenPlayer();
    fullscreen
      .then(console.log("fullscreened"))
      .catch((error) => console.log(error.message));
  };
  const setOrientation = ({ fullscreenUpdate }) => {
    //console.log(fullscreenUpdate);
    if (fullscreenUpdate == 0) {
      //rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else if (fullscreenUpdate == 2) {
      //rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const statusUpdate = (currentStatus) => {
    //called when the playbackStatus is called, refreshes atleast twice every second
    setStatus(currentStatus);
    //console.log("updating");
    if (currentStatus.didJustFinish) {
      if (!repeatVideo) {
        //stop the playback if repeat is off and it just finished playing
        togglePause(setPause, pause);
        video.current.stopAsync();
        if (switchValue) {
          //if autoplay is enabled and repeat is disabled, proceed to the next video
          playNextVideo();
        }
      }
      //console.log(status);
    }
    //console.log(currentStatus);
    setPos(convertFromMillisecond(currentStatus.positionMillis)); //update the progress of the seekbar
  };
  //useEffect==========================================================================================================>
  useEffect(() => {
    //updates the playbackStatus twice every second
    syncSeekValue(setUpdateTimer, video, pause, updateFrequency);
    //setSelectedVideo(queue.findIndex(({ id }) => currentVideo.id == id))
    return () => {
      clearInterval(updateTimer);
    };
  }, []);

  useEffect(() => {
    //Automatically play the video upon opening
    setPause(!pause);
  }, [currentVideo]);

  useEffect(() => {
    setCurrentVideo(queue[selectedVideo]);
  }, [selectedVideo]);
  //useEffect=========================================================================================================/>

  const playRepeatVideo = () => {
    if (repeatVideo == false) setRepeatVideo(true);
    else {
      setRepeatVideo(false);
    }
    //console.log(repeatVideo);
  };

  const playNextVideo = () => {
    if (selectedVideo == queue.length - 1) return;
    else {
      setSelectedVideo(selectedVideo + 1);
    }
  };

  const playPrevVideo = () => {
    if (selectedVideo == 0) return;
    else {
      setSelectedVideo(selectedVideo - 1);
    }
  };

  return (
    <View style={styles.containter}>
      
      <Video
        ref={video}
        resizeMode="contain"
        isLooping={repeatVideo}
        source={{
          uri: currentVideo?.source,
        }}
        shouldPlay={pause}
        onFullscreenUpdate={setOrientation}
        style={styles.video}
        useNativeControls={false}
        onPlaybackStatusUpdate={statusUpdate}
        onLoad={(status) =>
          setDuration(convertFromMillisecond(status.durationMillis))
        }
      />
      
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{currentVideo?.title}</Text>
        </View>
      <Text style={styles.textCaption}> {getArtistName(currentVideo?.artist)}</Text>
    
      <Text style={styles.textCaption}>{currentVideo?.caption}</Text>
    
      <View style={styles.sliderFullScrn}>
      <View style={styles.progressLabelContainer}>
        <Slider
          style={styles.progressContainer}
          value={currentPos.absoluteSeconds}
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
      <View style={styles.fullScreenContainer}>
        {setOrientation ? (
          <TouchableOpacity onPress={onFullScreenPressed}>
            <MaterialCommunityIcons
              name="fullscreen"
              size={30}
              color='#000000'
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onFullScreenPressed}>
            <MaterialCommunityIcons name="fullscreen-exit" size={30} />
          </TouchableOpacity>
        )}
      </View>
      </View>
      <View style={styles.progressLabelContainer}>
        <Text style={styles.progressLabelTxt}>{`${currentPos.minutes}:${
          currentPos.seconds < 10 ? "0" : ""
        }${currentPos.seconds}`}</Text>
        <Text style={styles.progressLabelTxt}>{`${duration.minutes}:${
          duration.seconds < 10 ? "0" : ""
        }${duration.seconds}`}</Text>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={playPrevVideo}>
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
            <Ionicons name="pause-circle" size={75} color="#000000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => togglePause(setPause, pause)}>
            <Ionicons name="play-circle" size={75} color="#000000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={playNextVideo}>
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

      <View style={styles.controlContainer}>
        
          <Switch
            trackColor={{ false: "#DBB5E5", true: "#6B4198" }}
            thumbColor={switchValue ? "#6B4198" : "#6B4198"}
            //style={{marginTop: 10}}
            onValueChange={toggleSwitch}
            value={switchValue}
          />

          <TouchableOpacity
            onPress={playRepeatVideo}
            style={repeatVideo ? styles.toggledOn : styles.toggledOff}>
            <Ionicons name="repeat" size={30} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    
  );
};
export default VideoScreens;

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
   
  },
  video: {
    width: screenWidth,
    height: 220,
  flex: 1,
  
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 30,
  },
  textTitle: {
    fontSize: 20,
    marginTop: 15,
    color: "#000000",
    fontWeight: "800",
    
  },
  textCaption: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "800",
    marginTop: 20,
    paddingBottom: 15,
    bottom: 12,
  },
  progressContainer: {
    color: "white",
    width:350,
    
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 25,
    color: "white",
  },

  progressLabelTxt: {
    color: "#000000",
  },
  toggledOn: {
    backgroundColor: "#DBB5E5",
    borderRadius:20,
    width: 32,
    height: 32,
    
  },
  toggledOff: {
    backgroundColor: "#FFF0",
  },
 sliderFullScrn:{
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  width: screenWidth,
 },
 fullScreenContainer: {
  bottom: 30,
  left: -5
 },
  controlContainer: {
    borderTopColor: "#393E46",
    borderTopWidth: 1,
    width: screenWidth,
    alignItems: "center",
    paddingVertical: 15,
    flexDirection: 'row',
   justifyContent: "space-between",
   paddingHorizontal: 10,
   
  },
});
