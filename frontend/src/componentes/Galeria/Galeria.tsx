import { useState, useRef } from 'react';
import './Galeria.css';

export function Galeria() {
  const [fotos, setFotos] = useState<string[]>([]);
  const [totalSubidas, setTotalSubidas] = useState(0);
  const [nombre, setNombre] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubirFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    if (totalSubidas >= 10) {
      alert('Se ha alcanzado el límite de 10 fotos por invitado.');
      return;
    }

    if (!nombre.trim()) {
      alert('Escribe tu nombre antes de subir una foto.');
      e.target.value = '';
      return;
    }

    const archivo = e.target.files[0];
    const previewUrl = URL.createObjectURL(archivo);

    const formData = new FormData();
    formData.append('foto', archivo);
    formData.append('nombre', nombre.trim());

    setSubiendo(true);
    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/fotos`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // OJO: no pongas 'Content-Type' aquí, el navegador arma el boundary del multipart solo
        },
        body: formData,
      });

      if (respuesta.ok) {
        setFotos((prev) => [previewUrl, ...prev]);
        setTotalSubidas((prev) => prev + 1);
      } else {
        const data = await respuesta.json().catch(() => null);
        console.error('Error al guardar la foto', data);
        alert(data?.message ?? 'No se pudo subir la foto');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    } finally {
      setSubiendo(false);
      e.target.value = '';
    }
  };

  const handleConfirmar = () => {
    // Liberamos la memoria de los previews antes de ocultarlos
    fotos.forEach((url) => URL.revokeObjectURL(url));
    setFotos([]);
  };

  return (
    <section className="galeria-contenedor">
      <div className="galeria-tarjeta">
        <div className="galeria-borde-interno">
          <h2 className="galeria-titulo">Captura el Momento</h2>
          <div className="linea-decorativa-corta"></div>
          <p className="galeria-subtitulo">
            Ayúdame a documentar esta noche. Cada invitado puede compartir un máximo de 10 fotos.
          </p>

          <div className="galeria-input-grupo">
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input-nombre-galeria"
              disabled={totalSubidas >= 10}
            />
          </div>

          <button
            className="btn-subir-foto"
            onClick={() => inputRef.current?.click()}
            disabled={totalSubidas >= 10 || subiendo || !nombre.trim()}
            style={{ opacity: (totalSubidas >= 10 || subiendo) ? 0.5 : 1, cursor: (totalSubidas >= 10 || subiendo) ? 'not-allowed' : 'pointer' }}
          >
            {subiendo ? 'Subiendo...' : `📸 Subir una Foto (${totalSubidas}/10)`}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleSubirFoto}
            style={{ display: 'none' }}
          />

          {fotos.length > 0 && (
            <>
              <div className="fotos-grid">
                {fotos.map((url, index) => (
                  <div key={index} className="foto-marco">
                    <img src={url} alt={`Recuerdo ${index}`} className="foto-imagen" />
                  </div>
                ))}
              </div>

              <button className="btn-confirmar-fotos" onClick={handleConfirmar}>
                Confirmar
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}