import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Tareas.css";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Tareas() {
  const [formVisible, setFormVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);
  const [data, setData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    persona: ""
  });
  const [nuevosDatos, setNuevosDatos] = useState({ ...data });

  useEffect(() => {
    getPersonas();
  }, []);

  const getPersonas = () => {
    axios.get("http://localhost:3001/personas")
      .then(response => setUsuarios(response.data))
      .catch(err => console.error("Error obteniendo usuarios:", err));
  };


  useEffect(() => {
    getTareas();
  }, [])

  const getTareas = () => {
    axios.get("http://localhost:3001/tareas")
      .then(response => setTareas(response.data))
      .catch(err => console.error("Error obteniendo usuarios:", err));
  };

  const showForm = () => setFormVisible(true);
  const closeForm = () => {
    setFormVisible(false);
    setTareaEditando(null);
    setNuevosDatos({ ...data });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (tareaEditando) {
      setNuevosDatos(prevData => ({ ...prevData, [name]: value }));
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const postTareas = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/tareas", data)
      .then(() => {
        setData({ titulo: "", descripcion: "", fecha: "", persona: "" });
        closeForm();
        getTareas();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEditClick = (tarea) => {
    setTareaEditando(tarea._id);
    setNuevosDatos({ ...tarea });
    setFormVisible(true);
  };

  const patchTarea = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:3001/tareas/${tareaEditando}`, nuevosDatos)
      .then(response => {
        setTareas(t => t.map(tarea =>
          tarea._id === tareaEditando ? response.data.tarea : tarea
        ));
        closeForm();
      })
      .catch(err => console.error("Error al actualizar la tarea:", err));
  };

  const deleteTarea = (id) => {
    axios.delete(`http://localhost:3001/tareas/${id}`)
      .then(() => setTareas(t => t.filter(tarea => tarea._id !== id)))
      .catch(err => console.error("Error eliminando tarea:", err));
  };

  return (
    <>
      {!formVisible && (
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
               
                <div className="lista-tarea-btn">
                  <span className="eliminar-btn" onClick={() => deleteTarea(tarea._id)} style={{ cursor: "pointer" }}>
                    <HighlightOffIcon />
                  </span>
                  <span className="actualizar-btn" onClick={() => handleEditClick(tarea)} style={{ cursor: "pointer" }}>
                    <EditIcon />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}



      {formVisible && (
        <div className="container-form">
          <div className="tareas-form">
            <form onSubmit={tareaEditando ? patchTarea : postTareas}>
              <h2>Crear Tarea</h2>
              <div className="inputs-div">
                <label htmlFor="titulo">Título</label>
                <input type="text" name="titulo" value={tareaEditando ? nuevosDatos.titulo : data.titulo} onChange={handleInput} required />
              </div>
              <div className="inputs-div">
                <label htmlFor="descripcion">Descripción</label>
                <textarea name="descripcion" value={tareaEditando ? nuevosDatos.descripcion : data.descripcion} onChange={handleInput}></textarea>
              </div>
              <div className="inputs-div">
                <label htmlFor="fecha">Fecha</label>
                <input className="input-fecha" type="date" name="fecha"
                  value={tareaEditando ? nuevosDatos.fecha : data.fecha}
                  onChange={handleInput} required
                />
              </div>
              <div className="inputs-div">
                <label htmlFor="persona">Persona asignada</label>
                <select name="persona" value={tareaEditando ? nuevosDatos.persona : data.persona} onChange={handleInput} required>
                  <option value="">Seleccione una persona</option>
                  {usuarios.map(usuario => (
                    <option key={usuario._id} value={usuario._id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="final-buttons">
                <button type="button" onClick={closeForm} className="btn-close">Cerrar</button>
                <button type="submit" className="btn-create">{tareaEditando ? "Guardar Cambios" : "Crear"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!formVisible && (
        <button className="crear-btn" onClick={showForm}>
          Crear Tarea
        </button>
      )}
    </>
  );
}

export default Tareas;