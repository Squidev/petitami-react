import React, { Component } from "react";
import "./Styles.css";

class DogInfo extends Component {
  state = {
    dogName: "",
    ownerName: "",
    contactMediums: [],
  };

  componentDidMount() {
    this.setState({
      dogImage: "",
      dogName: "Perro",
      dogDescription: "Descripcion",
      ownerDirection: "Direccion",
      ownerName: "Nombre del Dueño",
      contactMediums: [{ contactMediumName: "Tel", value: "2614785498"}]
    });
  }

  render() {
    return (
      <React.Fragment>
        <header className="header">Header</header>

        <div className="div responsive">
          <div className="yellow">
            <div className="leftfloat">
              {" "}
              <div className="imageContainer">
                <img
                  //width="304"
                  //height="236"
                  //class="img-circle"
                  className="imageResponsive"
                  src={require("./perro.jpg")}
                  alt={"Perro"}
                />{" "}
              </div>
              <br />
            </div>
            <br />
            <label className="titulo"> {this.state.dogName}</label>
            <br />
            <br />
            <br />
          </div>
          <br />
          <br />
          <label className="campos">{this.state.dogDescription}</label>
          <hr></hr>
          <label className="campos">{this.state.ownerName}</label>
          <hr></hr>
          <label className="campos">{this.state.ownerDirection}</label>
          <hr></hr>
          <ul>
            {this.state.contactMediums.map((contactMedium) => (
              <li>
                {contactMedium.contactMediumName} : {contactMedium.value}
              </li>
            ))}
          </ul>
          <hr></hr>
          <a href="https://www.instagram.com">
            <span class="fa fa-instagram"></span>
          </a>
          <a href="https://www.facebook.com">
            <span class="fa fa-facebook"></span>
          </a>
          <a href="">
            <span class="fa fa-google"></span>
          </a>
        </div>
        <footer className="footer">Footer</footer>
      </React.Fragment>
    );
  }
}

export default DogInfo;
