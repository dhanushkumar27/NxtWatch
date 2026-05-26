import {Component} from 'react'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

class SavedVideos extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-main-container">
          <SideBar />
          <div className="home-container">
            <h1>SavedVideos</h1>
          </div>
        </div>
      </>
    )
  }
}

export default SavedVideos
