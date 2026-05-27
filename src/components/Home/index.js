import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {currentApiStaus: apiStatus.initial}

  componentDidMount() {
    this.makeHomeVideosApi()
  }

  makeHomeVideosApi = async () => {}

  renderSuccessView = () => <h1>s</h1>

  renderFailureView = () => <h1>f</h1>

  renderLoadingView = () => <h1>l</h1>

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

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-main-container">
          <SideBar />
          <div className="home-container">{this.homeSectionView()}</div>
        </div>
      </>
    )
  }
}

export default Home
