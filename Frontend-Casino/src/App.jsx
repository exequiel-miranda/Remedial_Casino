import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import FirstUse from './pages/firstuse/firstuse.jsx'
import CasinoHero from './pages/menu/menu.jsx'
import Navbar from '../src/Components/nav.jsx'
import GamesManager from "./pages/Games/Games.jsx";
import ClientsManager from './pages/ClientsPage/Clients.jsx';


function AppLayout() {
  const location = useLocation()

  // No mostrar Navbar si estamos en la ruta '/'
  const showNavbar = location.pathname !== '/'

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<FirstUse />} />
        <Route path="/casino" element={<CasinoHero />} />
        <Route path="/Games" element={<GamesManager />} />
        <Route path="/Clients" element={<ClientsManager />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App



