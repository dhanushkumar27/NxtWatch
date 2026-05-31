import React from 'react'

const BackgroundThemeContext = React.createContext({
  backgroundThemeIsDark: false,
  changeBackgroundTheme: () => {},
  savedVideosList: [],
  updateSavedVideosList: () => {},
})

export default BackgroundThemeContext
