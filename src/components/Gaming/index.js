import {Component} from 'react'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

class Gaming extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-main-container">
          <SideBar />
          <div className="home-container">
            <h1>Gaming</h1>
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
