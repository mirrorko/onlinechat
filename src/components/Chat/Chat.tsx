import * as React from 'react'
import { withRouter } from 'react-router-dom'
import ChatBox from '../ChatBox'
import SendChat from '../SendChat'

import * as styles from './styles/Chat.module.scss'

class Chat extends React.Component {
  render() {
    return (
      <div className={styles.Chat}>
        <div className={styles.chatApp}>
          <ChatBox />
          <SendChat />
        </div>
      </div>
    )
  }
}
export default withRouter<any>(Chat)
