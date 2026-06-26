import './ObjGasto.css'

const objGastos = [
  { gestion: 0, partida: "41100", descrip: "Edificios" },
  { gestion: 0, partida: "41200", descrip: "Tierras y Terrenos" },
  { gestion: 0, partida: "41300", descrip: "Otras adquisiciones" },
  { gestion: 0, partida: "43100", descrip: "Equipo de Oficina y Muebles" },
  { gestion: 0, partida: "43200", descrip: "Maquinaria y Equipo de Produccion" },
  { gestion: 0, partida: "43300", descrip: "Equipo de Transporte, Traccion y Elevacion" },
  { gestion: 0, partida: "43400", descrip: "Equipo Medico y de Laboratorio" },
  { gestion: 0, partida: "43500", descrip: "Equipo de Comunicaciones" },
  { gestion: 0, partida: "43600", descrip: "Equipo Educacional y Recreativo" },
  { gestion: 0, partida: "43700", descrip: "Otra Maquinaria y Equipo" },
  { gestion: 2012, partida: "41100", descrip: "Edificios" },
  { gestion: 2012, partida: "41200", descrip: "Tierras y Terrenos" },
  { gestion: 2012, partida: "43100", descrip: "Equipo de Oficina y Muebles" },
  { gestion: 2012, partida: "43200", descrip: "Maquinaria y Equipo de Produccion" },
]

function ObjGasto() {
  return (
    <div className="objgasto-container">
      <h2 className="objgasto-titulo">Objeto de Gasto</h2>

      <div className="objgasto-botones">
        <button className="btn btn-nuevo">Nuevo</button>
        <button className="btn btn-editar">Editar</button>
        <button className="btn btn-eliminar">Eliminar</button>
      </div>

      <table className="objgasto-tabla">
        <thead>
          <tr>
            <th>Gestion</th>
            <th>Partida</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {objGastos.map((item, index) => (
            <tr key={index}>
              <td>{item.gestion}</td>
              <td>{item.partida}</td>
              <td>{item.descrip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ObjGasto