import "./unidadAdmin.css";

function UnidadAdmin() {
  return (
    <div className="contenedor-unidad">
      <div className="titulo-principal">
        ADMINISTRACIÓN UNIDAD ADMINISTRATIVA
      </div>

      <table className="tabla-unidad">
        <thead>
          <tr>
            <th>UNIDAD</th>
            <th>DESCRIPCIÓN</th>
            <th>CIUDAD</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>101</td>
            <td>Administración Central</td>
            <td>La Paz</td>
          </tr>

          <tr>
            <td>102</td>
            <td>Recursos Humanos</td>
            <td>Potosí</td>
          </tr>
        </tbody>
      </table>

      <div className="botones">
        <button>Nuevo</button>
        <button>Editar</button>
        <button>Eliminar</button>
        <button>Seleccionar</button>
        <button>Salir</button>
      </div>
    </div>
  );
}

export default UnidadAdmin;