import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isTrue: false, error: ''}

  onUser = event => {
    this.setState({username: event.target.value})
  }

  onPass = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = Token => {
    Cookie.set('jwt_token', Token, {expires: 365})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = error => {
    this.setState({error, isTrue: true})
  }

  onSub = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {error, isTrue} = this.state

    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginContainer">
        <div className="loginCard">
          <form className="form" onSubmit={this.onSub}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="login"
              className="loginImg"
            />
            <br />
            <div className="in">
              <label htmlFor="user">USERNAME</label>
              <br />
              <input
                onChange={this.onUser}
                className="input"
                id="user"
                type="text"
                placeholder="Enter your Name"
              />
            </div>
            <br />
            <div className="in">
              <label htmlFor="usr">PASSWORD</label>
              <br />
              <input
                onChange={this.onPass}
                className="input"
                id="usr"
                type="password"
                placeholder="Enter your Password"
              />
            </div>
            <br />
            <button className="input1" type="submit">
              LOGIN
            </button>
            {isTrue && <p>{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
