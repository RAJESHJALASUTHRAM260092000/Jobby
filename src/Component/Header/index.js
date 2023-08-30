import {Component} from 'react'
import Cookie from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  onOut = () => {
    Cookie.remove('jwt_token')

    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="nav">
        <Link className="link" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="logo"
            className="navImg"
          />
        </Link>
        <div className="lastNav">
          <Link className="link" to="/">
            <p className="para">Home</p>
          </Link>
          <Link className="link" to="/jobs">
            <p className="para">Jobs</p>
          </Link>
          <button className="btn" type="button" onClick={this.onOut}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
