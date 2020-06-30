import React, { Component } from "react";
import "./Styles.css";

class PetInfo extends Component {
    state = {
        dogUuid: "",
        dogName: "",
        dogPhoto: null,
        dogDescription: "",
        ownerName: "",
        contactMediums: []
    };

    componentDidMount() {
        this.setState({
            dogUuid: "",
            dogName: "Chocoperro",
            dogPhoto: null,
            dogDescription: "Descripcion",
            ownerName: "Chocoperro Owner",
            contactMediums: [
                {type: "Teléfono", value: "2614785498"},
                {type: "Dirección", value: "San Martín 234, Godoy Cruz, Mendoza, Argentina" },
                {type: "Instagram", value: "www.instagram.com/chocoperro.owner" },
                {type: "Facebook", value: "www.facebook.com/chocoperro.owner" },
                {type: "Twitter", value: "www.twitter.com/chocoperro.owner" },
                {type: "Email", value: "chocoperro.owner@gmail.com" },
                {type: "Teléfono", value: "2614487956" }
            ]
        });
    }

/* DAFAK THIS DOESN'T WORK MAN
    getPhoneNumber = () => {
        var cm = this.state.contactMediums.find(contactMedium => {return contactMedium.type==="Tel";});
        return cm.type;
    }*/

    renderCallButton = () => {
        let cm = this.state.contactMediums.filter(contactMedium => {return contactMedium.type==="Teléfono";});
        if (cm.length>0){
            return (
                <a href={'tel:' + cm[0].value}>
                    <div style={{backgroundColor:"rgb(250,246,151)"}}
                         className="pet-bar-button border-top border-dark border-right">
                        <img height="30px"
                             width="auto"
                             className=""
                             src={require("./icons/phone-icon.png")}
                             alt="Phone icon"
                        />
                        <p>
                            Llamar
                        </p>
                    </div>
                </a>)
        } else {
            return (
                <div style={{backgroundColor:"lightgray"}}
                     className="pet-bar-button border-top border-dark border-right">
                    <img height="30px"
                         width="auto"
                         className=""
                         src={require("./icons/phone-icon.png")}
                         alt="Phone icon"
                    />
                    <p>
                        Llamar
                    </p>
                </div>);
        }
    }

    renderLocationButton = () => {
        let cm = this.state.contactMediums.filter(contactMedium => {return contactMedium.type==="Dirección";});
        if (cm.length>0){
            return (
                <a href={'https://maps.google.com/maps?q=' + cm[0].value}>
                    <div style={{backgroundColor:"rgb(250,246,151)"}}
                         className="pet-bar-button border-top border-dark">
                        <img height="30px"
                             width="auto"
                             className="pet-bar-button-icon"
                             src={require("./icons/location-icon.png")}
                             alt="Location icon"
                        />
                        <p>
                            Localizar
                        </p>
                    </div>
                </a>);
        } else {
        return (
            <div style={{backgroundColor:"lightgray"}}
                 className="pet-bar-button border-top border-dark">
                <img height="30px"
                     width="auto"
                     className=""
                     src={require("./icons/location-icon.png")}
                     alt="Location icon"/>
                <p>
                    Localizar
                </p>
            </div>);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="card-container">
                    <div className="card border-dark bg-light mb-3 responsive">
                        <div className="card-header border-bottom border-dark">
                            <div className="pet-image-container float-left">
                                <img className="pet-image"
                                     src={require("./perro.jpg")}
                                     alt={"Perro"}/>
                            </div>
                            <div className="pet-name-container d-flex align-content-center justify-content-center">
                                <h5>
                                    {this.state.dogName}
                                </h5>
                            </div>
                            <div id="pet-button-bar">
                                {this.renderCallButton()}
                                {this.renderLocationButton()}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-division">
                                <p>
                                    {this.state.dogDescription}
                                </p>
                            </div>
                            <div className="card-division">
                                <img height="50px"
                                     className=""
                                     src={require("./icons/phone-icon.png")}
                                     alt="Phone icon"
                                />
                                <div className="">
                                    {this.state.contactMediums.filter(cm => {return cm.type === "Teléfono";})
                                                              .map(cm => {return (<p className="">{cm.value}</p>);})}
                                </div>
                            </div>
                                {this.state.contactMediums.filter(cm => {return cm.type === "Dirección";})
                                                          .map(cm => {return (
                                                              <div className="card-division">
                                                                  <img height="50px"
                                                                       className=""
                                                                       src={require("./icons/location-icon.png")}
                                                                       alt="Location icon"
                                                                  />
                                                                  <p className="">
                                                                      {cm.value}
                                                                  </p>
                                                              </div>
                                                          );})}
                            <div className="card-division contact-medium-logo-module">
                                {this.state.contactMediums.filter(cm => {return cm.type === "Facebook" || cm.type === "Instagram" || cm.type === "Twitter";})
                                                          .map(cm => {return (
                                                              <div className="contact-medium-logo-container">
                                                                  <a href={"http://" + cm.value}>
                                                                  <img src={require("./logos/"+cm.type.toLowerCase()+"-logo.png")}
                                                                       alt={cm.type + " logo"}
                                                                       className="contact-medium-logo w-100 h-100"/>
                                                                  </a>
                                                              </div>
                                                          );})}
                                {this.state.contactMediums.filter(cm => {return cm.type === "Email";})
                                                          .map(cm => {return (
                                                              <div className="contact-medium-logo-container">
                                                                  <a href={"mailto:" + cm.value}>
                                                                      <img src={require("./logos/"+cm.type.toLowerCase()+"-logo.png")}
                                                                           alt={cm.type + " logo"}
                                                                           className="contact-medium-logo w-100 h-100"
                                                                      />
                                                                  </a>
                                                               </div>
                                                          );})}
                            </div>
                            <div className="card-footer">
                                <img src={require("./logos/petitami-logo.png")}
                                     alt="Petit Ami logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    Footer
                </footer>
            </React.Fragment>
        );
    }
}

export default PetInfo;
