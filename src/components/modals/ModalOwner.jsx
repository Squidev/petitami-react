import React, {Component} from "react";
import "./ModalStyle.css";
import ModalAjaxRequest from "./ModalAjaxRequest";

class ModalOwner extends Component {

    /*Podemos manejar un form como:
    1. Controlled component: las modificaciones en los inputs se van actualizando en el state del componente, lo cual triggerea un re-renderizado del mismo que a su
     vez refleja los cambios en el mismo input.
    2. Uncontrolled component: el componente es stateless, las modificaciones en los inputs residen en el DOM, y obtenemos dichos values desde el mismo DOM utilizando
     referencias (lo cual en la React philosophy es dirty dirty).
    */
    constructor(props) {
        super(props);
        this.state = {
            activeOwner: {
                id: 0,
                dni: "",
                name: ""
            },
            showModal: false,
            sendingAjaxRequest: false,
        };
        this.API_URL = "http://localhost:8080";
    }

    componentDidMount() {
    }

    openModal = (owner) => {
        let openState;
        if (owner) {
            openState = {
                activeOwner: owner,
                showModal: true,
                sendingAjaxRequest: false,
            };
        } else {
            openState = {
                activeOwner: {
                    id: 0,
                    dni: "",
                    name: ""
                },
                showModal: true,
                sendingAjaxRequest: false,
            }
        }
        this.setState(openState, () => console.log("Show ModalOwner: " + this.state.showModal));
    }

    _handleClose = () => {
        let cleanState = {
            activeOwner: {
                id: 0,
                dni: "",
                name: ""
            },
            showModal: false,
            sendingAjaxRequest: false,
        }
        this.setState(cleanState, () => console.log("Show ModalOwner: " + this.state.showModal));
    }

    // Critical noob mistake: la biblia dice que al utilizar setState() el state es partially updated, es decir, la instrucci??n setState({showModal:true}), por ejemplo
    // modificar?? la propiedad showModal, pero dejar?? intactas al resto de las propiedades que existan.
    // En cambio, la instrucci??n:
    //              setState({
    //                  activeOwner:{
    //                      ownerDni: value
    //                  })
    // no modificar?? s??lo la propiedad ownerDni de activeOwner, sino que reemplazar?? el objeto existente en activeOwner por uno nuevo que s??lo tendr?? la propiedad
    // ownerDni. Las propiedades ownerId y ownerName ya no estar??n presentes, y cualquier intento de uso de ellas devolver?? "undefined".
    _handleDniChange = (event) => {
        this.setState({
            activeOwner:{
                id: this.state.activeOwner.id,
                dni: event.target.value,
                name: this.state.activeOwner.name
            }
        });
        console.log(event.target.value);
    }

    _handleNameChange = (event) => {
        this.setState({
            activeOwner:{
                id: this.state.activeOwner.id,
                dni: this.state.activeOwner.dni,
                name: event.target.value
            }
        });
        console.log(event.target.value);
    }

