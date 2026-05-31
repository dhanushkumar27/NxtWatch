import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login/index'
import Home from './components/Home/index'
import Trending from './components/Trending/index'
import Gaming from './components/Gaming/index'
import SavedVideos from './components/SavedVideos/index'
import VideoItemDetails from './components/VideoItemDetails/index'
import NotFound from './components/NotFound/index'
import BackgroundThemeContext from './context/BackgroundThemeContext/index'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {backgroundThemeIsDark: false, savedVideosList: []}

  changeBackgroundTheme = () => {
    this.setState(prevState => ({
      backgroundThemeIsDark: !prevState.backgroundThemeIsDark,
    }))
  }

  updateSavedVideosList = video => {
    const {savedVideosList} = this.state
    const isAlreadySaved = savedVideosList.some(
      eachVideo => eachVideo.id === video.id,
    )

    if (isAlreadySaved) {
      const updatedSavedVideosList = savedVideosList.filter(
        eachVideo => eachVideo.id !== video.id,
      )
      this.setState({savedVideosList: updatedSavedVideosList})
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, video],
      }))
    }
  }

  render() {
    const {backgroundThemeIsDark, savedVideosList} = this.state
    return (
      <BackgroundThemeContext.Provider
        value={{
          backgroundThemeIsDark,
          changeBackgroundTheme: this.changeBackgroundTheme,
          savedVideosList,
          updateSavedVideosList: this.updateSavedVideosList,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BackgroundThemeContext.Provider>
    )
  }
}

export default App
