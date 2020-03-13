import React, { Component } from "react";
import "./Styles.css";

class DogInfo extends Component {
  state = {
    dogName: "",
    ownerName: "",
    contactMediums: []
  };

  componentDidMount() {
    this.setState({
      dogName: "Chocoperro",
      ownerName: "Chocoperro Owner",
      contactMediums: [
        {
          contactMediumName: "Facebook",
          value: "www.facebook.com/ChocoperroOwner"
        },
        {
          contactMediumName: "Instagram",
          value: "www.instagram.com/ChocoperroOwner"
        },
        { contactMediumName: "Tel", value: "2614785498" }
      ]
    });
  }

  render() {
    return (
      <React.Fragment>
        <header className="header">Header</header>

        <div className="div responsive">
          <img src={""} alt={"Perro image"} />
          <br />
          <label>Nombre: {this.state.dogName}</label>
          <br />
          <label>Dueño: {this.state.ownerName}</label>
          <ul>
            {this.state.contactMediums.map(contactMedium => (
              <li>
                {contactMedium.contactMediumName} : {contactMedium.value}
              </li>
            ))}
          </ul>
          <a href="https://www.instagram.com">
          <span class="instagram bottomleft">
            <span class="fa fa-instagram"></span>
          </span>
          </a>
        </div>
        <footer className="footer">Footer</footer>
      </React.Fragment>
    );
  }
}

export default DogInfo;
