import { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "../assets/css/Personas.css";

function Personas() {
  //MOSTRAR/OCULTAR FORM
  const [formVisible, setFormVisible] = useState(false);
  //ESTADO DE USUARIOS
  const [usuarios, setUsuarios] = useState([]);
  //ESTADO DE USUARIO PARA ACTUALIZAR
  const [personaEditando, setPersonaEditando] = useState(null);
  //DEFINIR ARREGLO PARA EL POST
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    email: "",
    activo: false
  });
  const [nuevosDatos, setNuevosDatos] = useState({ ...data });

  //METODOS PARA MOSTRAR Y OCULTAR VENTANAS
  const showForm = () => setFormVisible(true);
  const closeForm = () => {
    setFormVisible(false);
    setPersonaEditando(null);
    setNuevosDatos({ ...data }); // Limpiar formulario
  };

  //GET USUSARIOS
  useEffect(() => {
    getPersonas();
  }, []);

  const getPersonas = () => {
    axios.get('http://localhost:3001/personas')
      .then(response => setUsuarios(response.data))
      .catch(err => console.error("Error obteniendo usuarios:", err));
  };

 //RECIBIR LOS DATOS DEL INPUT
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    if (personaEditando) {
      setNuevosDatos({
        ...nuevosDatos,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      setData({
        ...data,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const postPersona = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/personas", data)
      .then(() => {
        getPersonas();
        closeForm();
      })
      .catch(err => console.error("Error creando usuario:", err));
  };

  const handleEditClick = (usuario) => {
    setPersonaEditando(usuario._id);
    setNuevosDatos({ ...usuario });
    setFormVisible(true);
  };

  const patchPersona = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:3001/personas/${personaEditando}`, nuevosDatos)
      .then(response => {
        setUsuarios(prev => prev.map(usuario =>
          usuario._id === personaEditando ? response.data.persona : usuario
        ));
        closeForm();
      })
      .catch(err => console.error("Error al actualizar usuario:", err));
  };

  const deletePersona = (id) => {
    axios.delete(`http://localhost:3001/personas/${id}`)
      .then(() => setUsuarios(prev => prev.filter(usuario => usuario._id !== id)))
      .catch(err => console.error("Error eliminando usuario:", err));
  };

  return (
    <>
      {!formVisible && (
        <div className="contenedor-personas">
          <h2>Lista de Personas</h2>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario._id} className="lista-personas">
                <div className="lista-personas-nombre">
                  <span><b>Nombre:</b> {usuario.nombre}</span>
                  <span><b>Apellido:</b>{usuario.apellido}</span>
                </div>
                <div className="lista-personas-email">
                  <span><b>Email:</b> {usuario.email}</span>
                </div>
                <div className="lista-personas-activo">
                  <span><b>Activo?:</b> {usuario.activo? "Verdadero":"Falso"}</span>
                </div>
                <div className="lista-personas-btn">
                  <span className="eliminar-btn" onClick={() => deletePersona(usuario._id)} style={{ cursor: "pointer" }}>
                    <HighlightOffIcon />
                  </span>
                  <span className="actualizar-btn" onClick={() => handleEditClick(usuario)} style={{ cursor: "pointer" }}>
                    <EditIcon />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!formVisible && (
        <button className="crear-btn" onClick={showForm}>
          Crear Persona
        </button>
      )}

      {formVisible && (
        <div className="container-form">
          <div className="personas-form">
            <form onSubmit={personaEditando ? patchPersona : postPersona}>
              <h2>{personaEditando ? "Editar Persona" : "Crear Persona"}</h2>
              <div className="inputs-div">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" value={personaEditando ? nuevosDatos.nombre : data.nombre} onChange={handleInput} required />
              </div>
              <div className="inputs-div">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" name="apellido" value={personaEditando ? nuevosDatos.apellido : data.apellido} onChange={handleInput} required />
              </div>
              <div className="inputs-div">
                <label htmlFor="documento">Documento</label>
                <input type="text" name="documento" value={personaEditando ? nuevosDatos.documento : data.documento} onChange={handleInput} required />
              </div>
              <div className="inputs-div">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={personaEditando ? nuevosDatos.email : data.email} onChange={handleInput} required />
              </div>
              <div className="input-checkbox">
                <label htmlFor="activo">Activo</label>
                <input type="checkbox" name="activo" checked={personaEditando ? nuevosDatos.activo : data.activo} onChange={handleInput} />
              </div>
              <div className="final-buttons">
                <button type="button" onClick={closeForm} className="btn-close">Cerrar</button>
                <button type="submit" className="btn-create">{personaEditando ? "Guardar Cambios" : "Crear"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Personas;