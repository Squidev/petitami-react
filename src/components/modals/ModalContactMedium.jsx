import React, {Component} from "react";
import ModalAjaxRequest from "./ModalAjaxRequest";

class ModalContactMedium extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeContactMedium: {
                id: 0,
                type: "",
                value: "",
                ownerId: parseInt(this.props.ownerId)
            },
            showModal: false,
            sendingAjaxRequest: false
        };
        this.supportedTypes = [
            "Teléfono",
            "Facebook",
            "Instagram",
            "Twitter",
            "Email",
            "Dirección",
            "Otro"
        ];
        this.API_URL = "http://localhost:8080";
    }

    openModal = (contactMedium) => {
        let openState;
        if (contactMedium) {
            openState = {
                activeContactMedium: contactMedium,
                showModal: true,
                sendingAjaxRequest: false
            };
        } else {
            openState = {
                activeContactMedium: {
                    id: 0,
                    type: "",
                    value: "",
                    ownerId: parseInt(this.props.ownerId)
                },
                showModal: true,
                sendingAjaxRequest: false
            }
        }
        this.setState(openState, ()=> console.log("Show ModalContactMedium: " + this.state.showModal));
    }

    _handleClose = () => {
        let cleanState = {
            activeContactMedium:{
                id: 0,
                type: "",
                value: "",
                ownerId: 0
            },
            showModal:false,
            sendingAjaxRequest: false
        };
        this.setState(cleanState, ()=> console.log("Show ModalPet: " + this.state.showModal));
    }

    _handleSave = () => {
        this.setState({
            sendingAjaxRequest: true
        })
        console.log("activeContactMedium:", this.state.activeContactMedium);
        if (this.state.activeContactMedium.id === 0) {
            /*----------------AJAX call-----------------*/
            fetch(this.API_URL + "/api/v1/contactmedium/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.activeContactMedium)
            })
                .then(result => {
                    if (result.ok) {
                        result.json().then(responseContactMedium => {
                            console.log("Success:", responseContactMedium);
                            this.props.appendContactMediumToList(responseContactMedium);
                            this._handleClose();
                        });
                    } else {
                        result.json().then(apiError => {
                            console.log("Error:", apiError);
                            this._handleClose();
                        })
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    this._handleClose();
                });
            //alert("AJAX outgoing, boiiii");
            /*------------------------------------------*/
        } else {
            /*----------------AJAX call-----------------*/
            fetch(this.API_URL + "/api/v1/contactmedium/" + this.state.activeContactMedium.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.activeContactMedium)
            })
                .then(result => {
                    if (result.ok) {
                        result.json().then(responseContactMedium => {
                            console.log("Success:", responseContactMedium);
                            this.props.modifyContactMediumFromList(responseContactMedium);
                            this._handleClose();
                        });
                    } else {
                        result.json().then(apiError => {
                            console.log("Error:", apiError);
                            this._handleClose();
                        })
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    this._handleClose();
                });
            //alert("AJAX outgoing, boiiii");
            /*------------------------------------------*/
        }
    }

    _handleTypeChange = (event) => {
        if (event.target.value === "Dirección") {
            this.setState({
                activeContactMedium: {
                    id: this.state.activeContactMedium.id,
                    type: event.target.value,
                    value: ";;;",
                    ownerId: this.state.activeContactMedium.ownerId
                }
            }, () => {
                console.log("Type:", this.state.activeContactMedium.type);
                console.log("Value:", this.state.activeContactMedium.value)
            });
            console.log(event.target.value);
        } else {
            this.setState({
                activeContactMedium: {
                    id: this.state.activeContactMedium.id,
                    type: event.target.value,
                    value: "",
                    ownerId: this.state.activeContactMedium.ownerId
                }
            }, () => {
                console.log("Type:", this.state.activeContactMedium.type);
                console.log("Value:", this.state.activeContactMedium.value)
            });
            console.log(event.target.value);
        }
    }

    _handleValueChange = (event) => {
        this.setState({
            activeContactMedium:{
                id: this.state.activeContactMedium.id,
                type: this.state.activeContactMedium.type,
                value: event.target.value,
                ownerId: this.state.activeContactMedium.ownerId
            }
        });
        console.log(event.target.value);
    }
    _handleValueTextualAddressChange = (event) => {
        let [textualAddress, coords] = this.state.activeContactMedium.value.split(";;;");
        this.setState({
            activeContactMedium:{
                id: this.state.activeContactMedium.id,
                type: this.state.activeContactMedium.type,
                value: event.target.value + ";;;" + coords,
                ownerId: this.state.activeContactMedium.ownerId
            }
        });
        console.log(event.target.value);
    }

    _handleValueCoordsChange = (event) => {
        let [textualAddress, coords] = this.state.activeContactMedium.value.split(";;;");
        this.setState({
            activeContactMedium:{
                id: this.state.activeContactMedium.id,
                type: this.state.activeContactMedium.type,
                value: textualAddress + ";;;" + event.target.value,
                ownerId: this.state.activeContactMedium.ownerId
            }
        });
        console.log(event.target.value);
    }

    renderContactMediumValue = () => {
        //Si se trata de una dirección, trataremos al campo value como una combinación de valores "textualAddress;;;coords"
        if (this.state.activeContactMedium.type === "Dirección") {
            let [textualAddress, coords] = this.state.activeContactMedium.value.split(";;;");
            console.log("Inside renderContactMediumValue value.split:", this.state.activeContactMedium.value.split(";;;"));
            return (
                <React.Fragment>
                    <div className="form-group">
                        <label htmlFor="contact-medium-value-textual-address"
                               className="col-form-label">
                            Dirección:
                        </label>
                        <input type="text"
                               className="form-control"
                               id="contact-medium-value-textual-address"
                               value={textualAddress}
                               onChange={this._handleValueTextualAddressChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-medium-value-coords"
                               className="col-form-label">
                            Coordenadas:
                        </label>
                        <input type="text"
                               className="form-control"
                               id="contact-medium-value-coords"
                               value={coords}
                               onChange={this._handleValueCoordsChange}
                        />
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <div className="form-group">
                    <label htmlFor="contact-medium-value"
                           className="col-form-label">
                        Valor:
                    </label>
                    <input type="text"
                           className="form-control"
                           id="contact-medium-value"
                           value={this.state.activeContactMedium.value}
                           onChange={this._handleValueChange}
                    />
                </div>
            );
        }
    }

    render() {
        console.log("contactMediumId de activeContactMedium: " + this.state.activeContactMedium.id);
        console.log("contactMediumType de activeContactMedium: " + this.state.activeContactMedium.type);
        console.log("contactMediumValue de activeContactMedium: " + this.state.activeContactMedium.value);
        if (!this.state.showModal) {
            return null;
        }
        return(
            <div className="modal backdrop-style d-block"
                 id="contact-medium-modal"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel">
                                {this.state.activeContactMedium.id === 0 ? "Nuevo medio de contacto" : "Editar medio de contacto"}
                            </h5>
                            <button type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={this._handleClose}>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="contact-medium-id-number"
                                           className="col-form-label"
                                           hidden={true}>
                                        ID:
                                    </label>
                                    <input readOnly={true}
                                           type="text"
                                           className="form-control"
                                           id="contact-medium-id"
                                           value={this.state.activeContactMedium.id}
                                           hidden={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-medium-type-text"
                                           className="col-form-label">
                                        Tipo:
                                    </label>
                                    <select id="type"
                                            required
                                            className="form-control"
                                            value={this.state.activeContactMedium.type}
                                            onChange={this._handleTypeChange}>
                                        <option value=""
                                                disabled
                                                hidden>
                                            Seleccionar...
                                        </option>
                                        {this.supportedTypes.map(type => <option value={type}>{type}</option>)}
                                    </select>
                                </div>
                                {this.renderContactMediumValue()}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={this._handleClose}>
                                Cancelar
                            </button>
                            <button type="button"
                                    className="btn btn-success"
                                    onClick={this._handleSave}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
                <ModalAjaxRequest show={this.state.sendingAjaxRequest}/>
            </div>
        );
    }
}

export default ModalContactMedium;