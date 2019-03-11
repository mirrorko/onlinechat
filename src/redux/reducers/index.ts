import { combineReducers } from 'redux'

import { chat } from './chat'
import { user } from './user'

export const rootReducer = combineReducers({ chat, user })
