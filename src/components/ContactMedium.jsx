import React, { Component } from "react";

class ContactMedium extends Component {

  render() {
    const {contactMediumName, contactMediumValue, contactMediumIndex, saveContact, removeContact} = this.props;

    return (
      <div>
        {this.props.children}
        <li>
          <label className="campos">Index:</label>{" "}
          <label className="campos">{contactMediumIndex}</label>{" "}
          <label className="campos">Tipo:</label>{" "}
          <label className="campos">{contactMediumName}</label>
          <label className="campos">Contacto:</label>{" "}
          <input
            value={contactMediumValue}
            onBlur={() => saveContact()}
          ></input>{" "}
          <button onClick={() => removeContact(contactMediumIndex)}>-</button> <br />
        </li>
      </div>
    );
  }
}

export default ContactMedium;
