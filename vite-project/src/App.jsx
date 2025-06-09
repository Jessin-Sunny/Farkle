import './App.css'
import Setting from './components/Setting'
import Help from './components/Help'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GameProvider } from './components/Gamecontext'
function App() {


  return (

    <GameProvider>
      <Router>
        <div className="min-h-screen text-white" style={{ backgroundColor: '#16141C' }}>
          <h1 className="kaushan-script-regular">Farkle</h1>
          <Routes>
            <Route path="/" element={<Setting />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </Router>
      </GameProvider>

  )
}

export default App
