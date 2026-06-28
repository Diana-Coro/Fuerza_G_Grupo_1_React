import React from 'react';
import './TiposBaja.css'; 

export const TiposBaja = () => {
  const listaTipos = [
    { id: 1, tipo: 'Venta', descripcion: 'Baja por venta' },
    { id: 2, tipo: 'Robo', descripcion: 'Baja por robo' },
    { id: 3, tipo: 'Deterioro', descripcion: 'Baja por deterioro' }
  ];

  return (
    <div className="modulo-derecho">
      <div className="titulo-seccion-afuera">
        <h2>ADMINISTRACIÓN DE TIPOS DE BAJA</h2>
      </div>
      <div className="caja-blanca-sistema">
        <div className="contenedor-tabla-sistema">
          <table className="tabla-sistema-azul">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>ID</th>
                <th style={{ width: '35%' }}>TIPO</th>
                <th style={{ width: '50%' }}>DESCRIPCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {listaTipos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.tipo}</td>
                  <td>{item.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel-botones-horizontal">
          <button className="btn-sistema-azul">Nuevo</button>
          <button className="btn-sistema-azul">Editar</button>
          <button className="btn-sistema-azul">Eliminar</button>
          
        </div>

      </div>

    </div>
  );
};

export default TiposBaja;