    _handleSubmit = () => {
        this.setState({
            sendingAjaxRequest: true
        })
        if (this.state.activeOwner.id === 0) {
            /*---------------AJAX POST call--------------*/
            fetch(this.API_URL + "/api/v1/owner/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.activeOwner),
            })
                .then(response => {
                    if (response.ok) {
                        // json() devuelve una promesa que ser?? resuelta una vez que la response sea parseada a json
                        response.json().then(newOwner => {
                            console.log("Success:", newOwner);
                            this.props.handleNewOwner(newOwner);
                            this._handleClose();
                        });
                    } else {
                        response.json().then(apiError => {
                            console.log(apiError.message);
                            this._handleClose();
                        })
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this._handleClose();
                });
            //alert("AJAX outgoing, boiiii");
            /*-------------------------------------------*/
        } else {
            /*---------------AJAX PUT call---------------*/
            fetch(this.API_URL + "/api/v1/owner/" + this.state.activeOwner.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.activeOwner),
            })
                .then(response => {
                    if (response.ok) {
                        // json() devuelve una promesa que ser?? resuelta una vez que la response sea parseada a json
                        response.json().then(editedOwner => {
                            console.log("Success:", editedOwner);
                            this.props.handleEditedOwner(editedOwner)
                            this._handleClose();
                        });
                    } else {
                        response.json().then(apiError => {
                            console.log(apiError.message);
                            this._handleClose();
                        })
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    this._handleClose();
                });
            //alert("AJAX outgoing, boiiii");
            /*-------------------------------------------*/
        }
    }

    render() {
        let showHideClassName = this.state.showModal ? "d-block" : "d-none";
        console.log("showHideClassName de ModalOwner: "+showHideClassName);
        console.log("ownerId de activeOwner: "+this.state.activeOwner.id);
        console.log("ownerDni de activeOwner: "+this.state.activeOwner.dni);
        console.log("ownerName de activeOwner: "+this.state.activeOwner.name);
        // La siguiente es la JS vanilla y jQuery way de abrir un modal, la cual se basa en modificar el respectivo className, toggleando entre una clase que le
        // d?? visibilidad y otra que lo oculte. En cualquiera de esos 2 estados, el modal ser?? renderizado, y si analizamos el c??digo del DOM lo encontraremos presente.
        return(
            <div className={"modal backdrop-style " + showHideClassName}
                 id="owner-modal"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel">
                                {this.state.activeOwner.id === 0 ? "Nuevo due??o" : "Editar due??o"}
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
                                <div className="form-group">
                                    <label htmlFor="owner-id-number"
                                           className="col-form-label"
                                           hidden={true}
                                    >
                                        ID:
                                    </label>
                                    {/*Tenemos 2 opciones para mostrar las propiedades actuales del owner, ya sea que estemos creando uno nuevo o modificando uno
                                     existente:
                                     1. defaultValue: esto setea un valor inicial en el value del input, que luego es modificado cuando el usuario introduce un nuevo
                                      valor. El problema que encontr?? con esta opci??n es que el defaultValue s??lo funciona al renderizarse el componente por primera vez,
                                      pero cuando se cambia el estado en el componente padre (ClientDetails) mediante setStatus, lo cual triggerea un cambio de props
                                      en la llamada al componente hijo (ModalOwner) y a su vez triggerea el re-renderizado (ojo, NO el mount, el mount se realiza
                                      una ??nica vez), el defaultValue no es actualizado, para elegir entre id=0 en caso de un owner nuevo e id=x en caso de uno
                                      existente. Seg??n los React Docs:
                                                The defaultValue and defaultChecked props are only used during initial render. If you need to update the value in a
                                                subsequent render, you will need to use a controlled component.
                                     2. value: esto setea un valor inicial y fijo, el campo queda no modificable, a menos que definamos un comportamiento para el
                                      evento onChange. Manejar el input de esta manera lo hace un controlled input, cuyo valor actual va a residir en el state, y
                                      cuyos cambios ser??n autom??ticamente re-renderizados en el DOM.
                                      WARNING: si en cualquier momento la propiedad "value" toma valor null o undefined, autom??ticamente el input se convierte en
                                      uncontrolled input (el cual se caracteriza porque su valor reside llanamente en el elemento del DOM y el mismo es consultado una
                                      vez que ya se termin?? de ingresar, generalmente antes de submitear el form), lo cual arrojar?? un error salado.
                                    */}
                                    <input readOnly={true}
                                           type="text"
                                           className="form-control"
                                           id="owner-id"
                                           value={this.state.activeOwner.id}
                                           hidden={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="owner-dni-number"
                                           className="col-form-label">
                                        DNI:
                                    </label>
                                    <input type="text"
                                           className="form-control"
                                           id="owner-dni"
                                           value={this.state.activeOwner.dni}
                                           onChange={this._handleDniChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="owner-name-text"
                                           className="col-form-label">
                                        Nombre:
                                    </label>
                                    <input type="text"
                                           className="form-control"
                                           id="owner-name"
                                           value={this.state.activeOwner.name}
                                           onChange={this._handleNameChange}
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
                                    className="btn btn-success"
                                    onClick={this._handleSubmit}>
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

export default ModalOwner;