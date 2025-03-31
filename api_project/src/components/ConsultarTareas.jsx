import { useState, useEffect } from "react";
import "../assets/css/ConsultarTareas.css";
import axios from "axios";

function ConsultarTareas() {
  const [opcion, setOpcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [personaId, setPersonaId] = useState("");

  const filtrarPorPersona = () => {
    if (!personaId) {
      alert("Por favor, selecciona una persona");
      return;
    }

    axios.get(`http://localhost:3001/consultar-tareas/persona/${personaId}`)
      .then(response => setTareas(response.data))
      .catch(err => console.error("Error al obtener tareas por persona:", err));;
  };

  const filtrarFecha = () => {
    if (!fecha) {
      alert("Por favor, selecciona una fecha");
      return;
    }
    axios
      .get(`http://localhost:3001/consultar-tareas/${fecha}`)
      .then((response) => setTareas(response.data))
      .catch((err) => console.error("Error al obtener tareas:", err));
  };

  useEffect(() => {
    getPersonas();
  }, []);

  const getPersonas = () => {
    axios.get("http://localhost:3001/personas")
      .then(response => setUsuarios(response.data))
      .catch(err => console.error("Error obteniendo usuarios:", err));
  };


  const filtrarPorRango = () => {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor, selecciona ambas fechas");
      return;
    }

    axios.get(`http://localhost:3001/consultar-tareas/rango/${fechaInicio}/${fechaFin}`)
      .then(response => setTareas(response.data))
      .catch(err => console.error("Error al obtener tareas:", err));
  };

  return (
    <>
      <h1>Consulta de Tareas</h1>
      <div className="input-opciones">
        <select name="opciones" onChange={(e) => setOpcion(e.target.value)}>
          <option value="">Seleccione una opción</option>
          <option value="fecha">Búsqueda por Fecha</option>
          <option value="rango">Búsqueda por Rango</option>
          <option value="persona">Búsqueda por Persona</option>
        </select>
      </div>

      {opcion === "fecha" && (
        <div className="filtro">
          <h3>Buscar por Fecha</h3>
          <input type="date" onChange={(e) => setFecha(e.target.value)} />
          <button onClick={filtrarFecha}>Buscar</button>

          {/* 🔹 Mostrar resultados */}
          {tareas.length > 0 && (
            <div className="contenedor-tareas">
              <h2>Lista de Tareas</h2>
              <ul>
                {tareas.map((tarea) => (
                  <li key={tarea._id} className="lista-tareas">
                    <div className="lista-tarea-titulo">
                      <span>
                        <b>Titulo: </b>
                        {tarea.titulo}
                      </span>
                    </div>
                    <div className="lista-tarea-descripcion">
                      <span>
                        <b>Descripcion: </b><br />
                        {tarea.descripcion}
                      </span>
                    </div>
                    <div className="lista-tarea-fecha">
                      <span>
                        <b>Fecha: </b> <br />
                        {new Date(tarea.fecha.split("T")[0] + "T00:00:00").toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="lista-tarea-persona">
                      <span>
                        <b>Persona: </b>{usuarios.find(usuario => usuario._id === tarea.persona)?.nombre || "Desconocido"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          )}
        </div>
      )}

      {opcion === "rango" && (
        <div className="filtro">
          <h3>Buscar por Rango de Fechas</h3>
          <input type="date" onChange={(e) => setFechaInicio(e.target.value)} />
          <input type="date" onChange={(e) => setFechaFin(e.target.value)} />
          <button onClick={filtrarPorRango}>Buscar</button>

          {/* 🔹 Mostrar resultados */}
          {tareas.length > 0 && (
            <div className="contenedor-tareas">
              <h2>Lista de Tareas</h2>
              <ul>
                {tareas.map((tarea) => (
                  <li key={tarea._id} className="lista-tareas">
                    <div className="lista-tarea-titulo">
                      <span>
                        <b>Titulo: </b>{tarea.titulo}
                      </span>
                    </div>
                    <div className="lista-tarea-descripcion">
                      <span>
                        <b>Descripcion: </b><br />
                        {tarea.descripcion}
                      </span>
                    </div>
                    <div className="lista-tarea-fecha">
                      <span>
                        <b>Fecha: </b> <br />
                        {new Date(tarea.fecha.split("T")[0] + "T00:00:00").toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="lista-tarea-persona">
                      <span>
                        <b>Persona: </b>{usuarios.find(usuario => usuario._id === tarea.persona)?.nombre || "Desconocido"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {opcion === "persona" && (
        <div className="filtro">
          <h3>Buscar por Persona</h3>
          <select onChange={(e) => setPersonaId(e.target.value)}>
            <option value="">Seleccione una persona</option>
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nombre} - {usuario.documento}
              </option>
            ))}
          </select>
          <button onClick={filtrarPorPersona}>Buscar</button>

          {/* 🔹 Mostrar resultados */}
          {tareas.length > 0 && (
            <div className="contenedor-tareas">
              <h2>Lista de Tareas</h2>
              <ul>
                {tareas.map((tarea) => (
                  <li key={tarea._id} className="lista-tareas">
                    <div className="lista-tarea-titulo">
                      <span>
                        <b>Titulo: </b>{tarea.titulo}
                      </span>
                    </div>
                    <div className="lista-tarea-descripcion">
                      <span>
                        <b>Descripcion: </b><br />
                        {tarea.descripcion}
                      </span>
                    </div>
                    <div className="lista-tarea-fecha">
                      <span>
                        <b>Fecha: </b> <br />
                        {new Date(tarea.fecha.split("T")[0] + "T00:00:00").toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="lista-tarea-persona">
                      <span>
                        <b>Persona: </b>{usuarios.find(usuario => usuario._id === tarea.persona)?.nombre || "Desconocido"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

    </>
  );
}

export default ConsultarTareas;