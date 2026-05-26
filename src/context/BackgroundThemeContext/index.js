import React from 'react'

const BackgroundThemeContext = React.createContext({
  backgroundThemeIsDark: false,
  changeBackgroundTheme: () => {},
})

export default BackgroundThemeContext
