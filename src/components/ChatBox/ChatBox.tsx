import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Avatar } from 'antd'
import { connServer, IMESSAGE } from '../../redux/actions/chat'
import * as styles from './styles/ChatBox.module.scss'

export interface IItemProps {
  list: IMESSAGE[]
  dispatch: Dispatch<any>
  status: string
  facebookUserId: string
}
export interface IItemState {
  message: string
}

class ChatBox extends React.Component<IItemProps, IItemState> {
  lastMsgNode: React.RefObject<HTMLDivElement> = React.createRef()

  scrollToBottom() {
    const node = this.lastMsgNode.current
    console.log('node', node)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  componentDidMount() {
    const { facebookUserId } = this.props
    console.log('chatBox-didmount')
    this.props.dispatch(connServer(facebookUserId))
    console.log('chatBox-didmount dispatch connServer')
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { list } = this.props
    const { status } = this.props
    const { facebookUserId } = this.props
    if (status === 'disconnect') {
      // this.props.dispatch(connServer())
    }
    return (
      <div className={styles.chatBox}>
        {list.map((chat, index) => {
          return (
            <div
              key={chat._id}
              className={
                chat.fb_id === facebookUserId
                  ? styles.mychatItem
                  : styles.chatItem
              }
              ref={list.length - 1 === index ? this.lastMsgNode : null}
            >
              {chat.fb_id === facebookUserId ? (
                ''
              ) : (
                <Avatar
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                >
                  U
                </Avatar>
              )}

              <div className={styles.chatContent}>{chat.msg}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (storeState: any, ownProps: any) => {
  const { chat, user } = storeState
  return {
    list: chat.get('list', []),
    status: chat.get('status', null),
    facebookUserId: user.get('facebookUserId', null),
  }
}
export default connect(mapStateToProps)(ChatBox)
