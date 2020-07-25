import React, {Component, createRef} from "react";
import "./ClientDetails.css";
import ModalOwner from "./modals/ModalOwner";
import ModalPet from "./modals/ModalPet";
import ModalContactMedium from "./modals/ModalContactMedium";
import ModalEliminar from "./modals/ModalEliminar";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

class ClientDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            owner:{
                id:0,
                dni:0,
                name:""
            },
            pets:[{
                id: 0,
                uuid: "",
                name: "",
                photo: "",
                description: "",
                ownerId: 0
            }],
            contactMediums:[{
                id:0,
                type:"",
                value:"",
                ownerId: 0
            }],
        }
        this.modalOwner = createRef();
        this.modalPet = null;
        this.modalContactMedium = null;
        this.modalEliminar = createRef();
    }

    componentDidMount() {
        //AJAX CALL
        let ownerId = parseInt(this.props.match.params.id);
        this.fetchOwner(ownerId);
    }

    fetchOwner = ownerId => {
        fetch("http://localhost:8080/api/v1/owner/" + ownerId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(responseOwner => {
                        console.log("Success:", responseOwner)
                        this.setState({
                            owner: responseOwner
                        });
                        this.fetchPets(ownerId);
                        this.fetchContactMediums(ownerId);
                    })
                } else {
                    response.json().then(apiError => {
                        console.log("Error:", apiError)
                    })
                }
            })
            .catch(error => {
                console.error("Error:", error)
            })
    }

    fetchPets = ownerId => {
        fetch("http://localhost:8080/api/v1/pet/owner/" + ownerId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(responsePets => {
                        console.log("Success:", responsePets);
                        this.setState({
                            pets: responsePets
                        });
                    });
                } else {
                    response.json().then(apiError => {
                        console.log("Error:", apiError);
                    })
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })
    }

    fetchContactMediums = ownerId => {
        fetch("http://localhost:8080/api/v1/contactmedium/owner/" + ownerId, {
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
                    })
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })
    }

    /*In Javascript, when a function is called, its called in the scope where it was called from, not where it was written (I know, seems counter intuitive). To
     ensure it is called in the context you write it, you need to '.bind(this)'.
    Take a look at the example:
                                      function MyClass(opts){
                                      this.options = opts;

                                      return this.method1()
                                        .then(this.method2)
                                        .then(this.method3);
                                      }
    Basically, you're passing it a function reference with no context reference.
    One way functions get their context (this) is from the object on which they are invoked (which is why method1 has the right context - it's invoked on this).  You
    are passing a reference to the function itself to then. You can imagine that the implementation of then looks something like this:

                function then( callback ) {
                  // assume 'value' is the recently-fulfilled promise value
                  callback(value);
                }

    In that example callback is a reference to your function. It doesn't have any context. As you've already noted you can get around that by binding the function to
    a context before you pass it to then.
    The this context is determined in a few ways:

    » Implicitly. Calling a global function or a function without a binding assumes a global context.*
    » By direct reference. If you call myObj.f() then myObj is going to be the this context.**
    » Manual binding. This is your class of functions such as .bind and .apply. These you explicitly state what the this context is. These always take precedence over
     the previous two.

    In the example you're passing a function reference, so at it's invocation it's implied to be a global function or one without context. Using .bind resolves this by
     creating a new function where this is explicitly set.

    *This is only true in non-strict mode. In strict mode, this is set to undefined.

    **Assuming the function you're using hasn't been manually bound.*/

    setModalPetRef = (element) => {
        this.modalPet = element;
        console.log(element);
    }

    setModalContactMediumRef = (element) => {
        this.modalContactMedium = element;
    }

    // La siguiente es la forma de acceder una referencia creada directamente mediante React.createRef(). https://reactjs.org/docs/refs-and-the-dom.html
    // Inicialmente el modalOwner.current será null hasta que se cree la referencia, por lo que usarla directamente en el onClick del botón para llamar a la función
    // declarada en el modal generará el siguiente error al momento de compilar:
    //           TypeError: this.modalOwner.current is null
    // Debido a esto, el siguiente control intermedio es mandatory.
    _openModalOwner = (owner) => {
        if (this.modalOwner.current) this.modalOwner.current.openModal(owner);
    }

    // La siguiente es la forma de acceder a una referencia creada mediante una "callback ref"
    _openModalPet = (pet) => {
        if (this.modalPet) this.modalPet.openModal(pet);
        console.log(pet);
    }

    _openModalContactMedium = (contactMedium) => {
        if (this.modalContactMedium) this.modalContactMedium.openModal(contactMedium);
        console.log(contactMedium);
    }

    _openModalEliminar = (entity, entityType) => {
        let entityDataToDisplay;
        switch (entityType) {
            case "Pet": {
                entityDataToDisplay = {
                    id: entity.id,
                    UUID: entity.uuid,
                    Nombre: entity.name,
                };
                break;
            }
            case "ContactMedium": {
                entityDataToDisplay = {
                    id: entity.id,
                    Tipo: entity.type,
                    Valor: entity.value
                };
                break;
            }
        }
        if (this.modalEliminar.current) this.modalEliminar.current.openModal(entityDataToDisplay, entityType);
        console.log(entity);
    }

    appendPetToList = (newPet) => {
        let pets = [...this.state.pets, newPet];
        this.setState({pets: pets});
        console.log(pets);
    }

    modifyPetFromList = (modifiedPet) => {
        let updatedPets = this.state.pets.map(pet => pet.id === modifiedPet.id ? modifiedPet : pet);
        this.setState({pets: updatedPets});
    }

    appendContactMediumToList = (contactMedium) => {
        let contactMediums = [...this.state.contactMediums, contactMedium];
        this.setState({contactMediums: contactMediums});
        console.log(contactMediums);
    }

    modifyContactMediumFromList = (modifiedContactMedium) => {
        let updatedContactMediums = this.state.contactMediums.map(contactMedium => contactMedium.id === modifiedContactMedium.id ? modifiedContactMedium : contactMedium);
        this.setState({contactMediums: updatedContactMediums});
    }

    removeEntityFromList = (entityIdToDelete, entityType) => {
        switch (entityType) {
            case "Pet": {
                let updatedPets = this.state.pets.filter(pet => pet.id !== entityIdToDelete);
                console.log("Updated pets:", updatedPets);
                this.setState({
                    pets: updatedPets
                });
                break;
            }
            case "ContactMedium": {
                console.log("entityIdToDelete:", entityIdToDelete);
                console.log("contactMediums:", this.state.contactMediums);
                let updatedContactMediums = this.state.contactMediums.filter(contactMedium => contactMedium.id !== entityIdToDelete);
                console.log("Updated contactMediums:", updatedContactMediums);
                this.setState({
                    contactMediums: updatedContactMediums
                });
                break;
            }
        }
    }

    handleEditedOwner = (editedOwner) => {
        this.setState({owner: editedOwner}, () => console.log(this.state.owner));
    }

    render() {
        if (this.state.owner.id ===0) {
            return <h2 id="error-message">El ID especificado no corresponde a ningún cliente.</h2>
        }
        return (
            <React.Fragment>
                <div className="abm-body">
                    <div className="abm-header">
                        <h3>
                            Cliente
                        </h3>
                    </div>
                    <hr/>
                    <div className="abm-section">
                        <div className="abm-header">
                            <h4>
                                Datos personales
                            </h4>
                            <button id="add-client-button"
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => this._openModalOwner(this.state.owner)}>
                                Editar
                            </button>
                        </div>
                        <div className="abm-body">
                            <label htmlFor="">
                                DNI: {this.state.owner.dni}
                            </label>
                            <br/>
                            <label htmlFor="">
                                Nombre: {this.state.owner.name}
                            </label>
                        </div>
                    </div>
                    <hr className="short-hr"/>
                    <div className="abm-section">
                        <div className="abm-header">
                            <h4>
                                Mascotas
                            </h4>
                            <button id="add-pet-button"
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => this._openModalPet(null)}>
                                Agregar
                            </button>
                        </div>
                        <div className="abm-body">
                            <table id="pets-table"
                                   className="table">
                                <thead>
                                    <tr>
                                        <th hidden="hidden">
                                            ID
                                        </th>
                                        <th>
                                            Nombre
                                        </th>
                                        <th>
                                            UUID
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.pets.map((pet, index) => {
                                        return (
                                            <tr key={index}>
                                                <td hidden="hidden">
                                                    {pet.id}
                                                </td>
                                                <td>
                                                    {pet.name}
                                                </td>
                                                <td>
                                                    {pet.uuid}
                                                </td>
                                                <td>
                                                    <Link to={"/pet/" + pet.uuid}>
                                                        <button type="button"
                                                                className="btn btn-primary link-button">
                                                            Ver perfil
                                                        </button>
                                                    </Link>
                                                    <button type="button"
                                                            className="btn btn-warning"
                                                            onClick={() => this._openModalPet(pet)}>
                                                        Editar
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => this._openModalEliminar(pet, "Pet")}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr className="short-hr"/>
                    <div className="abm-section">
                        <div className="abm-header">
                            <h4>
                                Medios de contacto
                            </h4>
                            <button id="add-contact-medium-button"
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => this._openModalContactMedium(null)}>
                                Agregar
                            </button>
                        </div>
                        <div className="abm-body">
                            <table id="contact-mediums-table"
                                   className="table">
                                <thead>
                                    <tr>
                                        <th hidden="hidden">
                                            ID
                                        </th>
                                        <th>
                                            Tipo
                                        </th>
                                        <th>
                                            Valor
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.contactMediums.map((contactMedium, index) => {
                                        return (
                                            <tr key={index}>
                                                <td hidden="hidden">
                                                    {contactMedium.id}
                                                </td>
                                                <td>
                                                    {contactMedium.type}
                                                </td>
                                                <td>
                                                    {contactMedium.value}
                                                </td>
                                                <td>
                                                    <button type="button"
                                                            className="btn btn-warning"
                                                            onClick={() => this._openModalContactMedium(contactMedium)}>
                                                        Editar
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => this._openModalEliminar(contactMedium, "ContactMedium")}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <ModalOwner ref={this.modalOwner} handleEditedOwner={this.handleEditedOwner}/>
                <ModalPet ref={this.setModalPetRef} ownerId={this.state.owner.id} appendPetToList={this.appendPetToList} modifyPetFromList={this.modifyPetFromList}/>
                <ModalContactMedium ref={this.setModalContactMediumRef} ownerId= {this.state.owner.id} appendContactMediumToList={this.appendContactMediumToList} modifyContactMediumFromList={this.modifyContactMediumFromList}/>
                <ModalEliminar ref={this.modalEliminar} removeEntityFromList={this.removeEntityFromList} />
            </React.Fragment>
        );
    }
}

// If the component that calls Modal does not pass handleEditedOwner, the Modal won't have any effect outside itself. To fix this, warn the component to pass the
// handleEditedOwner.
ModalOwner.propTypes = {
    handleEditedOwner: PropTypes.func.isRequired,
};

ModalPet.propTypes = {
    appendPetToList: PropTypes.func.isRequired,
    modifyPetFromList: PropTypes.func.isRequired
};

ModalContactMedium.propTypes = {
    appendContactMediumToList: PropTypes.func.isRequired,
    modifyContactMediumFromList: PropTypes.func.isRequired
};

ModalEliminar.propTypes = {
    removeEntityFromList: PropTypes.func.isRequired
}

//withRouter para poder utilizar this.props.match.params para obtener el id desde la URL
export default withRouter(ClientDetails);