import * as React from 'react'
// const io = require('socket.io-client')
import { Route, Switch, Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { checkLogin } from '../../redux/actions/user'

import Chat from '../Chat'
import Login from '../Login'
export interface IItemProps {
  loginStatus: boolean
  facebookUserId?: string
  dispatch: Dispatch<any>
}

export interface IItemState {
  loginStatus: boolean
  facebookUserId?: string
}

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
)

class App extends React.Component<IItemProps, IItemState> {
  constructor(props: IItemProps) {
    super(props)
    // this.state = { loginStatus: false }
  }

  componentDidMount() {
    this.props.dispatch(checkLogin())
  }
  render() {
    const { loginStatus } = this.props
    // const { facebookUserId } = this.props
    return (
      <Switch>
        <PrivateRoute
          authenticated={loginStatus}
          path="/private"
          component={Chat}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (loginStatus === null) {
              return null
            } else {
              return loginStatus ? <Chat /> : <Login />
            }
          }}
        />
        {/* <Route path="/private" component={Chat} /> */}
        {/* <Route path="/" component={Login} /> */}
      </Switch>
    )
  }

  // statusChangeCallback = (response: any) => {
  //   console.log('statusChangeCallback')
  //   console.log(response)
  //   // The response object is returned with a status field that lets the
  //   // app know the current login status of the person.
  //   // Full docs on the response object can be found in the documentation
  //   // for FB.getLoginStatus().
  //   if (response.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     this.getFBmeAPI()
  //   } else {
  //     // The person is not logged into your app or we are unable to tell.
  //     // @ts-ignore
  //     document.getElementById('status').innerHTML =
  //       'Please log ' + 'into this app.'
  //   }
  // }
  // checkLoginState = () => {
  //   // @ts-ignore
  //   FB.getLoginStatus(response => {
  //     this.statusChangeCallback(response)
  //   })
  // }
  // getFBmeAPI = () => {
  //   console.log('Welcome!  Fetching your information.... ')
  //   // @ts-ignore
  //   FB.api('/me', (response: any) => {
  //     console.log('Successful login for: ' + response.id)
  //     this.setState({
  //       loginStatus: true,
  //       facebookUserId: response.id,
  //     })
  //   })
  // }
}
const mapStateToProps = (storeState: any, ownProps: any) => {
  const { user } = storeState
  console.log(user.toJS())
  return {
    loginStatus: user.get('loginStatus', null),
    facebookUserId: user.get('facebookUserId', null),
  }
}
export default connect(mapStateToProps)(App)
