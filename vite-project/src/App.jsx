import './App.css'
import Setting from './components/Setting'
import Help from './components/Help'
import Match from './components/Match'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GameProvider } from './components/Gamecontext'
function App() {


  return (

    <GameProvider>
      <Router>
        <div className="min-h-screen text-white" style={{ backgroundColor: '#16141C' }}>
          <h1 className="kaushan-script-regular" style={{  fontSize: '64px', textAlign: 'center'}}>Farkle</h1>
          <Routes>
            <Route path="/" element={<Setting />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/help" element={<Help />} />
            <Route path="/match" element={<Match/>}/>
          </Routes>
        </div>
      </Router>
      </GameProvider>

  )
}

export default App
