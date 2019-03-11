import io from 'socket.io-client'
import axios from 'axios'
import { Dispatch } from 'redux'
import _ from 'lodash'
import { TYPES } from './'

export interface IGetMESSAGESList {
  type: string
  data: any
}

export interface IMESSAGE {
  _id: string
  msg: string
  user_id: string
  fb_id: string
  user_name: string
  createTime: number
}

export interface IResult {
  status: boolean
  msg: string
}
export interface IUserResult {
  status: boolean
  user_id: string
}

export interface IMESSAGEAction extends IMESSAGE {
  type: string
}

let socket: ReturnType<typeof io>
export const connServer = (facebookUserId: string) => {
  console.log('connserver')
  return async (dispatch: Dispatch<any>) => {
    console.log('connserver aaaa')

    socket = io(`http://${location.hostname}:2266`, {
      // rejectUnauthorized: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
      transports: ['websocket'],
      // secure: true,
      // rejectUnauthorized: false,
    })
    socket.once('connect', () => {
      console.log('connected!')
      socket.emit('user', { fb_id: facebookUserId })
      socket.on('user', (result: IUserResult) => {
        if (result.status) {
          console.log(result)
        }
      })
      socket.on('receive message', (result: IResult) => {
        if (result.status) {
          console.log('get receive message')
          dispatch(newMessage(result))
        }
      })
      dispatch(getMessages(facebookUserId))
      socket.on('disconnect', () => {
        return dispatch({
          type: TYPES.CHAT_DISSCONNENT,
        })
      })
    })
  }
}

export const getMessages = (facebookUserId: string) => {
  console.log('getMessages')
  return async (dispatch: Dispatch<any>) => {
    const response = await axios.post('http://localhost:2266/api/chat', {
      url: 'http://localhost:2266/api/chat',
      time: _.now(),
      fb_id: facebookUserId,
    })
    console.log('getMessages_2')
    const { data } = response
    return dispatch({
      type: TYPES.CHAT_GET_MESSAGES,
      data,
    })
  }
}

export const sendMessage = (message: string, facebookUserId: string) => {
  const data = {
    msg: message,
    user_name: 'name',
    user_id: '5c46e2d416bb7212550a7d15',
    fb_id: facebookUserId,
    createTime: _.now(),
  }
  socket.emit('send message', data)

  return {
    type: TYPES.CHAT_SEND_MESSAGE,
  }
}

export const newMessage = (result: any) => {
  const data = result
  return {
    type: TYPES.CHAT_NEW_MESSAGES,
    data,
  }
}
