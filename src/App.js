import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Component/Login'
import Home from './Component/Home'
import Jobs from './Component/Jobs'
import ProtectedRoute from './Component/ProtectedRoute'
import ReactContext from './Component/ReactContext'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
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

// Replace your code here

class App extends Component {
  state = {list1: employmentTypesList, list2: salaryRangesList}

  render() {
    const {list1, list2} = this.state
    return (
      <ReactContext.Provider value={{list1, list2}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/jobs" component={Jobs} />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
