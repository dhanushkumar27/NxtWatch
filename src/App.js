import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import Home from './components/Home/index'
import Trending from './components/Trending/index'
import Gaming from './components/Gaming/index'
import SavedVideos from './components/SavedVideos/index'
import VideoItemDetails from './components/VideoItemDetails/index'
import NotFound from './components/NotFound/index'
import BackgroundThemeContext from './context/BackgroundThemeContext/index'

import './App.css'

// Replace your code here
class App extends Component {
  state = {backgroundThemeIsDark: false}

  changeBackgroundTheme = () => {
    this.setState(prevState => ({
      backgroundThemeIsDark: !prevState.backgroundThemeIsDark,
    }))
  }

  render() {
    const {backgroundThemeIsDark} = this.state
    return (
      <Switch>
        <BackgroundThemeContext.Provider
          value={{
            backgroundThemeIsDark,
            changeBackgroundTheme: this.changeBackgroundTheme,
          }}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route path="/not-found" component={NotFound} />
        </BackgroundThemeContext.Provider>
      </Switch>
    )
  }
}

export default App
