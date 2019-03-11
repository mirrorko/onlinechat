import * as React from 'react'
import * as styles from './styles/Login.module.scss'

class Login extends React.Component {
  componentDidMount() {
    FB.XFBML.parse(document.getElementById('fb-login-box'))
  }

  render() {
    return (
      <div id="fb-login-box" className={styles.LoginBox}>
        <div className={styles.Login}>
          <div className={styles.title}>Welcome To Milla's Online Chat</div>
          <div className={styles.description}>Please Longin With Facebook</div>
          {/* <button onClick={this.checkLoginState}>login with FaceBook</button> */}
          <div
            className="fb-login-button"
            data-size="large"
            data-button-type="login_with"
            data-auto-logout-link="false"
            data-use-continue-as="true"
            data-onlogin="onFBlogin"
          />
          <div id="status" />
        </div>
      </div>
    )
  }
}

export default Login
