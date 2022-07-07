import MediaList from "./mediaList";
import ArtistList from "./artistList";
import CollectionList from "./collectionList";
import { togglePause } from "./mediaControls";
import artists from "./artists.json";
import collections from "./sampleCollection.json";
import songs from "../musicComponents/MusicArtistListSample.json";
import {
  convertFromMillisecond,
  convertToMillisecond,
  syncSeekValue,
  getMediaItem,
  getArtistImage,
  getArtistCover,
  getArtistName,
  getArtistType,
  getCollectionTitle,
  getCollectionImage,
  sortMediaList,
} from "./methods";
import MediaPlayerContext, {
  useQueueContext,
  useQueueUpdate,
  useFavesContext,
  useFavesUpdate,
  MediaItem,
  CollectionItem,
  ArtistItem,
} from "./MediaPlayerContext";

export {
  MediaList,
  togglePause,
  ArtistList,
  artists,
  CollectionList,
  collections,
  songs,
  convertFromMillisecond,
  convertToMillisecond,
  syncSeekValue,
  getMediaItem,
  getArtistImage,
  getArtistCover,
  getArtistName,
  getArtistType,
  getCollectionTitle,
  getCollectionImage,
  sortMediaList,
  MediaPlayerContext,
  useQueueContext,
  useQueueUpdate,
  useFavesContext,
  useFavesUpdate,
  MediaItem,
  CollectionItem,
  ArtistItem,
};
