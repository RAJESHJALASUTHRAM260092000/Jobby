import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import ReactContext from '../ReactContext'

import './index.css'

const profileStatus = {
  onSuccess: 'onSUCCESS',
  onFailure: 'onFAILURE',
  onProgress: 'onPROGRESS',
}

class JobsFliters extends Component {
  state = {profile: {}, profileapi: ''}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileapi: profileStatus.onProgress})
    const url = 'https://apis.ccbp.in/profile'

    const Token = Cookie.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const raja = data.profile_details

    if (response.ok) {
      const update = {
        name: raja.name,
        profileImageUrl: raja.profile_image_url,
        shortBio: raja.short_bio,
      }

      this.setState({profile: update, profileapi: profileStatus.onSuccess})
      console.log(update)
    } else {
      this.setState({profileapi: profileStatus.onFailure})
    }
  }

  onSuccess = () => {
    const {profile} = this.state
    return (
      <>
        <div className="profileContainer">
          <img src={profile.profileImageUrl} alt="profile" className="img" />
          <h1 className="name">{profile.name}</h1>
          <p className="para">{profile.shortBio}</p>
        </div>
      </>
    )
  }

  onFailure = () => (
    <div className="profileContainer1">
      <button type="button" className="btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  onProgress = () => (
    <div className="profileContainer1">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.setState(this.getProfile)
  }

  onSwitch = () => {
    const {profileapi} = this.state
    switch (profileapi) {
      case profileStatus.onSuccess:
        return this.onSuccess()
      case profileStatus.onFailure:
        return this.onFailure()
      case profileStatus.onProgress:
        return this.onProgress()
      default:
        return null
    }
  }

  onType = () => {
    const {place2} = this.props
    return (
      <ReactContext.Consumer>
        {value => {
          const {list1} = value
          const onCheck = id => {
            place2(id)
          }

          return (
            <div className="list1Container">
              <p className="para">Type Of Employment</p>
              <ul>
                {list1.map(i => (
                  <li key={i.employmentTypeId}>
                    <div className="check">
                      <input
                        type="checkbox"
                        className="che"
                        id={i.label}
                        onClick={() => onCheck(i.employmentTypeId)}
                      />
                      <label htmlFor={i.label}>{i.label}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  onRange = () => {
    const {place} = this.props

    return (
      <ReactContext.Consumer>
        {value => {
          const {list2} = value

          const Radio = id => {
            place(id)
          }

          return (
            <div className="list1Container">
              <p className="para">Salary Range</p>
              <ul>
                {list2.map(i => (
                  <li key={i.salaryRangeId}>
                    <div className="check">
                      <input
                        type="radio"
                        className="che"
                        name="name"
                        id={i.label}
                        onClick={() => Radio(i.salaryRangeId)}
                      />
                      <label htmlFor={i.label}>{i.label}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  render() {
    return (
      <>
        {this.onSwitch()}
        {this.onType()}
        {this.onRange()}
      </>
    )
  }
}

export default JobsFliters
