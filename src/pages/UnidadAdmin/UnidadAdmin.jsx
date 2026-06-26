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
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("");

  useEffect(() => {
    cargarUnidades();
  }, []);

  const cargarUnidades = async () => {
    const data = await obtenerUnidades();
    setUnidades(data);
    setUnidadSeleccionada(null);
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const nuevo = () => {
    setModoFormulario("nuevo");
    setIdEditar(null);
    setFormulario({
      unidad: "",
      descripcion: "",
      ciudad: "",
    });
    setMostrarFormulario(true);
  };

  const editar = () => {
    if (!unidadSeleccionada) {
      alert("Seleccione una unidad de la tabla");
      return;
    }

    setModoFormulario("editar");
    setIdEditar(unidadSeleccionada.id);

    setFormulario({
      unidad: unidadSeleccionada.unidad,
      descripcion: unidadSeleccionada.descripcion,
      ciudad: unidadSeleccionada.ciudad,
    });

    setMostrarFormulario(true);
  };

  const guardarUnidad = async (e) => {
    e.preventDefault();

    if (!formulario.unidad || !formulario.descripcion || !formulario.ciudad) {
      alert("Completa todos los campos");
      return;
    }

    if (modoFormulario === "nuevo") {
      await crearUnidad(formulario);
    } else {
      await actualizarUnidad(idEditar, formulario);
    }

    setMostrarFormulario(false);
    setIdEditar(null);
    setFormulario({
      unidad: "",
      descripcion: "",
      ciudad: "",
    });

    cargarUnidades();
  };

  const abrirEliminar = () => {
    if (!unidadSeleccionada) {
      alert("Seleccione una unidad para eliminar");
      return;
    }

    setMostrarEliminar(true);
  };

  const confirmarEliminar = async () => {
    await eliminarUnidad(unidadSeleccionada.id);

    setMostrarEliminar(false);
    setUnidadSeleccionada(null);
    cargarUnidades();
  };

  const seleccionar = () => {
    if (!unidadSeleccionada) {
      alert("Seleccione una unidad de la tabla");
      return;
    }

    alert(
      "Unidad seleccionada: " +
        unidadSeleccionada.unidad +
        " - " +
        unidadSeleccionada.descripcion +
        " - " +
        unidadSeleccionada.ciudad
    );
  };

  const limpiar = () => {
    setUnidadSeleccionada(null);
    setFormulario({
      unidad: "",
      descripcion: "",
      ciudad: "",
    });
    setIdEditar(null);
  };

  const salir = () => {
    alert("Saliendo de Unidad Administrativa");
  };

  return (
    <div className="contenedor-unidad">
      <div className="titulo-principal">
        ADMINISTRACIÓN UNIDAD ADMINISTRATIVA
      </div>

      <div className="tabla-contenedor">
        <table className="tabla-unidad">
          <thead>
            <tr>
              <th>UNIDAD</th>
              <th>DESCRIPCIÓN</th>
              <th>CIUDAD</th>
            </tr>
          </thead>

          <tbody>
            {unidades.length > 0 ? (
              unidades.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setUnidadSeleccionada(item)}
                  className={
                    unidadSeleccionada?.id === item.id
                      ? "fila-seleccionada"
                      : ""
                  }
                >
                  <td>{item.unidad}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.ciudad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay unidades registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="botones">
        <button onClick={nuevo}>Nuevo</button>
        <button onClick={editar}>Editar</button>
        <button onClick={abrirEliminar}>Eliminar</button>
        <button onClick={seleccionar}>Seleccionar</button>
        <button onClick={limpiar}>Limpiar</button>
        <button onClick={salir}>Salir</button>
      </div>

      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">
              {modoFormulario === "nuevo"
                ? "NUEVA UNIDAD ADMINISTRATIVA"
                : "EDITAR UNIDAD ADMINISTRATIVA"}
            </div>

            <form className="modal-formulario" onSubmit={guardarUnidad}>
              <label>Unidad:</label>
              <input
                type="text"
                name="unidad"
                placeholder="Ingrese unidad"
                value={formulario.unidad}
                onChange={manejarCambio}
              />

              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                placeholder="Ingrese descripción"
                value={formulario.descripcion}
                onChange={manejarCambio}
              />

              <label>Ciudad:</label>
              <input
                type="text"
                name="ciudad"
                placeholder="Ingrese ciudad"
                value={formulario.ciudad}
                onChange={manejarCambio}
              />

              <div className="modal-botones">
                <button type="submit">
                  {modoFormulario === "nuevo" ? "Guardar" : "Actualizar"}
                </button>

                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarEliminar && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">
              ELIMINAR UNIDAD ADMINISTRATIVA
            </div>

            <p className="modal-texto">
              ¿Desea eliminar la unidad{" "}
              <b>{unidadSeleccionada?.descripcion}</b>?
            </p>

            <div className="modal-botones">
              <button onClick={confirmarEliminar}>Sí, eliminar</button>

              <button onClick={() => setMostrarEliminar(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnidadAdmin;