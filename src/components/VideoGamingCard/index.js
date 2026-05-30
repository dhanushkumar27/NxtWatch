import {Link} from 'react-router-dom'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'

import './index.css'

const VideoGamingCard = props => (
  <BackgroundThemeContext.Consumer>
    {value => {
      const {backgroundThemeIsDark} = value
      const {eachVideo} = props
      const {id, title, thumbnailUrl, viewCount} = eachVideo

      const linkStyle = backgroundThemeIsDark
        ? 'linkText-dark'
        : 'linkText-light'
      return (
        <Link
          className={`videoGamingCard-link ${linkStyle}`}
          to={`/videos/${id}`}
        >
          <li className="videoCard-item">
            <img
              className="videoCard-thumbnailUrl-image"
              src={thumbnailUrl}
              alt="thumbnail"
            />
            <div className="videoGamingCard-videoDetails-card ">
              <h1 className="videoGamingCard-title">{title}</h1>
              <p>{viewCount} Watching Worldwide</p>
            </div>
          </li>
        </Link>
      )
    }}
  </BackgroundThemeContext.Consumer>
)

export default VideoGamingCard
