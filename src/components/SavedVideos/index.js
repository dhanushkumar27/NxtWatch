import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideBar from '../SideBar'
import VideoCard from '../VideoCard/index'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'

import './index.css'

const SavedVideos = () => (
  <BackgroundThemeContext.Consumer>
    {value => {
      const {savedVideosList, backgroundThemeIsDark} = value

      const backgroundColor = backgroundThemeIsDark
        ? 'backgroundTheme-dark-style'
        : 'backgroundTheme-light-style'

      return (
        <div className="section-container">
          <Header />
          <div
            className={`savedVideos-main-container ${backgroundColor}`}
            data-testid="savedVideos"
          >
            <SideBar />
            <div className="savedVideos-container">
              {savedVideosList.length === 0 ? (
                <div className="no-saved-videos-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no-saved-videos-image"
                  />
                  <h1>No Saved Videos Found</h1>
                  <p>You can save your videos while watching them.</p>
                </div>
              ) : (
                <div>
                  <div className="navbar-trending-container">
                    <MdPlaylistAdd className="sections-icons" />
                    <h1>Saved Videos</h1>
                  </div>
                  <ul className="saved-videos-unorder-container">
                    {savedVideosList.map(eachVideo => (
                      <VideoCard key={eachVideo.id} eachVideo={eachVideo} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </BackgroundThemeContext.Consumer>
)

export default SavedVideos
