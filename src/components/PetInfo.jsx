import React, {Component, createRef} from "react";
import "./Styles.css";
import ModalCallLocate from "./modals/ModalCallLocate";
import petAvatar from "./icons/pet-avatar.png";

class PetInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            photo: "",
            description: "",
            ownerId: 0,
            contactMediums: []
        };
        this.modalCallLocate = createRef();
        //this.API_URL = "http://localhost:8080";
        this.API_URL = "https://petitami.herokuapp.com";
    }


    componentDidMount() {
        this.fetchPet();

        /*MockupState
        this.setState({
            name: "Chocoperro",
            photo: null,
            description: "Descripción",
            contactMediums: [
                {type: "Teléfono", value: "2614785498"},
                {type: "Dirección", value: "San Martín 234, Godoy Cruz, Mendoza, Argentina" },
                {type: "Instagram", value: "www.instagram.com/chocoperro.owner" },
                {type: "Facebook", value: "www.facebook.com/chocoperro.owner" },
                {type: "Twitter", value: "www.twitter.com/chocoperro.owner" },
                {type: "Email", value: "chocoperro.owner@gmail.com" },
                {type: "Teléfono", value: "2614487956" }
            ]
        });*/
    }

/* DAFAK THIS DOESN'T WORK MAN
    getPhoneNumber = () => {
        var cm = this.state.contactMediums.find(contactMedium => {return contactMedium.type==="Tel";});
        return cm.type;
    }*/

    fetchPet = () => {
        fetch(this.API_URL + "/api/v1/pet/uuid/" + this.props.match.params.uuid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(responsePet => {
                        console.log("Success:", responsePet);
                        this.setState({
                            name: responsePet.name,
                            photo: responsePet.photo,
                            description: responsePet.description,
                            ownerId: responsePet.ownerId
                        });
                        this.fetchContactMediums(responsePet.ownerId);
                    })
                } else {
                    response.json().then(apiError => {
                        console.log("Error:", apiError);
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    fetchContactMediums = (ownerId) => {
        fetch(this.API_URL + "/api/v1/contactmedium/owner/" + ownerId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(responseContactMediums => {
                        console.log("Success:", responseContactMediums);
                        this.setState({
                            contactMediums: responseContactMediums
                        });
                    });
                } else {
                    response.json().then(apiError => {
                        console.log("Error:", apiError);
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    openModalCallLocate = (contactMediums) => {
        if (this.modalCallLocate) this.modalCallLocate.current.openModal(contactMediums);
    }

    renderCallButton = () => {
        let phones = this.state.contactMediums.filter(contactMedium => {return contactMedium.type==="Teléfono";});
        if (phones.length>0){
            return (
                <div style={{backgroundColor:"rgb(250,246,151)"}}
                     className="pet-bar-button enabled-button border-top border-dark border-right"
                     onClick={() => this.openModalCallLocate(phones)}>
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
            )
        } else {
            return (
                <div style={{backgroundColor:"lightgray"}}
                     className="pet-bar-button disabled-button border-top border-dark border-right">
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
        let locations = this.state.contactMediums.filter(contactMedium => {return contactMedium.type==="Dirección";});
        if (locations.length>0){
            return (
                <div style={{backgroundColor:"rgb(250,246,151)"}}
                     className="pet-bar-button enabled-button border-top border-dark"
                     onClick={() => this.openModalCallLocate(locations)}>
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
            );
        } else {
        return (
            <div style={{backgroundColor:"lightgray"}}
                 className="pet-bar-button disabled-button border-top border-dark">
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

    renderDescriptionSection = () => {
        if (this.state.description.length === 0) {
            return null;
        } else {
            return (
                <div className="card-division">
                    <p>
                        {this.state.description}
                    </p>
                </div>
            );
        }
    }

    renderPhoneSection = () => {
        let phones = this.state.contactMediums.filter(cm => cm.type === "Teléfono");
        if (phones.length === 0) {
            return null;
        } else {
            return (
                <div className="card-division">
                    <img height="50px"
                         className=""
                         src={require("./icons/phone-icon.png")}
                         alt="Phone icon"
                    />
                    <div className="text-left">
                        {phones.map(cm => {return (
                            <p className="">
                                {cm.value}
                            </p>
                        );})}
                    </div>
                </div>
            );
        }
    }

    renderAddressSection = () => {
        let addresses = this.state.contactMediums.filter(cm => {return cm.type === "Dirección";});
        if (addresses.length === 0) {
            return null;
        } else {
            return (
                <div className="card-division">
                    <img height="50px"
                         className=""
                         src={require("./icons/location-icon.png")}
                         alt="Location icon"
                    />
                    <div className="text-left">
                        {addresses.map(cm => {return (
                            <p className="">
                                {cm.value}
                            </p>
                        );})}
                    </div>
                </div>
            );
        }
    }

    renderSocialMediaSection = () => {
        let socialMedia = this.state.contactMediums.filter(cm => {
            return cm.type !== "Dirección" && cm.type !== "Teléfono";
        });
        if (socialMedia.length === 0) {
            return null;
        } else {
            return (
                <div className="card-division contact-medium-logo-module">
                    {socialMedia.filter(cm => {
                        return cm.type === "Facebook" || cm.type === "Instagram" || cm.type === "Twitter" || cm.type === "Otro";
                    })
                        .map(cm => {
                            return (
                                <div className="contact-medium-logo-container">
                                    <a href={"http://" + cm.value}>
                                        <img src={require("./logos/"+cm.type.toLowerCase()+"-logo.png")}
                                             alt={cm.type + " logo"}
                                             className="contact-medium-logo w-100 h-100"/>
                                    </a>
                                </div>
                        );})
                    }
                    {socialMedia.filter(cm => {
                        return cm.type === "Email";
                    })
                        .map(cm => {
                            return (
                                <div className="contact-medium-logo-container">
                                    <a href={"mailto:" + cm.value}>
                                        <img src={require("./logos/"+cm.type.toLowerCase()+"-logo.png")}
                                             alt={cm.type + " logo"}
                                             className="contact-medium-logo w-100 h-100"
                                        />
                                    </a>
                                </div>
                        );})
                    }
                </div>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="card-backdrop">
                    <div className="card-container">
                        <div className="card border-dark bg-light">
                            <div className="card-header border-bottom border-dark">
                                <div className="pet-image-container float-left">
                                    <img className="pet-image"
                                         src={this.state.photo === "" ? petAvatar : this.state.photo}
                                         alt="Pet photo"/>
                                </div>
                                <div className="pet-name-container d-flex align-content-center justify-content-center">
                                    <p>
                                        {this.state.name}
                                    </p>
                                </div>
                                <div id="pet-button-bar">
                                    {this.renderCallButton()}
                                    {this.renderLocationButton()}
                                </div>
                            </div>
                            <div className="card-body">
                                {this.renderDescriptionSection()}
                                {this.renderPhoneSection()}
                                {this.renderAddressSection()}
                                {this.renderSocialMediaSection()}
                                <div className="card-footer">
                                    <img src={require("./logos/petitami-logo.png")}
                                         alt="Petit Ami logo"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalCallLocate ref={this.modalCallLocate} />
            </React.Fragment>
        );
    }
}

export default PetInfo;
