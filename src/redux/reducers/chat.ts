import { Action } from 'redux'
import { Map } from 'immutable'
import _ from 'lodash'
import { TYPES, IGetMESSAGESList, IMESSAGE } from '../actions'

export interface IDefaultMESSAGEState {
  list: IMESSAGE[]
}

const defaultMESSAGEState: Map<string, any> = Map({
  list: [],
})

export const chat = (state = defaultMESSAGEState, action: Action) => {
  const { type } = action // const type = action.type
  switch (type) {
    case TYPES.CHAT_GET_MESSAGES: {
      const { data } = action as IGetMESSAGESList
      return state.set('list', data)
    }
    case TYPES.CHAT_SEND_MESSAGE: {
      return state.set('message', '')
    }
    case TYPES.CHAT_DISSCONNENT: {
      return state.set('status', 'disconnect')
    }
    case TYPES.CHAT_NEW_MESSAGES: {
      const { data } = action as IGetMESSAGESList
      const list = state.get('list')
      list.push(data)
      return state.set('list', [...list])
    }
  }
  return state
}
