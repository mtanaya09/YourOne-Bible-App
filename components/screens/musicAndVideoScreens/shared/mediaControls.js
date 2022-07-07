export const togglePause = (setterFunc, pauseVar) => {
  //setterFunc is the setter function for the pauseVar
  //e.g. setPause
  //pauseVar is the pause variable itself
  //e.g. pause
  try {
    setterFunc(!pauseVar);
  } catch (error) {
    console.warn(error.message);
  }
};
