import { useEffect, useState } from "react";
import {
  obtenerUnidades,
  crearUnidad,
  actualizarUnidad,
  eliminarUnidad,
} from "../../services/unidadAdminService";
import "./UnidadAdmin.css";

function UnidadAdmin() {
  const [unidades, setUnidades] = useState([]);
  const [formulario, setFormulario] = useState({
    unidad: "",
    descripcion: "",
    ciudad: "",
  });
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarUnidades();
  }, []);

  const cargarUnidades = async () => {
    const data = await obtenerUnidades();
    setUnidades(data);
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardarUnidad = async () => {
    if (!formulario.unidad || !formulario.descripcion || !formulario.ciudad) {
      alert("Completa todos los campos");
      return;
    }

    if (idEditar) {
      await actualizarUnidad(idEditar, formulario);
      setIdEditar(null);
    } else {
      await crearUnidad(formulario);
    }

    setFormulario({
      unidad: "",
      descripcion: "",
      ciudad: "",
    });

    cargarUnidades();
  };

  const seleccionarUnidad = (item) => {
    setFormulario({
      unidad: item.unidad,
      descripcion: item.descripcion,
      ciudad: item.ciudad,
    });
    setIdEditar(item.id);
  };

  const borrarUnidad = async (id) => {
    await eliminarUnidad(id);
    cargarUnidades();
  };

  return (
    <div className="contenedor-unidad">
      <div className="titulo-principal">
        ADMINISTRACIÓN UNIDAD ADMINISTRATIVA
      </div>

      <div className="formulario">
        <input
          type="text"
          name="unidad"
          placeholder="Unidad"
          value={formulario.unidad}
          onChange={manejarCambio}
        />

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={formulario.descripcion}
          onChange={manejarCambio}
        />

        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formulario.ciudad}
          onChange={manejarCambio}
        />
      </div>

      <table className="tabla-unidad">
        <thead>
          <tr>
            <th>UNIDAD</th>
            <th>DESCRIPCIÓN</th>
            <th>CIUDAD</th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {unidades.map((item) => (
            <tr key={item.id}>
              <td>{item.unidad}</td>
              <td>{item.descripcion}</td>
              <td>{item.ciudad}</td>
              <td>
                <button onClick={() => seleccionarUnidad(item)}>Editar</button>
                <button onClick={() => borrarUnidad(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botones">
        <button onClick={guardarUnidad}>
          {idEditar ? "Actualizar" : "Nuevo"}
        </button>
        <button
          onClick={() => {
            setFormulario({ unidad: "", descripcion: "", ciudad: "" });
            setIdEditar(null);
          }}
        >
          Limpiar
        </button>
        <button>Seleccionar</button>
        <button>Salir</button>
      </div>
    </div>
  );
}

export default UnidadAdmin;