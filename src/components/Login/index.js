import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorText: '',
    error: false,
    showPassword: false,
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props

      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})

      history.replace('/')
    } else {
      this.setState({error: true, errorText: data.error_msg})
    }
  }

  onClickshowPassword = () =>
    this.setState(prevState => ({showPassword: !prevState.showPassword}))

  render() {
    const {error, errorText, showPassword} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    const showPasswordFormate = showPassword ? 'text' : 'password'

    return (
      <div className="login-main-container">
        <form className="login-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-website-logo-image"
          />
          <label htmlFor="username" className="login-label-element">
            USERNAME
          </label>
          <input
            className="login-input-element"
            id="username"
            type="text"
            placeholder="Username"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="login-label-element">
            PASSWORD
          </label>
          <input
            className="login-input-element"
            id="password"
            type={showPasswordFormate}
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <div className="show-password-container">
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox-input-element"
              onClick={this.onClickshowPassword}
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          <div className="login-button-card">
            <button className="login-button" type="submit">
              Login
            </button>
            {error && <p>{errorText}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
