import { useEffect, useState } from "react";
import {
  listarObjGastos,
  buscarObjGastoPorId,
  guardarObjGasto,
  actualizarObjGasto,
  eliminarObjGasto,
} from "../../services/objGastoService";

import "./ObjGasto.css";

function ObjGasto() {
  const [objGastos, setObjGastos] = useState([]);
  const [objGastoSeleccionado, setObjGastoSeleccionado] = useState(null);

  const [partida, setPartida] = useState("");
  const [gestion, setGestion] = useState("");
  const [descrip, setDescrip] = useState("");

  const [idBuscar, setIdBuscar] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("");

  const cargarObjGastos = async () => {
    const datos = await listarObjGastos();
    setObjGastos(datos);
    setObjGastoSeleccionado(null);
  };

  useEffect(() => {
    cargarObjGastos();
  }, []);

  const buscarPorId = async () => {
    if (idBuscar === "") {
      alert("Ingrese una partida para buscar");
      return;
    }

    try {
      const dato = await buscarObjGastoPorId(idBuscar);
      setObjGastos([dato]);
      setObjGastoSeleccionado(null);
    } catch (error) {
      alert("No se encontró el objeto de gasto");
    }
  };

  const nuevo = () => {
    setModoFormulario("nuevo");
    setIdEditar(null);
    setPartida("");
    setGestion("");
    setDescrip("");
    setMostrarFormulario(true);
  };

  const editarSeleccionado = () => {
    if (objGastoSeleccionado === null) {
      alert("Seleccione un objeto de gasto de la tabla");
      return;
    }

    setModoFormulario("editar");

    setIdEditar(objGastoSeleccionado.partida);
    setPartida(objGastoSeleccionado.partida);
    setGestion(objGastoSeleccionado.gestion);
    setDescrip(objGastoSeleccionado.descrip);

    setMostrarFormulario(true);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (partida === "" || gestion === "" || descrip.trim() === "") {
      alert("Complete todos los campos");
      return;
    }

    const objGasto = {
      partida: partida,
      gestion: gestion,
      descrip: descrip,
    };

    if (modoFormulario === "nuevo") {
      await guardarObjGasto(objGasto);
    } else {
      await actualizarObjGasto(idEditar, objGasto);
    }

    setMostrarFormulario(false);
    setIdEditar(null);
    setPartida("");
    setGestion("");
    setDescrip("");
    setObjGastoSeleccionado(null);

    cargarObjGastos();
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setIdEditar(null);
    setPartida("");
    setGestion("");
    setDescrip("");
  };

  const eliminarSeleccionado = () => {
    if (objGastoSeleccionado === null) {
      alert("Seleccione un objeto de gasto para eliminar");
      return;
    }

    setMostrarEliminar(true);
  };

  const confirmarEliminar = async () => {
    await eliminarObjGasto(objGastoSeleccionado.partida);

    setMostrarEliminar(false);
    setObjGastoSeleccionado(null);
    cargarObjGastos();
  };

  const seleccionarObjGasto = () => {
    if (objGastoSeleccionado === null) {
      alert("Seleccione un objeto de gasto de la tabla");
      return;
    }

    alert(
      "Objeto de gasto seleccionado: " +
        objGastoSeleccionado.partida +
        " - " +
        objGastoSeleccionado.descrip
    );
  };

  const salir = () => {
    alert("Saliendo de Objeto de Gasto");
  };

  return (
    <div className="objgasto-page">
      <div className="objgasto-panel">
        <div className="objgasto-header">ADMINISTRACIÓN DE OBJETO DE GASTO</div>

        <div className="objgasto-busqueda">
          <input
            type="number"
            placeholder="Buscar por partida"
            value={idBuscar}
            onChange={(e) => setIdBuscar(e.target.value)}
          />

          <button type="button" onClick={buscarPorId}>
            Buscar
          </button>

          <button type="button" onClick={cargarObjGastos}>
            Mostrar todos
          </button>
        </div>

        <div className="tabla-contenedor">
          <table className="objgasto-tabla">
            <thead>
              <tr>
                <th>PARTIDA</th>
                <th>GESTIÓN</th>
                <th>DESCRIPCIÓN</th>
              </tr>
            </thead>

            <tbody>
              {objGastos.length > 0 ? (
                objGastos.map((obj) => (
                  <tr
                    key={obj.partida}
                    onClick={() => setObjGastoSeleccionado(obj)}
                    className={
                      objGastoSeleccionado?.partida === obj.partida
                        ? "fila-seleccionada"
                        : ""
                    }
                  >
                    <td>{obj.partida}</td>
                    <td>{obj.gestion}</td>
                    <td>{obj.descrip}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay objetos de gasto registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="botones-panel">
          <button type="button" onClick={nuevo}>
            Nuevo
          </button>

          <button type="button" onClick={editarSeleccionado}>
            Editar
          </button>

          <button type="button" onClick={eliminarSeleccionado}>
            Eliminar
          </button>

          <button type="button" onClick={seleccionarObjGasto}>
            Seleccionar
          </button>

          <button type="button" onClick={salir}>
            Salir
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">
              {modoFormulario === "nuevo"
                ? "NUEVO OBJETO DE GASTO"
                : "EDITAR OBJETO DE GASTO"}
            </div>

            <form className="modal-formulario" onSubmit={guardar}>
              <label>Partida:</label>
              <input
                type="number"
                placeholder="Ingrese partida"
                value={partida}
                onChange={(e) => setPartida(e.target.value)}
                disabled={modoFormulario === "editar"}
              />

              <label>Gestión:</label>
              <input
                type="number"
                placeholder="Ingrese gestión"
                value={gestion}
                onChange={(e) => setGestion(e.target.value)}
              />

              <label>Descripción:</label>
              <input
                type="text"
                placeholder="Ingrese descripción"
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
              />

              <div className="modal-botones">
                <button type="submit">
                  {modoFormulario === "nuevo" ? "Guardar" : "Actualizar"}
                </button>

                <button type="button" onClick={cancelarFormulario}>
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
            <div className="modal-header">ELIMINAR OBJETO DE GASTO</div>

            <p className="modal-texto">
              ¿Desea eliminar la partida{" "}
              <b>{objGastoSeleccionado?.partida}</b>?
            </p>

            <div className="modal-botones">
              <button type="button" onClick={confirmarEliminar}>
                Sí, eliminar
              </button>

              <button type="button" onClick={() => setMostrarEliminar(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ObjGasto;