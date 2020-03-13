import React, { Component } from "react";
import "./Styles.css";

class DogForm extends Component {
  state = {
    name: "",
    photo: "",
    ownarName: "",
    ownerId: "",
    contactMedium: [
      {
        type: "",
        value: ""
      }
    ]
  };

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <header className="header">Header</header>

        <div className="div reponsive" id="form">
          <label className="titulo">Formulario de Ingreso de Perros</label>
          <br />
          <label className="campos" id="name">
            Nombre del perro:
          </label>{" "}
          <input type="text"></input>
          <br />
          <label className="campos" id="photo">
            Foto del perro:
          </label>{" "}
          <input classname="" type="file"></input>
          <br />
          <label className="campos" id="ownerName">
            Nombre del dueño:
          </label>{" "}
          <input type="text"></input>
          <br />
          <label className="campos" id="ownerId">
            Dni del dueño:
          </label>{" "}
          <input type="text"></input>
          <ul>
            Medios de Contacto
            <li>
              <label className="campos">Tipo:</label>{" "}
              <select classname="campos" id="type">
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="Telefono">Telefono</option>
              </select>
              <label className="campos">Contacto:</label>{" "}
              <input type="text" id="value"></input> <br />
              <button></button>
            </li>
          </ul>
          <button onClick={() => this.SendFormData()} className="boton">
            Guardar
          </button>
        </div>

        <footer className="footer">Footer</footer>
      </React.Fragment>
    );
  }

  SendFormData() {
    return alert("b");
    //const data = new FormData(document.getElementById('form'));
    //fetch('httpapi/v1/dog')
  }
}

export default DogForm;
