import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {AiOutlineSearch, AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import JobsFliters from '../JobsFliters'

import './index.css'

const profileStatus = {
  onSuccess: 'onSUCCESS',
  onFailure: 'onFAILURE',
  onProgress: 'onPROGRESS',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    profile: [],
    profileapi: '',
    check: [],
    letter: '',
    radio: salaryRangesList[0].salaryRangeId,
    isTrue: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {letter, radio, check, isTrue} = this.state
    console.log(check)

    const url = `https://apis.ccbp.in/jobs?employment_type=${check.reverse()}&minimum_package=${radio}&search=${letter}`

    const Token = Cookie.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const update = data.jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        jobDescription: i.job_description,
        location: i.location,
        packagePerAnnum: i.package_per_annum,
        rating: i.rating,
        title: i.title,
        id: i.id,
      }))

      this.setState({profile: update, profileapi: profileStatus.onSuccess})
      console.log(update)
    } else {
      this.setState({profileapi: profileStatus.onFailure})
    }
  }

  onSearch = event => {
    this.setState({letter: event.target.value})
  }

  onClick = () => {
    this.setState(this.getJobs)
  }

  onRadio = id => {
    this.setState({radio: id}, this.getJobs)
  }

  onCheck = id => {
    const {check} = this.state

    if (check.includes(id)) {
      this.setState(
        prev => ({
          check: check.filter(i => i !== id),
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prev => ({
          check: [...prev.check, id],
        }),
        this.getJobs,
      )
    }
  }

  jobs = () => {
    const {profile} = this.state
    return (
      <ul className="container">
        {profile.map(i => (
          <li key={i.id} className="liMap">
            <div className="firstPart">
              <img
                src={i.companyLogoUrl}
                alt={i.employmentType}
                className="jobImg"
              />

              <p className="para">{i.employmentType}</p>
            </div>
            <div className="location">
              <p className="para">Location : {i.location}</p>
              <p className="para">Type : {i.employmentType}</p>
              <p className="para">{i.packagePerAnnum}</p>
            </div>
            <hr />
            <div className="des">
              <h1 className="header">Description</h1>
              <p className="para">{i.jobDescription}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  onFailure = () => (
    <div className="profileContainer1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure"
        className="r"
      />
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
        return this.jobs()
      case profileStatus.onFailure:
        return this.onFailure()
      case profileStatus.onProgress:
        return this.onProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobConatiner">
          <div>
            <JobsFliters place={this.onRadio} place2={this.onCheck} />
          </div>
          <div className="jobItems">
            <div className="inp">
              <input
                type="search"
                onChange={this.onSearch}
                className="input"
                placeholder="Search"
              />
              <AiOutlineSearch className="icon" onClick={this.onClick} />
            </div>
            {this.onSwitch()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
