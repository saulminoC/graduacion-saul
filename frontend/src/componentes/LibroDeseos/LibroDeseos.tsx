import { useState } from 'react';
import './LibroDeseos.css';

export function LibroDeseos() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/mensajes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Súper importante para Laravel
        },
        body: JSON.stringify({ nombre, mensaje })
      });

      if (respuesta.ok) {
        setEnviado(true);
        setNombre('');
        setMensaje('');
        setTimeout(() => setEnviado(false), 3000);
      } else {
        console.error("Error al guardar el deseo");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <section className="libro-contenedor">
      <div className="libro-tarjeta">
        <div className="libro-borde-interno">
          <h2 className="libro-titulo">Libro de Deseos</h2>
          <div className="linea-decorativa-corta"></div>
          <p className="libro-subtitulo">
            Déjale un mensaje a Saúl para recordar este día tan especial.
          </p>
          
          <form className="libro-formulario" onSubmit={handleSubmit}>
            <div className="input-grupo">
              <input 
                type="text" 
                placeholder="Tu nombre completo" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            
            <div className="input-grupo">
              <textarea 
                placeholder="Escribe tus felicitaciones o buenos deseos..." 
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={`btn-enviar-deseo ${enviado ? 'btn-exito' : ''}`}
            >
              {enviado ? '¡Mensaje Enviado!' : 'Dejar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}