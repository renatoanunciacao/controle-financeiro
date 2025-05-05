import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './layout'
import { globalStyles } from './styles/global'

function App() {
  globalStyles();


  return (
    <BrowserRouter basename="/finances">   
        <Layout />
    </BrowserRouter>
  )
}

export default App
