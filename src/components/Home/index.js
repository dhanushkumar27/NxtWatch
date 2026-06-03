import {Component} from 'react'

import {AiOutlineClose} from 'react-icons/ai'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SideBar from '../SideBar'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'
import VideoCard from '../VideoCard'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    currentApiStaus: apiStatus.initial,
    searchInput: '',
    jobDetailsList: [],
    showNxtWatchCard: true,
  }

  componentDidMount() {
    this.makeHomeVideosApi()
  }

  onClickCloseNxtWatchCard = () => this.setState({showNxtWatchCard: false})

  makeHomeVideosApi = async () => {
    this.setState({currentApiStaus: apiStatus.in_progress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      const updatedData = videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        jobDetailsList: updatedData,
        currentApiStaus: apiStatus.success,
      })
    } else {
      this.setState({
        currentApiStaus: apiStatus.failure,
      })
    }
  }

  onChangeSearchVideo = event =>
    this.setState({searchInput: event.target.value}, this.makeHomeVideosApi)

  renderSuccessView = () => {
    const {jobDetailsList} = this.state

    const successContent =
      jobDetailsList.length === 0 ? (
        <div className="no-videos-container">
          <img
            className="no-videos-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h1>No Search Results Found</h1>
          <p>Try different key words or remove search filter</p>
          <button
            className="failure-button"
            type="button"
            onClick={() => this.makeHomeVideosApi()}
          >
            Retry
          </button>
        </div>
      ) : (
        <ul className="videoCard-unorder-list">
          {jobDetailsList.map(eachVideo => (
            <VideoCard key={eachVideo.id} eachVideo={eachVideo} />
          ))}
        </ul>
      )
    return successContent
  }

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
                alt="failure view"
              />
            ) : (
              <img
                className="failure-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure view"
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

  homeSectionView = () => {
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

  nxtWatchHomeCard = () => {
    const {showNxtWatchCard} = this.state

    return (
      <>
        {showNxtWatchCard && (
          <div className="home-nxtWatchCard-container" data-testid="banner">
            <AiOutlineClose
              data-testid="close"
              className="nxtWatch-close-icon"
              onClick={() => this.onClickCloseNxtWatchCard()}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="website-logo-card-image"
              alt="nxt watch logo"
            />
            <p className="home-watch-card-para">Buy Nxt Watch Premium</p>
            <button type="button" className="get-it-now-button">
              GET IT NOW
            </button>
          </div>
        )}
      </>
    )
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="section-container">
        <Header />
        <div className="home-main-container" data-testid="home">
          <SideBar />
          <BackgroundThemeContext.Consumer>
            {value => {
              const {backgroundThemeIsDark} = value
              const backgroundColor = backgroundThemeIsDark
                ? 'backgroundTheme-dark-style'
                : 'backgroundTheme-light-style'

              return (
                <div className={`home-responsive-container ${backgroundColor}`}>
                  {this.nxtWatchHomeCard()}
                  <div className="home-container">
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={this.onChangeSearchVideo}
                      value={searchInput}
                      className="home-searchInput"
                    />
                    <div className="home-result-container">
                      {this.homeSectionView()}
                    </div>
                  </div>
                </div>
              )
            }}
          </BackgroundThemeContext.Consumer>
        </div>
      </div>
    )
  }
}

export default Home
