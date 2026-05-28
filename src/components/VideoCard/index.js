import './index.css'

const VideoCard = props => {
  const {eachVideo} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt} = eachVideo
  const {name, profileImageUrl} = channel
  return (
    <li className="videoCard-item">
      <img
        className="videoCard-thumbnailUrl-image"
        src={thumbnailUrl}
        alt="thumbnail"
      />
      <div className="videoCard-videoDetails-card">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <div className="videoCard-videoTitle-card">
          <h1 className="videoCard-title">{title}</h1>
          <div className="videoCard-channelName-container">
            <p>{name}</p>
            <p>{viewCount}</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default VideoCard
