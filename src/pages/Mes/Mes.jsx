import { useEffect, useState } from "react";
import {
  listarMeses,
  buscarMesPorId,
  guardarMes,
  actualizarMes,
  eliminarMes,
} from "../../services/mesService";
import "./mes.css";

function Mes() {
  const [meses, setMeses] = useState([]);
  const [nombres, setNombres] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("");

  const cargarMeses = async () => {
    const datos = await listarMeses();
    setMeses(datos);
    setMesSeleccionado(null);
  };

  useEffect(() => {
    cargarMeses();
  }, []);

  const buscar = async () => {
    if (idBuscar === "") {
      alert("Ingrese un código");
      return;
    }

    try {
      const dato = await buscarMesPorId(idBuscar);
      setMeses([dato]);
    } catch {
      alert("Mes no encontrado");
    }
  };

  const nuevo = () => {
    setModoFormulario("nuevo");
    setNombres("");
    setMostrarFormulario(true);
  };

  const editar = () => {
    if (!mesSeleccionado) {
      alert("Seleccione un registro");
      return;
    }

    setModoFormulario("editar");
    setNombres(mesSeleccionado.nombres);
    setMostrarFormulario(true);
  };

  const guardar = async (e) => {
    e.preventDefault();

    const mes = {
      nombres: nombres,
    };

    if (modoFormulario === "nuevo") {
      await guardarMes(mes);
    } else {
      await actualizarMes(mesSeleccionado.mes, mes);
    }

    setMostrarFormulario(false);
    cargarMeses();
  };

  const eliminar = async () => {
    await eliminarMes(mesSeleccionado.mes);
    setMostrarEliminar(false);
    cargarMeses();
  };

  return (
    <div className="mes-page">

      <div className="mes-panel">

        <div className="mes-header">
          ADMINISTRACIÓN DE MES
        </div>

        <div className="mes-busqueda">
          <input
            type="number"
            placeholder="Buscar por código"
            value={idBuscar}
            onChange={(e) => setIdBuscar(e.target.value)}
          />

          <button onClick={buscar}>
            Buscar
          </button>

          <button onClick={cargarMeses}>
            Mostrar Todos
          </button>
        </div>

        <div className="tabla-contenedor">

          <table className="mes-tabla">

            <thead>
              <tr>
                <th>Mes</th>
                <th>Nombres</th>
              </tr>
            </thead>

            <tbody>

              {meses.map((mes) => (

                <tr
                  key={mes.mes}
                  onClick={() => setMesSeleccionado(mes)}
                  className={
                    mesSeleccionado?.mes === mes.mes
                      ? "fila-seleccionada"
                      : ""
                  }
                >

                  <td>{mes.mes}</td>
                  <td>{mes.nombres}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="botones-panel">

          <button onClick={nuevo}>
            Nuevo
          </button>

          <button onClick={editar}>
            Editar
          </button>

          <button onClick={() => setMostrarEliminar(true)}>
            Eliminar
          </button>

          <button
            onClick={() =>
              alert(
                mesSeleccionado
                  ? `Mes seleccionado: ${mesSeleccionado.nombres}`
                  : "Seleccione un registro"
              )
            }
          >
            Seleccionar
          </button>

          <button onClick={() => window.history.back()}>
            Salir
          </button>

        </div>

      </div>

      {mostrarFormulario && (

        <div className="modal-fondo">

          <div className="modal-caja">

            <div className="modal-header">
              {modoFormulario === "nuevo"
                ? "NUEVO MES"
                : "EDITAR MES"}
            </div>

            <form
              className="modal-formulario"
              onSubmit={guardar}
            >

              <label>Nombre del mes</label>

              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />

              <div className="modal-botones">

                <button type="submit">
                  Guardar
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
              ELIMINAR MES
            </div>

            <p className="modal-texto">
              ¿Desea eliminar el mes{" "}
              <b>{mesSeleccionado?.nombres}</b>?
            </p>

            <div className="modal-botones">

              <button onClick={eliminar}>
                Sí
              </button>

              <button
                onClick={() => setMostrarEliminar(false)}
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Mes;