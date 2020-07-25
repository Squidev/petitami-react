import React, {Component} from "react";
import "./ModalStyle.css"

class ModalEliminar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entityToDelete: {},
            entityType: "",
            showModal: false
        }
    }

    openModal = (entity, entityType) => {
        let openState;
        if (entity) {
            openState = {
                entityToDelete: entity,
                entityType: entityType,
                showModal: true
            }
            this.setState(openState);
            console.log("openState:", openState);
        }
    }

    _handleClose = () => {
        let cleanState = {
            entityToDelete:{},
            showModal:false
        };
        this.setState(cleanState);
    }

    _handleSubmit = () => {
        switch (this.state.entityType) {
            case "Pet": {
                /*---------------AJAX Pet DELETE call--------------*/
                fetch("http://localhost:8080/api/v1/pet/" + this.state.entityToDelete.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Success");
                            console.log("entityToDelete.id:", this.state.entityToDelete);
                            this.props.removeEntityFromList(this.state.entityToDelete.id, this.state.entityType);
                            this._handleClose();
                        } else {
                            response.json().then(apiError => {
                                console.log("Error:", apiError);
                            })
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                //alert("AJAX outgoing, boiiii");
                /*-------------------------------------------*/
                break;
            }
            case "ContactMedium": {
                /*---------------AJAX ContactMedium DELETE call--------------*/
                fetch("http://localhost:8080/api/v1/contactmedium/" + this.state.entityToDelete.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Success");
                            console.log("entityToDelete.id:", this.state.entityToDelete.id);
                            this.props.removeEntityFromList(this.state.entityToDelete.id, this.state.entityType);
                            this._handleClose();
                        } else {
                            response.json().then(apiError => {
                                console.log("Error:", apiError);
                            })
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                //alert("AJAX outgoing, boiiii");
                /*-------------------------------------------*/
                break;
            }
            case "Owner": {
                /*---------------AJAX ContactMedium DELETE call--------------*/
                fetch("http://localhost:8080/api/v1/owner/" + this.state.entityToDelete.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Success");
                            console.log("entityToDelete.id:", this.state.entityToDelete.id);
                            this.props.removeEntityFromList(this.state.entityToDelete.id, this.state.entityType);
                            this._handleClose();
                        } else {
                            response.json().then(apiError => {
                                console.log("Error:", apiError);
                            })
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                //alert("AJAX outgoing, boiiii");
                /*-------------------------------------------*/
                break;
            }
        }

    }

    renderModalName = () => {
        switch (this.state.entityType) {
            case "Pet": return "Mascota:";
            case "ContactMedium": return "Medio de contacto:";
            case "Owner": return "Dueño:";
            default: return "";
        }
    }

    render() {
        if (!this.state.showModal) {
            return null;
        }
        return(
            <div className="modal backdrop-style d-block"
                 id="delete-modal"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel">
                                Confirmar eliminación
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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <strong>
                                    {this.renderModalName()}
                                </strong>
                                {Object.keys(this.state.entityToDelete).map((entityKey, index) => {
                                    return(
                                        <div key={index}
                                             className="form-group">
                                            <label htmlFor=""
                                                   className="col-form-label">
                                                   {entityKey}
                                            </label>
                                            <input readOnly={true}
                                                   type="text"
                                                   className="form-control"
                                                   id=""
                                                   value={this.state.entityToDelete[entityKey]}
                                            />
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={this._handleClose}>
                                Cancelar
                            </button>
                            <button type="button"
                                    className="btn btn-danger"
                                    onClick={this._handleSubmit}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalEliminar;