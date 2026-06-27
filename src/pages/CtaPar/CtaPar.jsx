import { useEffect, useState } from "react";
import {
  listarCtaPar,
  buscarCtaParPorId,
  guardarCtaPar,
  actualizarCtaPar,
  eliminarCtaPar,
} from "../../services/ctaParService";
import "./CtaPar.css";

const estadoInicial = {
  codcont: "",
  partida: "",
  gestion: "",
};

function CtaPar() {
  const [listaCtaPar, setListaCtaPar] = useState([]);
  const [formulario, setFormulario] = useState(estadoInicial);
  const [idEditar, setIdEditar] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("");
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const cargarDatos = async () => {
    try {
      const datos = await listarCtaPar();
      setListaCtaPar(datos);
      setFilaSeleccionada(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const toNumber = (value) => {
    return value === "" ? null : Number(value);
  };

  const actualizarCampo = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const buscarPorId = async () => {
    if (idBuscar === "") {
      alert("Ingrese un código para buscar");
      return;
    }
    try {
      const dato = await buscarCtaParPorId(idBuscar);
      setListaCtaPar([dato]);
      setFilaSeleccionada(null);
    } catch (error) {
      alert("No se encontró un registro con ese código");
    }
  };

  const seleccionarFila = (item) => {
    setFilaSeleccionada(item);
  };

  const nuevo = () => {
    setModoFormulario("nuevo");
    setIdEditar(null);
    setFormulario(estadoInicial);
    setMostrarFormulario(true);
  };

  const editarSeleccionado = () => {
    if (filaSeleccionada === null) {
      alert("Seleccione un registro de la tabla");
      return;
    }
    
    // Soporte para todas las variantes posibles del backend al editar
    const codigo = filaSeleccionada.codcont ?? filaSeleccionada.CodCont ?? filaSeleccionada.id ?? filaSeleccionada.idCtaPar;
    const partida = filaSeleccionada.partida ?? filaSeleccionada.Partida ?? filaSeleccionada.PARTIDA ?? filaSeleccionada.idPartida;
    const gestion = filaSeleccionada.gestion ?? filaSeleccionada.Gestion ?? filaSeleccionada.GESTION;

    setModoFormulario("editar");
    setIdEditar(codigo);
    setFormulario({
      codcont: codigo ?? "",
      partida: partida ?? "",
      gestion: gestion ?? "",
    });
    setMostrarFormulario(true);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (formulario.codcont === "" || formulario.partida === "") {
      alert("Ingrese el código y la partida");
      return;
    }

    // Enviamos el payload con las variantes normales y de mayúsculas por si acaso
    const payload = {
      codcont: toNumber(formulario.codcont),
      CodCont: toNumber(formulario.codcont),
      partida: toNumber(formulario.partida),
      Partida: toNumber(formulario.partida),
      gestion: toNumber(formulario.gestion),
      Gestion: toNumber(formulario.gestion),
    };

    try {
      if (modoFormulario === "nuevo") {
        await guardarCtaPar(payload);
      } else {
        await actualizarCtaPar(idEditar, payload);
      }
      setMostrarFormulario(false);
      setFormulario(estadoInicial);
      setIdEditar(null);
      setFilaSeleccionada(null);
      cargarDatos();
    } catch (error) {
      alert("Ocurrió un error al guardar");
    }
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    setFormulario(estadoInicial);
    setIdEditar(null);
  };

  const eliminarSeleccionado = () => {
    if (filaSeleccionada === null) {
      alert("Seleccione un registro para eliminar");
      return;
    }
    setMostrarEliminar(true);
  };

  const confirmarEliminar = async () => {
    try {
      const codigo = filaSeleccionada.codcont ?? filaSeleccionada.CodCont ?? filaSeleccionada.id ?? filaSeleccionada.idCtaPar;
      await eliminarCtaPar(codigo);
      setMostrarEliminar(false);
      setFilaSeleccionada(null);
      cargarDatos();
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const cancelarEliminar = () => {
    setMostrarEliminar(false);
  };

  const seleccionar = () => {
    if (filaSeleccionada === null) {
      alert("Seleccione un registro de la tabla");
      return;
    }
    const codigo = filaSeleccionada.codcont ?? filaSeleccionada.CodCont ?? filaSeleccionada.id ?? filaSeleccionada.idCtaPar;
    const partida = filaSeleccionada.partida ?? filaSeleccionada.Partida ?? filaSeleccionada.PARTIDA ?? filaSeleccionada.idPartida;
    alert(`Seleccionado: Codcont ${codigo} - Partida ${partida}`);
  };

  const salir = () => {
    window.history.back();
  };

  return (
    <div className="ctapar-page">
      <div className="ctapar-panel">
        <div className="ctapar-header">ADMINISTRACIÓN DE CTA PAR</div>

        <div className="ctapar-busqueda">
          <input
            type="number"
            placeholder="Buscar por código"
            value={idBuscar}
            onChange={(e) => setIdBuscar(e.target.value)}
          />
          <button type="button" onClick={buscarPorId}>
            Buscar
          </button>
          <button type="button" onClick={cargarDatos}>
            Mostrar todos
          </button>
        </div>

        <div className="tabla-contenedor">
          <table className="ctapar-tabla">
            <thead>
              <tr>
                <th>Codcont</th>
                <th>Partida</th>
                <th>Gestion</th>
              </tr>
            </thead>
            <tbody>
              {listaCtaPar.length > 0 ? (
                listaCtaPar.map((item, index) => {
                  // Mapeo ultra-seguro contra inconsistencias de nombres en el Backend
                  const codigo = item.codcont ?? item.CodCont ?? item.id ?? item.idCtaPar;
                  
                  // Escudo de variantes para asegurar que "Partida" no se quede en blanco
                  const partida = item.partida ?? item.Partida ?? item.PARTIDA ?? item.idPartida;
                  
                  const gestion = item.gestion ?? item.Gestion ?? item.GESTION;
                  
                  // Mapeo seguro para el registro seleccionado en memoria
                  const idSeleccionado = filaSeleccionada?.codcont ?? filaSeleccionada?.CodCont ?? filaSeleccionada?.id ?? filaSeleccionada?.idCtaPar;

                  // Comparación robusta
                  const estaSeleccionado = idSeleccionado !== undefined && idSeleccionado !== null && codigo !== undefined && codigo !== null
                    ? String(idSeleccionado) === String(codigo)
                    : false;

                  return (
                    <tr
                      key={`${codigo}-${index}`}
                      onClick={() => seleccionarFila(item)}
                      style={{ cursor: 'pointer' }}
                      className={estaSeleccionado ? "fila-seleccionada" : ""}
                    >
                      <td>{codigo}</td>
                      <td>{partida}</td>
                      <td>{gestion}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">No hay registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="botones-panel">
          <button type="button" onClick={nuevo}>Nuevo</button>
          <button type="button" onClick={editarSeleccionado}>Editar</button>
          <button type="button" onClick={eliminarSeleccionado}>Eliminar</button>
          <button type="button" onClick={seleccionar}>Seleccionar</button>
          <button type="button" onClick={salir}>Salir</button>
        </div>
      </div>

      {/* Modal Formulario */}
      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">
              {modoFormulario === "nuevo" ? "NUEVO REGISTRO" : "EDITAR REGISTRO"}
            </div>
            <form onSubmit={guardar} className="modal-formulario">
              <label>Codcont:</label>
              <input
                type="number"
                name="codcont"
                value={formulario.codcont}
                onChange={actualizarCampo}
                disabled={modoFormulario === "editar"}
                autoFocus
                required
              />

              <label>Partida:</label>
              <input
                type="number"
                name="partida"
                value={formulario.partida}
                onChange={actualizarCampo}
                required
              />

              <label>Gestión:</label>
              <input
                type="number"
                name="gestion"
                value={formulario.gestion}
                onChange={actualizarCampo}
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

      {/* Modal Eliminar */}
      {mostrarEliminar && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">ELIMINAR REGISTRO</div>
            <p className="modal-texto">
              ¿Seguro que desea eliminar el registro con Codcont{" "}
              <b>{filaSeleccionada?.codcont ?? filaSeleccionada?.CodCont ?? filaSeleccionada?.id ?? filaSeleccionada?.idCtaPar}</b>?
            </p>
            <div className="modal-botones">
              <button type="button" onClick={confirmarEliminar}>
                Sí, eliminar
              </button>
              <button type="button" onClick={cancelarEliminar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CtaPar;