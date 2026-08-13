import './Sobre.css';

// Le decimos a TypeScript qué propiedades va a recibir
interface SobreProps {
  abierto: boolean;
  setAbierto: (valor: boolean) => void;
}

export function Sobre({ abierto, setAbierto }: SobreProps) {
  return (
    <div className="sobre-contenedor-principal">
      
      {/* LA TARJETA INTERIOR */}
      <div className={`tarjeta-interior ${abierto ? 'mostrar' : ''}`}>
        <div className="tarjeta-borde-dorado">
          <h2 className="tarjeta-eyebrow">Nos complace invitarte a la fiesta de</h2>
          <h1 className="tarjeta-titulo">GRADUACIÓN</h1>
          <p className="tarjeta-nombre">Saúl Mino Cabrera</p>
          <p className="tarjeta-fecha">Viernes, 21 de Agosto de 2026</p>
        </div>
      </div>

      {/* LA IMAGEN DEL SOBRE GENERADO */}
      <div 
        className={`sobre-imagen-wrapper ${abierto ? 'oculto' : ''}`}
        onClick={() => setAbierto(true)}
      >
        <img 
          src="/sobre-generado.webp" 
          alt="Sobre de Graduación" 
          className="sobre-img"
        />
        <p className="texto-instruccion">Toca el sobre para abrir tu invitación</p>
      </div>

    </div>
  );
}