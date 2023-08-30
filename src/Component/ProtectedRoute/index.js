import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const Token = Cookie.get('jwt_token')
  if (Token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
