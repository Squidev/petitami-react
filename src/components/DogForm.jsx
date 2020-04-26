import React, { Component } from "react";
import "./Styles.css";
import ContactMedium from "./ContactMedium";

class DogForm extends Component {
  state = {
    dogId: "",
    dogName: "",
    photo: "",
    ownerName: "",
    ownerId: "",
    ownerDni: "",
    contactMediums: [
      {
        contactMediumId: "",
        contactMediumName: "",
        contactMediumValue: ""
      }
    ]
  };

  componentDidMount() {
    //Llamada AJAX
    var initialState = {
      dogId: 34,
      dogName: "Chocoperro",
      photo: "",
      ownerName: "Chocoperro Owner",
      ownerId: 21,
      ownerDni: 50235123,
      contactMediums: [
        {
          contactMediumId: 53,
          contactMediumName: "Facebook",
          contactMediumValue: "www.facebook.com/ChocoperroOwner"
        },
        {
          contactMediumId: 56,
          contactMediumName: "Instagram",
          contactMediumValue: "www.instagram.com/ChocoperroOwner"
        },
        {
          contactMediumId: 58,
          contactMediumName: "Telefono",
          contactMediumValue: "2616134800"
        }
      ]
    };
    this.setState(initialState);
  }

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
          <input className="" type="file"></input>
          <br />
          <label className="campos" id="ownerId">
            Dni del dueño:
          </label>{" "}
          <input type="text" onBlur={() => this.CheckOwner()}></input>
          <br />
          <label className="campos" id="ownerName">
            Nombre del dueño:
          </label>{" "}
          <input type="text"></input>
          <ul>
            Medios de Contacto
            {this.state.contactMediums.filter(c => c.contactMediumValue !== "").map(contactMedium => (
              <ContactMedium
                contactMediumId={contactMedium.contactMediumId}
                contactMediumName={contactMedium.contactMediumName}
                contactMediumValue={contactMedium.contactMediumValue}
                contactMediumIndex={this.state.contactMediums.indexOf(
                  contactMedium
                )}
                saveContact={this.saveContact}
                removeContact={this.removeContact}
              ></ContactMedium>
            ))}
            {this.state.contactMediums
              .filter(c => c.contactMediumValue === "")
              .map(c => (
                <li>
                  <label className="campos">Index:</label>{" "}
                  <label className="campos">{this.state.contactMediums.indexOf(c)}</label>{" "}
                  <label className="campos">Tipo:</label>{" "}
                  <select id="type"
                    required
                    className="campos"
                    onChange={() => this.saveType(this.state.contactMediums.indexOf(c))}
                  >
                    <option value="" disabled selected hidden>
                      Elegir...
                    </option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Telefono">Telefono</option>
                  </select>
                  <label className="campos">Contacto:</label>{" "}
                  <input id="contact" value={this.state.contactMediums.contactMediumValue} onBlur={() => this.saveContact(this.state.contactMediums.indexOf(c))}></input>{" "}
                </li>
              ))}
              <br/>
            <button onClick={() => this.addContact()}>Agregar Contacto</button>
          </ul>
          <button onClick={() => this.sendFormData()} className="boton">
            Guardar
          </button>
        </div>

        <footer className="footer">Footer</footer>
      </React.Fragment>
    );
  }

  addContact() {
    const contactMedium = {
      contactMediumId: 0,
      contactMediumName: "",
      contactMediumValue: ""
    };
    const contacts = [...this.state.contactMediums];
    contacts.push(contactMedium);
    this.setState({ contactMediums: contacts });
  }

  saveContact = (contactMediumIndex) => {
    const contacts = [...this.state.contactMediums];
    contacts[contactMediumIndex].contactMediumValue = "???????";
    this.setState( {contactMediums: contacts });
  }

  saveType = (contactMediumIndex) => {
    const contacts = [...this.state.contactMediums];
    contacts[contactMediumIndex].contactMediumName = "??????";
    this.setState( {contactMediums: contacts });
  }

  removeContact = contactMediumIndex => {
    const contacts = [...this.state.contactMediums];
    const index = contactMediumIndex;
    contacts.splice(index, contactMediumIndex);
    this.setState({ contactMediums: contacts });
  };

  CheckOwner() {}

  sendFormData() {
    /*fetch('',{
      method:'POST',
      body: JSON.stringify(this.state)
    })*/
  }
}

export default DogForm;
