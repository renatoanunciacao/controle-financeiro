import { BrowserRouter as Router   } from 'react-router-dom'
import './App.css'
import Layout from './layout'
import { globalStyles } from './styles/global'

function App() {
  globalStyles();


  return (
    <Router>   
        <Layout />
    </Router>
  )
}

export default App
