import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import 'antd/dist/antd.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
