import './DetallesEvento.css';

export function DetallesEvento() {
  return (
    <section className="detalles-contenedor">
      <div className="detalles-header">
        <h2 className="detalles-subtitulo">Licenciatura en Ciencias de la Computación</h2>
        <h3 className="detalles-universidad">Benemérita Universidad Autónoma de Puebla</h3>
        <div className="linea-decorativa"></div>
      </div>

      <div className="tarjeta-unica-evento">
        <div className="tarjeta-borde-interno">
          {/*<div className="icono-elegante">🥂</div>*/}
          <h3 className="titulo-evento">Recepción y Fiesta</h3>
          
          <div className="info-bloque">
            <p className="etiqueta">Cuándo</p>
            <p className="texto-principal">Viernes, 21 de Agosto de 2026</p>
            <p className="texto-secundario">8:00 PM - 3:00 AM</p>
          </div>

          <div className="divisor-diamante"></div>

          <div className="info-bloque">
            <p className="etiqueta">Dónde</p>
            <p className="texto-principal">Gran Recepción</p>
            <p className="texto-secundario">
              Tepeyahualco 10, La Purísima<br />
              San Francisco Acatepec (Segunda Sección)<br />
              C.P. 72846, San Andrés Cholula, Pue.
            </p>
          </div>

          <a 
            href="https://www.google.com/maps/search/?api=1&query=Tepeyahualco+10,+La+Purisima,+San+Francisco+Acatepec,+72846+San+Andres+Cholula,+Puebla" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-mapa-elegante"
          >
            Abrir en Maps
          </a>
        </div>
      </div>
    </section>
  );
}