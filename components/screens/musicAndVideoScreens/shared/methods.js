import artists from "./artists.json";
import songs from "../musicComponents/MusicArtistListSample.json";
import collections from "./sampleCollection.json";
export const convertFromMillisecond = (numToConvert) => ({
  //convert ms to an object
  seconds: Math.floor((numToConvert / 1000) % 60), //returns seconds 34
  minutes: Math.floor(numToConvert / 1000 / 60),
  absoluteSeconds: Math.floor(numToConvert / 1000),
});

export const convertToMillisecond = (
  objToConvert //convert the converted object back to approx ms
) => objToConvert.absoluteSeconds * 1000;

export const syncSeekValue = (
  //add this function to a useeffect function to update consistently
  timerSetterFunc, //set the timer id var to its setter timerSetterFunc, then update it every freq(ms)
  videoRef, //the ref to the video object
  isPaused, //pass the pause variable
  freq = 500
) => {
  timerSetterFunc(
    setInterval(() => {
      if (videoRef.current == null) return;
      if (isPaused) return;
      videoRef.current.getStatusAsync();
    }, freq)
  );
};

export const getMediaItem = (mediaID = Number(), mediaSource = songs) =>
  mediaSource.filter((media) => (media.id == mediaID ? media : null))[0];

export const getArtistImage = (artistID = Number(), artistList = artists) => ({
  uri: artistList[artistID]?.image,
});
export const getArtistCover = (artistID = Number(), artistList = artists) => ({
  uri: artistList[artistID]?.cover,
});

export const getArtistName = (artistID = Number(), artistList = artists) =>
  artistList[artistID]?.name;

export const getArtistType = (artistID = Number(), artistList = artists) =>
  artistList[artistID]?.type;

export const getCollectionTitle = (
  collectionID = Number(),
  collectionList = collections
) => collectionList[collectionID]?.title;
export const getCollectionImage = (
  collectionID = Number(),
  collectionList = collections
) => ({
  uri: collectionList[collectionID]?.image,
});

export const sortMediaList = (
  listToSort = [{ title: "" }] //Sort the mediaList alphabetically by title
) =>
  listToSort.sort((a, b) => {
    let x = a.title.toLowerCase();
    let y = b.title.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
