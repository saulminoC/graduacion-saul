import { useState } from 'react'; // <-- Agregamos useState aquí
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sobre } from './componentes/Sobre/Sobre';
import { DetallesEvento } from './componentes/DetallesEvento/DetallesEvento';
import { LibroDeseos } from './componentes/LibroDeseos/LibroDeseos';
import { Galeria } from './componentes/Galeria/Galeria';
import { SugerenciaMusical } from './componentes/SugerenciaMusical/SugerenciaMusical';
import { PanelSaul } from './componentes/PanelSaul/PanelSaul';
import './App.css';

function VistaInvitacion() {
  // El estado principal ahora vive aquí
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);

  return (
    <>
      <div className="contenedor-invitacion">
        {/* Le pasamos el estado al sobre */}
        <Sobre abierto={invitacionAbierta} setAbierto={setInvitacionAbierta} />
      </div>
      
      {/* Magia pura: Solo si invitacionAbierta es TRUE, dibujamos los detalles */}
      {invitacionAbierta && (
        <div className="seccion-revelada">
          <DetallesEvento />
          <LibroDeseos />
          <Galeria />
          <SugerenciaMusical />
        </div>
      )}
    </>
  );
}

function VistaPanelSaul() {
  return <PanelSaul />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/graduacion" element={<VistaInvitacion />} />
        <Route path="/saul" element={<VistaPanelSaul />} />
      </Routes>
    </Router>
  );
}