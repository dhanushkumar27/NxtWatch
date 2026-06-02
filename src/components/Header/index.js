import {Component} from 'react'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut, FiMenu} from 'react-icons/fi'
import {FaMoon, FaSun} from 'react-icons/fa'

import BackgroundThemeContext from '../../context/BackgroundThemeContext/index'

import './index.css'

class Header extends Component {
  state = {isMenuOpen: false}

  onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isMenuOpen} = this.state

    const onToggleMenue = () => {
      this.setState(prevState => ({
        isMenuOpen: !prevState.isMenuOpen,
      }))
    }

    return (
      <BackgroundThemeContext.Consumer>
        {value => {
          const {backgroundThemeIsDark, changeBackgroundTheme} = value

          const backgroundTheme = backgroundThemeIsDark
            ? 'backgroundTheme-dark-style'
            : 'backgroundTheme-light-style'

          const backgroundThemeLogout = backgroundThemeIsDark
            ? 'backgroundTheme-logout-dark-style'
            : 'backgroundTheme-logout-light-style'

          return (
            <div className={`header-main-container ${backgroundTheme}`}>
              {backgroundThemeIsDark ? (
                <Link className="header-logo-link" to="/">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="header-website-logo-image"
                  />
                </Link>
              ) : (
                <Link className="header-logo-link" to="/">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="header-website-logo-image"
                  />
                </Link>
              )}
              <div className="header-icons-container">
                {backgroundThemeIsDark ? (
                  <button
                    type="button"
                    className={`header-icon-button ${backgroundTheme}`}
                    onClick={() => changeBackgroundTheme()}
                  >
                    <FaSun className="header-icon" data-testid="theme" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`header-icon-button ${backgroundTheme}`}
                    onClick={() => changeBackgroundTheme()}
                  >
                    <FaMoon className="header-icon" data-testid="theme" />
                  </button>
                )}

                <nav className="navBar-mobile">
                  <button
                    type="button"
                    className={`menu-btn ${backgroundTheme}`}
                    onClick={onToggleMenue}
                  >
                    <FiMenu className="hamburgar-icon" />
                  </button>
                  {isMenuOpen && (
                    <ul className="menu-list">
                      <Link to="/" className="nav-link-item">
                        <li className="menu-item">Home</li>
                      </Link>
                      <Link to="/trending" className="nav-link-item">
                        <li className="menu-item">Trending</li>
                      </Link>
                      <Link to="/gaming" className="nav-link-item">
                        <li className="menu-item">Gaming</li>
                      </Link>
                      <Link to="/saved-videos" className="nav-link-item">
                        <li className="menu-item">Saved videos</li>
                      </Link>
                    </ul>
                  )}
                </nav>

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="header-profile-desktop"
                />
              </div>

              <div className="popup-container">
                <Popup
                  modal
                  className="popup-element"
                  trigger={
                    <div>
                      <button
                        type="button"
                        className={`logout-button-desktop ${backgroundThemeLogout}`}
                      >
                        Logout
                      </button>
                      <button
                        type="button"
                        className={`header-icon-button logout-mobile ${backgroundTheme}`}
                      >
                        <FiLogOut className="header-icon" />
                      </button>
                    </div>
                  }
                >
                  {close => (
                    <div className={`popup-card ${backgroundTheme}`}>
                      <p>Are you sure, you want to logout</p>
                      <div>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={this.onClickLogoutButton}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )
        }}
      </BackgroundThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
