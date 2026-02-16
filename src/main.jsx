import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Weather">
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </BrowserRouter>,
)
