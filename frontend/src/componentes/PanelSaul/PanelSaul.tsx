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
  nombre: string;
  url: string;
  created_at: string;
}

const API_URL = import.meta.env.VITE_API_URL as string

export function PanelSaul() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [errores, setErrores] = useState<string[]>([]);
  const [albumSeleccionado, setAlbumSeleccionado] = useState<string | null>(null);

  const cargarDatos = async () => {
    const erroresActuales: string[] = [];

    const [resMensajes, resCanciones, resFotos] = await Promise.allSettled([
      fetch(`${API_URL}/mensajes`),
      fetch(`${API_URL}/canciones`),
      fetch(`${API_URL}/fotos`),
    ]);

    if (resMensajes.status === 'fulfilled' && resMensajes.value.ok) {
      setMensajes(await resMensajes.value.json());
    } else {
      erroresActuales.push('mensajes');
    }

    if (resCanciones.status === 'fulfilled' && resCanciones.value.ok) {
      setCanciones(await resCanciones.value.json());
    } else {
      erroresActuales.push('canciones');
    }

    if (resFotos.status === 'fulfilled' && resFotos.value.ok) {
      setFotos(await resFotos.value.json());
    } else {
      erroresActuales.push('fotos');
    }

    setErrores(erroresActuales);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Agrupamos las fotos por carpeta/nombre de invitado
  const albumes = fotos.reduce<Record<string, Foto[]>>((acc, foto) => {
    if (!acc[foto.nombre]) acc[foto.nombre] = [];
    acc[foto.nombre].push(foto);
    return acc;
  }, {});

  const fotosDelAlbum = albumSeleccionado ? albumes[albumSeleccionado] ?? [] : [];

  return (
    <div className="panel-contenedor">
      <header className="panel-header">
        <button className="panel-btn-actualizar" onClick={cargarDatos}>
          ↻ Actualizar
        </button>
      </header>

      {errores.length > 0 && (
        <div className="panel-error-banner">
          No se pudieron cargar: {errores.join(', ')}. Intenta actualizar de nuevo.
        </div>
      )}

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

      {/* --- SECCIÓN DE FOTOS (ÁLBUMES POR INVITADO) --- */}
      <section className="panel-seccion">
        {albumSeleccionado === null ? (
          <>
            <h2 className="seccion-titulo">Álbumes de Fotos ({Object.keys(albumes).length})</h2>
            <div className="panel-grid-albumes">
              {Object.keys(albumes).length === 0 ? (
                <p className="vacio">Aún no hay fotos en el servidor.</p>
              ) : (
                Object.entries(albumes).map(([nombreAlbum, fotosAlbum]) => (
                  <button
                    key={nombreAlbum}
                    className="panel-album-card"
                    onClick={() => setAlbumSeleccionado(nombreAlbum)}
                  >
                    <div className="panel-album-portada">
                      <img
                        src={fotosAlbum[0].url}
                        alt={`Álbum de ${nombreAlbum}`}
                        loading="lazy"
                      />
                    </div>
                    <span className="panel-album-nombre">{nombreAlbum}</span>
                    <span className="panel-album-contador">{fotosAlbum.length} foto{fotosAlbum.length !== 1 ? 's' : ''}</span>
                  </button>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <div className="panel-album-header">
              <button className="panel-btn-volver" onClick={() => setAlbumSeleccionado(null)}>
                ← Volver a álbumes
              </button>
              <h2 className="seccion-titulo panel-album-titulo">
                {albumSeleccionado} ({fotosDelAlbum.length})
              </h2>
            </div>
            <div className="panel-grid-fotos">
              {fotosDelAlbum.map((f) => (
                <div key={f.id} className="panel-foto-marco">
                  <img 
                    src={f.url}
                    alt="Recuerdo de la fiesta" 
                    className="panel-foto-img" 
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}