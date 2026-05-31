import {Component} from 'react'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideBar from '../SideBar'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    currentApiStaus: apiStatus.initial,
  }

  componentDidMount() {
    this.makeTrendingVideosApi()
  }

  makeTrendingVideosApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({currentApiStaus: apiStatus.in_progress})
    const url = `https://apis.ccbp.in/videos/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        videoDetails: {
          id: data.video_details.id,
          title: data.video_details.title,
          videoUrl: data.video_details.video_url,
          thumbnailUrl: data.video_details.thumbnail_url,
          channel: {
            name: data.video_details.channel.name,
            profileImageUrl: data.video_details.channel.profile_image_url,
            subscriberCount: data.video_details.channel.subscriber_count,
          },
          viewCount: data.video_details.view_count,
          publishedAt: data.video_details.published_at,
          description: data.video_details.description,
        },
      }
      this.setState({
        videoDetailsObject: updatedData,
        currentApiStaus: apiStatus.success,
      })
    } else {
      this.setState({
        currentApiStaus: apiStatus.failure,
      })
    }
  }

  renderSuccessView = () => (
    <BackgroundThemeContext.Consumer>
      {value => {
        const {updateSavedVideosList} = value
        const {videoDetailsObject} = this.state
        const {videoDetails} = videoDetailsObject
        const {
          title,
          videoUrl,
          thumbnailUrl,
          channel,
          viewCount,
          publishedAt,
          description,
        } = videoDetails
        const {name, profileImageUrl, subscriberCount} = channel
        return (
          <div className="vidoeItemDetails-success-container">
            <ReactPlayer
              width="100%"
              className="react-player-component"
              url={videoUrl}
            />
            <div className="videoItemDetails-details-container">
              <h1 className="videoItemDetails-heading">{title}</h1>
              <div className="videoItemDetails-reaction-container">
                <div className="reactions-on-video-container">
                  <p>{viewCount}</p>
                  <p>{publishedAt}</p>
                </div>

                <div className="reaction-buttons-container">
                  <AiOutlineLike className="reaction-icon" />
                  <p className="reaction-text">Like</p>
                  <AiOutlineDislike className="reaction-icon" />
                  <p className="reaction-text">Dislike</p>
                  <MdPlaylistAdd className="reaction-icon" />
                  <button
                    onClick={() => updateSavedVideosList(videoDetails)}
                    type="button"
                    className="reaction-text"
                  >
                    Save
                  </button>
                </div>

                <div className="channel-details-container">
                  <img
                    className="profile-image"
                    src={profileImageUrl}
                    alt="profile logo"
                  />
                  <div>
                    <h1 className="channel-name">{name}</h1>
                    <p>{subscriberCount} subscribers</p>
                  </div>
                </div>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </BackgroundThemeContext.Consumer>
  )

  renderFailureView = () => (
    <BackgroundThemeContext.Consumer>
      {value => {
        const {backgroundThemeIsDark} = value
        return (
          <div className="failure-container">
            {backgroundThemeIsDark ? (
              <img
                className="failure-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                alt="failure"
              />
            ) : (
              <img
                className="failure-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure"
              />
            )}
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-para">
              We are having some trouble completing your request. Please try
              again.
            </p>
            <button
              className="failure-button"
              type="button"
              onClick={() => this.makeHomeVideosApi()}
            >
              Retry
            </button>
          </div>
        )
      }}
    </BackgroundThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  videoDetailsSectionView = () => {
    const {currentApiStaus} = this.state

    switch (currentApiStaus) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div
          className="vidoeItemDetails-main-container"
          data-testid="videoItemDetails"
        >
          <SideBar />
          <BackgroundThemeContext.Consumer>
            {value => {
              const {backgroundThemeIsDark} = value
              const backgroundColor = backgroundThemeIsDark
                ? 'backgroundTheme-dark-style'
                : 'backgroundTheme-light-style'

              return (
                <div
                  className={`vidoeItemDetails-result-container ${backgroundColor}`}
                >
                  {this.videoDetailsSectionView()}
                </div>
              )
            }}
          </BackgroundThemeContext.Consumer>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
