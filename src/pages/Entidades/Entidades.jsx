import './Entidades.css';

function Entidades() {

    const entidadesMock = [
        {
            entidad: 6,
            gestion: 2015,
            desc_ent: "Vicepresidencia del Estado Plurinacional",
            sigla_ent: "VPEP",
            sector_ent: 1,
            subsec_ent: 1,
            area_ent: 1,
            subareaent: 2,
            nivel_inst: 0
        },
        {
            entidad: 10,
            gestion: 2015,
            desc_ent: "Ministerio de Relaciones Exteriores",
            sigla_ent: "MIN-RREE",
            sector_ent: 1,
            subsec_ent: 1,
            area_ent: 1,
            subareaent: 2,
            nivel_inst: 0
        },
        {
            entidad: 15,
            gestion: 2015,
            desc_ent: "Ministerio de Gobierno",
            sigla_ent: "MIN-GOB",
            sector_ent: 1,
            subsec_ent: 1,
            area_ent: 1,
            subareaent: 2,
            nivel_inst: 0
        }
    ];

    return (
        <div className="pantalla-completa-entidades">
            <div className="entidades-container">
                <h1 className="entidades-title">GESTION DE ENTIDADES VSIAF</h1>

                {/* Botones de control requeridos */}
                <div className="entidades-actions">
                    <button className="btn btn-nuevo">Nuevo</button>
                    <button className="btn btn-editar">Editar</button>
                    <button className="btn btn-eliminar">Eliminar</button>
                </div>

                {/* Tabla completa con los nombres de atributos exactos de Java */}
                <div className="table-responsive">
                    <table className="entidades-table">
                        <thead>
                        <tr>
                            <th>@Id entidad</th>
                            <th>gestion</th>
                            <th>desc_ent</th>
                            <th>sigla_ent</th>
                            <th>sector_ent</th>
                            <th>subsec_ent</th>
                            <th>area_ent</th>
                            <th>subareaent</th> {/* <-- CAMBIADO */}
                            <th>nivel_inst</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entidadesMock.map((item) => (
                            <tr key={item.entidad}>
                                <td>{item.entidad}</td>
                                <td>{item.gestion}</td>
                                <td>{item.desc_ent}</td>
                                <td><span className="badge-sigla">{item.sigla_ent}</span></td>
                                <td>{item.sector_ent}</td>
                                <td>{item.subsec_ent}</td>
                                <td>{item.area_ent}</td>
                                <td>{item.subareaent}</td>
                                <td>{item.nivel_inst}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Entidades;

