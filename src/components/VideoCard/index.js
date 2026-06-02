import {Link} from 'react-router-dom'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'

import './index.css'

const VideoCard = props => (
  <BackgroundThemeContext.Consumer>
    {value => {
      const {backgroundThemeIsDark} = value
      const {eachVideo} = props
      const {
        id,
        title,
        thumbnailUrl,
        channel,
        viewCount,
        publishedAt,
      } = eachVideo
      const {name, profileImageUrl} = channel
      const linkStyle = backgroundThemeIsDark
        ? 'linkText-dark'
        : 'linkText-light'
      return (
        <Link className={`videoCard-link ${linkStyle}`} to={`/videos/${id}`}>
          <li className="videoCard-item">
            <img
              className="videoCard-thumbnailUrl-image"
              src={thumbnailUrl}
              alt="video thumbnail"
            />
            <div className="videoCard-videoDetails-card">
              <img
                className="profile-image"
                src={profileImageUrl}
                alt="channel logo"
              />
              <div className="videoCard-videoTitle-card">
                <p className="videoCard-title">{title}</p>
                <div className="videoCard-channelName-container">
                  <p>{name}</p>
                  <p>{viewCount}</p>
                  <p>{publishedAt}</p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </BackgroundThemeContext.Consumer>
)

export default VideoCard
