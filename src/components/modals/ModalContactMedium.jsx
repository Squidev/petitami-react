import React, {Component} from "react";

class ModalContactMedium extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeContactMedium: {
                id: 0,
                type: "",
                value: ""
            },
            showModal:false,
        };
        this.supportedTypes = [
            "Teléfono",
            "Facebook",
            "Instagram",
            "Twitter",
            "Email",
            "Dirección"
        ];
    }

    openModal = (contactMedium) => {
        let openState;
        if (contactMedium) {
            openState = {
                activeContactMedium: contactMedium,
                showModal: true
            };
        } else {
            openState = {
                activeContactMedium: {
                    id: 0,
                    type: "",
                    value: "",
                },
                showModal: true
            }
        }
        this.setState(openState, ()=> console.log("Show ModalContactMedium: " + this.state.showModal));
    }

    _handleClose = (event) => {
        let cleanState = {
            activeContactMedium:{
                id: 0,
                type: "",
                value: "",
            },
            showModal:false
        };
        this.setState(cleanState, ()=> console.log("Show ModalPet: " + this.state.showModal));
    }

    _handleSave = (event) => {
        if (this.state.activeContactMedium.id === 0) {
            /*----------------AJAX call-----------------*/
            alert("AJAX outgoing, boiiii");
            let mockResponseContactMedium = {...this.state.activeContactMedium, id: 24};
            console.log(mockResponseContactMedium);
            /*------------------------------------------*/

            this.props.appendContactMediumToList(mockResponseContactMedium);
        } else {
            /*----------------AJAX call-----------------*/
            alert("AJAX outgoing, boiiii");
            let mockResponseContactMedium = {...this.state.activeContactMedium};
            console.log(mockResponseContactMedium);
            /*------------------------------------------*/

            this.props.modifyContactMediumFromList(mockResponseContactMedium);
        }
        this._handleClose();
    }

    _handleTypeChange = (event) => {
        this.setState({
            activeContactMedium:{
                id: this.state.activeContactMedium.id,
                type: event.target.value,
                value: this.state.activeContactMedium.value
            }
        });
        console.log(event.target.value);
    }

    _handleValueChange = (event) => {
        this.setState({
            activeContactMedium:{
                id: this.state.activeContactMedium.id,
                type: this.state.activeContactMedium.type,
                value: event.target.value
            }
        });
        console.log(event.target.value);
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
                                           className="col-form-label">
                                        ID:
                                    </label>
                                    <input readOnly={true}
                                           type="text"
                                           className="form-control"
                                           id="contact-medium-id"
                                           value={this.state.activeContactMedium.id}
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
                                <div className="form-group">
                                    <label htmlFor="contact-medium-value-text"
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={this._handleClose}>
                                Cancelar
                            </button>
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={this._handleSave}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalContactMedium;