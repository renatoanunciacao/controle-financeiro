import { HashRouter  } from 'react-router-dom'
import './App.css'
import Layout from './layout'
import { globalStyles } from './styles/global'

function App() {
  globalStyles();


  return (
    <HashRouter>   
        <Layout />
    </HashRouter>
  )
}

export default App
