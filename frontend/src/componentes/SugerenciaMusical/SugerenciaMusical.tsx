import { useState } from 'react';
import './SugerenciaMusical.css';

export function SugerenciaMusical() {
  const [cancion, setCancion] = useState('');
  const [nombre, setNombre] = useState('');
  const [enviado, setEnviado] = useState(false);
  
  // Nuevo estado para guardar nuestro mensaje secreto
  const [easterEgg, setEasterEgg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const textoBuscado = cancion.toLowerCase();
    let mensajeSecreto = '';

    if (textoBuscado.includes('bad bunny')) {
      mensajeSecreto = '🐇 ¡Uff! Esa no falla para la fiesta.';
    } else if (textoBuscado.includes('eminem')) {
      mensajeSecreto = '🎤 ¡Puro fuego clásico! Excelente gusto.';
    } else if (textoBuscado.includes('peso pluma')) {
      mensajeSecreto = '🎺 ¡Compa! Se va a prender el belicón.';
    }

    if (mensajeSecreto) {
      setEasterEgg(mensajeSecreto);
    }

    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/canciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Mandamos los datos, si nombre está vacío, Laravel lo acepta porque lo pusimos "nullable"
        body: JSON.stringify({ cancion, nombre }) 
      });

      if (respuesta.ok) {
        setEnviado(true);
        setCancion('');
        setNombre('');
        
        setTimeout(() => {
          setEnviado(false);
          setEasterEgg('');
        }, 4000);
      } else {
        console.error("Error al guardar la canción");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <section className="musica-contenedor">
      <div className="musica-tarjeta">
        <div className="musica-borde-interno">
          {/*<div className="icono-musica">🎵</div>*/}
          <h2 className="musica-titulo">El Soundtrack de la Noche</h2>
          <div className="linea-decorativa-corta"></div>
          <p className="musica-subtitulo">
            ¿Qué canción no puede faltar en la pista de baile?
            (artista - cancion)
          </p>
          
          <form className="musica-formulario" onSubmit={handleSubmit}>
            <div className="input-grupo">
              <input 
                type="text" 
                placeholder="Nombre de la canción (Ej. Alright - Kendrick Lamar)" 
                value={cancion}
                onChange={(e) => setCancion(e.target.value)}
                required
              />
            </div>
            
            <div className="input-grupo">
              <input 
                type="text" 
                placeholder="Tu nombre (Opcional)" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              className={`btn-enviar-musica ${enviado ? 'btn-exito' : ''}`}
            >
              {enviado ? '¡Añadida a la Playlist!' : 'Recomendar Canción'}
            </button>

            {/* Renderizado condicional del Easter Egg */}
            {easterEgg && (
              <div className="mensaje-easter-egg">
                {easterEgg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}