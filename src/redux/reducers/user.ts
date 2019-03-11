import { Action } from 'redux'
import { Map } from 'immutable'
import _ from 'lodash'
import { TYPES, IUserStatusAction } from '../actions'

const defaultLOGINState: Map<string, any> = Map({
  loginStatus: null,
  facebookUserId: null,
})

export const user = (state = defaultLOGINState, action: Action) => {
  const { type } = action // const type = action.type
  switch (type) {
    case TYPES.USER_LOGIN_STATUS: {
      const { loginStatus, facebookUserId } = action as IUserStatusAction

      state = state
        .set('loginStatus', loginStatus)
        .set('facebookUserId', facebookUserId)
      return state
    }
  }
  return state
}
