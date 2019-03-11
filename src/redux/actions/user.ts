// import axios from 'axios'
import { Dispatch } from 'redux'
import _ from 'lodash'
import { TYPES } from './'

export interface IUserStatusAction {
  type: string
  loginStatus: boolean
  facebookUserId?: string
}

export const checkLogin = () => {
  return (dispatch: Dispatch<any>) => {
    const getStatus = () => {
      FB.getLoginStatus(response => {
        statusChangeCallback(response, dispatch)
      })
    }
    if (_.has(window, 'FB')) {
      getStatus()
    } else {
      document.addEventListener('FB.init', getStatus, { once: true })
    }
  }
}

const statusChangeCallback = (response: any, dispatch: Dispatch<any>) => {
  console.log('statusChangeCallback')
  console.log(response)
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    FB.api('/me', (meResponse: any) => {
      console.log('Successful login for: ' + meResponse.id)
      dispatch({
        type: TYPES.USER_LOGIN_STATUS,
        loginStatus: true,
        facebookUserId: meResponse.id,
      } as IUserStatusAction)
    })
  } else {
    dispatch({
      type: TYPES.USER_LOGIN_STATUS,
      loginStatus: false,
    } as IUserStatusAction)
  }
}
