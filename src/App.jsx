import { useState } from "react";
import "./App.css";

import Login from "./pages/Login/Login";
import UnidadAdmin from "./pages/UnidadAdmin/UnidadAdmin";
import Estado from "./pages/Estado/Estado";
import Mes from "./pages/Mes/Mes";
import Entidades from "./pages/Entidades/Entidades";
import ObjGasto from "./pages/ObjGasto/ObjGasto";
import CtaPar from "./pages/CtaPar/CtaPar";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [paginaActual, setPaginaActual] = useState("estado");

  const mostrarPagina = () => {
    if (paginaActual === "entidades") return <Entidades />;
    if (paginaActual === "estado") return <Estado />;
    if (paginaActual === "mes") return <Mes />;
    if (paginaActual === "objgasto") return <ObjGasto />;
    if (paginaActual === "unidadadmin") return <UnidadAdmin />;
    if (paginaActual === "ctapar") return <CtaPar />;
    return <Entidades />;
  };

  if (!logueado) {
    return <Login onLogin={() => setLogueado(true)} />;
  }

  return (
    <div className="vsiaf-container">
      <div className="vsiaf-card">
        <header className="vsiaf-header">
          <img
            src="/img/logo-fuerza.png"
            alt="Logo Fuerza"
            className="logo-fuerza"
          />

          <div className="vsiaf-logo">
            <div className="bandera"></div>
            <div>
              <h1>V.S.I.A.F</h1>
              <p>Sistema de Activos Fijos</p>
            </div>
          </div>
        </header>



        <div className="vsiaf-body">
          <aside className="vsiaf-menu">
            <h3>MENU PRINCIPAL</h3>

            <button onClick={() => setPaginaActual("entidades")}>
              Entidades
            </button>

            <button onClick={() => setPaginaActual("estado")}>
              Estado
            </button>

            <button onClick={() => setPaginaActual("mes")}>
              Mes
            </button>

            <button onClick={() => setPaginaActual("objgasto")}>
              Objeto de Gasto
            </button>

            <button onClick={() => setPaginaActual("unidadadmin")}>
              Unidad Admin
            </button>
            <button onClick={() => setPaginaActual("ctapar")}>
              Cta Par
            </button>
            <div className="vsiaf-info">

                      <button
                        className="btn-cerrar-sesion"
                        onClick={() => setLogueado(false)}
                      >
                        Cerrar sesión
                      </button>
                    </div>
          </aside>

          <main className="vsiaf-content">{mostrarPagina()}</main>
        </div>
      </div>
    </div>
  );
}

export default App;