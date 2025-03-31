import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Personas from './personas';
import Tareas from './Tareas';
import ConsultarTareas from './ConsultarTareas';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../assets/css/HomePage.css';
import homeImg from '../assets/img/hogar.png';
import taskImg from '../assets/img/lista-de-tareas.png';
import userImg from '../assets/img/users.png';
import animeImg from '../assets/img/anime.png';
import { useState } from 'react';

function HomePage() {
  const [mostrarOpciones, setMostrarOpciones] = useState(false); // Estado para desplegable

  return (
    <Router>
      <div className="layout">
        <aside className="sidebar">
          <h2>Menú</h2>
          <ul>
            <li>
              <Link to="/" onClick={() => setMostrarOpciones(false)}>
                <img src={homeImg} alt="" /> Inicio
              </Link>
            </li>
            <li>
              <Link to="/personas" onClick={() => setMostrarOpciones(false)}>
                <img src={userImg} alt="" /> Personas
              </Link>
            </li>
             <li className="opcion-tareas" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
                <img src={taskImg} alt="" /> Tareas 
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </li>
              {mostrarOpciones && (
               <ul className="submenu">
                  <li><Link to="/tareas">Crear Tarea</Link></li>
                  <li><Link to="/consultar-tareas">Consultar Tareas</Link></li>
                </ul>
              )}
          </ul>
        </aside>

        <main className="content">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <h1>Bienvenido al Inicio</h1>
                  <img className='anime-img' src={animeImg} alt="" />
                </>
              } 
            />
            <Route path="/personas" element={<Personas />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/consultar-tareas" element={<ConsultarTareas />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default HomePage;