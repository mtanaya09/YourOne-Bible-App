import React, { useContext, useState, createContext } from "react";

export const MediaItem = {
  id: Number(),
  title: String(),
  artist: Number(),
  image: String(),
  source: String(),
  duration: Number(),
  caption: String(),
};

export const ArtistItem = {
  id: Number(),
  name: String(),
  image: String(),
  cover: String(),
};

export const CollectionItem = {
  id: Number(),
  artist: Number(),
  title: String(),
  image: String(),
};

const QueueContext = createContext(Array(MediaItem));
const QueueUpdate = createContext(Array(MediaItem));
const FavoritesContext = createContext(Array(MediaItem));
const FavoritesUpdate = createContext(Array(MediaItem));

export const useQueueContext = () => useContext(QueueContext); //This is used for fetching the current queue
export const useQueueUpdate = () => useContext(QueueUpdate); //This is for updating the queue's contents
export const useFavesContext = () => useContext(FavoritesContext);
export const useFavesUpdate = () => useContext(FavoritesUpdate);

const MediaPlayerContext = ({ children }) => {
  const [queue, setQueue] = useState(Array(MediaItem));
  const [favorites, setFaves] = useState(Array(MediaItem));
  return (
    <QueueContext.Provider value={queue}>
      <QueueUpdate.Provider value={setQueue}>
        <FavoritesContext.Provider value={favorites}>
          <FavoritesUpdate.Provider value={setFaves}>
            {children}
          </FavoritesUpdate.Provider>
        </FavoritesContext.Provider>
      </QueueUpdate.Provider>
    </QueueContext.Provider>
  );
};

export default MediaPlayerContext;
