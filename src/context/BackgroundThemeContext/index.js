import React from 'react'

const BackgroundThemeContext = React.createContext({
  backgroundThemeIsDark: false,
  changeBackgroundTheme: () => {},
  savedVideosList: [],
  updateSavedVideosList: () => {},
  likedVideosList: [],
  updateLikeVidosList: () => {},
  dislikedVideosList: [],
  updateDislikeVidosList: () => {},
})

export default BackgroundThemeContext
