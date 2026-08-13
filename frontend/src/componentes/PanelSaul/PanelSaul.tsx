import { useEffect, useState } from 'react';
import './PanelSaul.css';

interface Mensaje {
  id: number;
  nombre: string;
  mensaje: string;
  created_at: string;
}

interface Cancion {
  id: number;
  cancion: string;
  nombre?: string;
  created_at: string;
}

interface Foto {
  id: number;
  ruta: string;
  created_at: string;
}

export function PanelSaul() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos fetch a los tres endpoints al mismo tiempo para máxima eficiencia
    const cargarDatos = async () => {
      try {
        const [resMensajes, resCanciones, resFotos] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/mensajes`),
          fetch(`${import.meta.env.VITE_API_URL}/canciones`),
          fetch(`${import.meta.env.VITE_API_URL}/fotos`)
        ]);

        if (resMensajes.ok) setMensajes(await resMensajes.json());
        if (resCanciones.ok) setCanciones(await resCanciones.json());
        if (resFotos.ok) setFotos(await resFotos.json());
      } catch (error) {
        console.error("Error al cargar el panel:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) {
    return <div className="panel-loading">Cargando panel de control...</div>;
  }

  return (
    <div className="panel-contenedor">
      <header className="panel-header">
        <h1 className="panel-titulo">Panel de Administración</h1>
        <p className="panel-subtitulo">Licenciatura en Ciencias de la Computación • BUAP</p>
        <div className="linea-decorativa"></div>
      </header>

      {/* --- SECCIÓN DE MENSAJES (LIBRO DE DESEOS) --- */}
      <section className="panel-seccion">
        <h2 className="seccion-titulo">Libro de Deseos ({mensajes.length})</h2>
        <div className="panel-grid">
          {mensajes.length === 0 ? (
            <p className="vacio">Aún no hay mensajes registrados.</p>
          ) : (
            mensajes.map((m) => (
              <div key={m.id} className="panel-card">
                <h3>{m.nombre}</h3>
                <p className="card-texto">"{m.mensaje}"</p>
                <span className="card-fecha">{new Date(m.created_at).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* --- SECCIÓN DE CANCIONES (PLAYLIST) --- */}
      <section className="panel-seccion">
        <h2 className="seccion-titulo">Soundtrack Recomendado ({canciones.length})</h2>
        <div className="panel-grid">
          {canciones.length === 0 ? (
            <p className="vacio">Aún no hay canciones sugeridas.</p>
          ) : (
            canciones.map((c) => (
              <div key={c.id} className="panel-card">
                <h3>🎵 {c.cancion}</h3>
                <p className="card-autor">Recomendado por: {c.nombre || 'Anónimo'}</p>
                <span className="card-fecha">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* --- SECCIÓN DE FOTOS (GALERÍA) --- */}
      <section className="panel-seccion">
        <h2 className="seccion-titulo">Fotos de la Fiesta ({fotos.length})</h2>
        <div className="panel-grid-fotos">
          {fotos.length === 0 ? (
            <p className="vacio">Aún no hay fotos en el servidor.</p>
          ) : (
            fotos.map((f) => (
              <div key={f.id} className="panel-foto-marco">
                {/* Ajusta la URL base según tu servidor de Laravel storage */}
                <img 
                  src={`http://localhost:8000/storage/${f.ruta}`} 
                  alt="Recuerdo de la fiesta" 
                  className="panel-foto-img" 
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}