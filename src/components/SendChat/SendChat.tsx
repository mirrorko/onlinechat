import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Input } from 'antd'
import * as styles from './styles/SendChat.module.scss'
import { sendMessage } from '../../redux/actions/chat'

import _ from 'lodash'

export interface IItemProps {
  dispatch: Dispatch<any>
  facebookUserId: string
}
export interface IItemState {
  message: string
}

export interface IMessage {
  message: string
}

class SendChat extends React.Component<IItemProps, IItemState> {
  constructor(props: IItemProps) {
    super(props)
  }

  render() {
    return (
      <div className={styles.sendChatInput}>
        <Input
          name="inputchat"
          placeholder="Enter Message"
          onPressEnter={this.sendchat}
        />
      </div>
    )
  }
  sendchat = (e: any) => {
    const { value } = e.target
    const { facebookUserId } = this.props
    if (value) {
      this.props.dispatch(sendMessage(value, facebookUserId))
      e.target.value = ''
    }
  }
}
const mapStateToProps = (storeState: any, ownProps: any) => {
  const { user } = storeState
  return {
    facebookUserId: user.get('facebookUserId', null),
  }
}
export default connect(mapStateToProps)(SendChat)
