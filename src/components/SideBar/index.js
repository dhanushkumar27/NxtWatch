import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {IoGameController} from 'react-icons/io5'
import {MdPlaylistAdd} from 'react-icons/md'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'

import './index.css'

const SideBar = props => {
  const {location} = props
  const {pathname} = location

  return (
    <BackgroundThemeContext.Consumer>
      {value => {
        const {backgroundThemeIsDark} = value
        const homeStyel =
          pathname === '/'
            ? {
                selectedIconStyle: 'selectedSetionStyleSideBar',
                selectedListStyle: backgroundThemeIsDark
                  ? 'selectedListStyleSideBarDark'
                  : 'selectedListStyleSideBarLight',
              }
            : {
                selectedIconStyle: null,
                selectedListStyle: null,
              }
        const trendingStyle =
          pathname === '/trending'
            ? {
                selectedIconStyle: 'selectedSetionStyleSideBar',
                selectedListStyle: backgroundThemeIsDark
                  ? 'selectedListStyleSideBarDark'
                  : 'selectedListStyleSideBarLight',
              }
            : {
                selectedIconStyle: null,
                selectedListStyle: null,
              }
        const gamingStyel =
          pathname === '/gaming'
            ? {
                selectedIconStyle: 'selectedSetionStyleSideBar',
                selectedListStyle: backgroundThemeIsDark
                  ? 'selectedListStyleSideBarDark'
                  : 'selectedListStyleSideBarLight',
              }
            : {
                selectedIconStyle: null,
                selectedListStyle: null,
              }
        const savedVideosStyel =
          pathname === '/saved-videos'
            ? {
                selectedIconStyle: 'selectedSetionStyleSideBar',
                selectedListStyle: backgroundThemeIsDark
                  ? 'selectedListStyleSideBarDark'
                  : 'selectedListStyleSideBarLight',
              }
            : {
                selectedIconStyle: null,
                selectedListStyle: null,
              }

        const backgroundTheme = backgroundThemeIsDark
          ? 'backgroundTheme-dark-style'
          : 'backgroundTheme-light-style'

        const backgroundThemeLink = backgroundThemeIsDark
          ? 'backgroundTheme-link-dark-style'
          : 'backgroundTheme-link-light-style'

        return (
          <div className={`sideBar-container ${backgroundTheme}`}>
            <ul className="unorder-sideBar-container">
              <Link className={`sideBar-link ${backgroundThemeLink}`} to="/">
                <li
                  className={`sideBar-list-item ${homeStyel.selectedListStyle}`}
                >
                  <AiFillHome
                    className={`sideBar-icons ${homeStyel.selectedIconStyle}`}
                  />
                  <p>Home</p>
                </li>
              </Link>
              <Link
                className={`sideBar-link ${backgroundThemeLink}`}
                to="/trending"
              >
                <li
                  className={`sideBar-list-item ${trendingStyle.selectedListStyle}`}
                >
                  <FaFire
                    className={`sideBar-icons ${trendingStyle.selectedIconStyle}`}
                  />
                  <p>Trending</p>
                </li>
              </Link>
              <Link
                className={`sideBar-link ${backgroundThemeLink}`}
                to="/gaming"
              >
                <li
                  className={`sideBar-list-item ${gamingStyel.selectedListStyle}`}
                >
                  <IoGameController
                    className={`sideBar-icons ${gamingStyel.selectedIconStyle}`}
                  />
                  <p>Gaming</p>
                </li>
              </Link>
              <Link
                className={`sideBar-link ${backgroundThemeLink}`}
                to="/saved-videos"
              >
                <li
                  className={`sideBar-list-item ${savedVideosStyel.selectedListStyle}`}
                >
                  <MdPlaylistAdd
                    className={`sideBar-icons ${savedVideosStyel.selectedIconStyle}`}
                  />
                  <p>Saved Videos</p>
                </li>
              </Link>
            </ul>
            <div className="sidebar-contact-container">
              <h1 className="contact-us-heading">CONTACT US</h1>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="sidebar-contact-image"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="sidebar-contact-image"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="twitter logo"
                  className="sidebar-contact-image"
                />
              </div>
              <p className="contact-us-para">
                Enjoy! Now you can see your recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </BackgroundThemeContext.Consumer>
  )
}

export default withRouter(SideBar)
