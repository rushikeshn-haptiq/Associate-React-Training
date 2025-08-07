
import './App.css'
import Router from './Routers/Router'
import {Provider} from 'react-redux'
import { store } from './redux/Store'

function App() {
 
  return (
  <Provider store={store}>
    <Router/>
  </Provider>
  )
}

export default App
