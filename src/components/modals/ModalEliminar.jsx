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
            console.log("openState: ");
            console.log(openState);
        }
    }

    _handleClose = (event) => {
        let cleanState = {
            entityToDelete:{},
            showModal:false
        };
        this.setState(cleanState);
    }

    _handleSave = (event) => {
        switch (this.state.entityType) {
            case "Pet": {
                /*---------------AJAX Pet DELETE call--------------*/
                alert("AJAX outgoing, boiiii");
                let mockResponse = true;
                console.log(mockResponse);
                /*-------------------------------------------*/
                break;
            }
            case "ContactMedium": {
                    /*---------------AJAX ContactMedium DELETE call--------------*/
                    alert("AJAX outgoing, boiiii");
                    let mockResponse = true;
                    console.log(mockResponse);
                    /*-------------------------------------------*/
                break;
            }
        }
        this.props.removeEntityFromList(this.state.entityToDelete.id, this.state.entityType);
        this._handleClose();
    }

    renderModalName = () => {
        switch (this.state.entityType) {
            case "Pet": return "Mascota:";
            case "ContactMedium": return "Medio de contacto:";
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
                            <form>
                                <strong>
                                    {this.renderModalName()}
                                </strong>
                                {Object.keys(this.state.entityToDelete).map(entityKey => {
                                    return(
                                        <div className="form-group">
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

export default ModalEliminar;