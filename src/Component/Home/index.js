import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="HomeContainer">
          <h1 className="head">Find The Job That Fits Your Life</h1>
          <p className="homepage">
            Million of the people search for the jobs .Your select the your
            suitable jobs
          </p>
          <Link className="link" to="/jobs">
            <button type="button" className="btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
