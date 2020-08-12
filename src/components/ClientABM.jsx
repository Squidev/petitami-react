import React, {Component} from "react";
import "./ClientABM.css";
import {Link} from "react-router-dom";
import ModalOwner from "./modals/ModalOwner";
import ModalEliminar from "./modals/ModalEliminar";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

class ClientABM extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owners:[],
            dniToFilter: "",
            loadingOwners: true
        };
        this.modalOwner = null;
        this.modalEliminar = null;
        //this.API_URL = "http://localhost:8080";
        this.API_URL = "https://petitami.herokuapp.com";
    }

    componentDidMount = () => {
        //AJAX request
        fetch(this.API_URL + "/api/v1/owner/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    // json() devuelve una promesa que será resuelta una vez que la response sea parseada a json
                    response.json().then(responseOwners => {
                        console.log("Success:", responseOwners);
                        this.setState({
                            owners: responseOwners,
                            filteredByDniOwners: this.filterByDni(responseOwners, this.state.dniToFilter),
                            loadingOwners: false
                        })
                    });
                } else {
                    response.json().then(apiError => {
                        console.log(apiError.message);
                    })
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        //alert("AJAX outgoing, boiiii");
    }

    setModalOwnerRef = (element) => {
        this.modalOwner = element;
    }

    setModalEliminarRef = (element) => {
        this.modalEliminar = element;
    }

    _openModalOwner = (owner) => {
        if (this.modalOwner) this.modalOwner.openModal(owner);
    }

    _openModalEliminar = (entity, entityType) => {
        let entityDataToDisplay;
        switch (entityType) {
            case "Owner": {
                entityDataToDisplay = {
                    id: entity.id,
                    DNI: entity.dni,
                    Nombre: entity.name,
                };
                break;
            }
        }
        if (this.modalEliminar) this.modalEliminar.openModal(entityDataToDisplay, entityType);
        console.log(entity);
    }

    handleNewOwner = (newOwner) => {
        //Append to list
        let updatedOwners = [...this.state.owners, newOwner];
        this.setState({owners: updatedOwners});
        console.log(newOwner);
    }

    removeEntityFromList = (entityIdToDelete, entityType) => {
        switch (entityType) {
            case "Owner": {
                let updatedOwners = this.state.owners.filter(owner => owner.id !== entityIdToDelete);
                this.setState({owners: updatedOwners});
                break;
            }
        }
    }

    _dniChange = (event) => {
        this.setState({
            dniToFilter: event.target.value,
        })
    }

    filterByDni = (owners, dni) => {
        let ownersToShow;
        if (dni === "") {
            ownersToShow = owners;
        } else {
            ownersToShow = owners.filter(owner => owner.dni.toString().includes(dni));
        }
        return ownersToShow;
    }

    renderOwnersTableBody = () => {
        if (this.state.loadingOwners) {
            return (
                <tbody>
                    <td colSpan="3" className="loader-container">
                        <Loader type="ThreeDots" color="#AAAAAA" height="40" width="50" />
                    </td>
                </tbody>);
        }
        return (
            <tbody>
            {this.state.owners
                .filter(owner => owner.dni.toString().includes(this.state.dniToFilter))
                .map((owner, index) => {return (
                    <tr key={index}>
                        <td hidden="hidden">{owner.id}</td>
                        <td>{owner.name}</td>
                        <td>{owner.dni}</td>
                        <td>
                            <div className="buttons-container">
                                <Link to={"/e5de8b99-6195/cliente/" + owner.id}>
                                    <button type="button"
                                            className="btn btn-warning">
                                        Ver detalles
                                    </button>
                                </Link>
                                <button type="button"
                                        className="btn btn-danger"
                                        onClick={() => this._openModalEliminar(owner, "Owner")}>
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
            );})}
            </tbody>
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className="abm-container">
                    <div className="abm-header">
                        <h3>Clientes</h3>
                        <button id="add-client-button"
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this._openModalOwner(null)}>
                            Agregar
                        </button>
                        <input type="text"
                               placeholder="Filtrar por DNI"
                               onChange={this._dniChange}
                               value={this.state.dniToFilter}/>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th hidden="hidden">ID</th>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        {this.renderOwnersTableBody()}
                    </table>
                </div>

                <ModalOwner ref={this.setModalOwnerRef} handleNewOwner={this.handleNewOwner} />
                <ModalEliminar ref={this.setModalEliminarRef} removeEntityFromList={this.removeEntityFromList} />
            </React.Fragment>
        );
    }
}

export default ClientABM;

ModalOwner.propTypes = {
    handleNewOwner: PropTypes.func.isRequired
};

ModalEliminar.propTypes = {
    removeEntityFromList: PropTypes.func.isRequired
}