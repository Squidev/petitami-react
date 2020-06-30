import React, {Component} from "react";
import "./ClientABM.css";
import {Link} from "react-router-dom";
import ModalOwner from "./modals/ModalOwner";

class ClientABM extends Component {
    state = {owners:[{}]
    };

    constructor(props) {
        super(props);
        this.modalOwner = null;
    }

    componentDidMount = () => {
        let owner1 = {  ownerId: 1,
                        ownerDni: 15487544,
                        ownerName: "Chocoperro Owner"};
        let owner2 = {  ownerId: 2,
                        ownerDni: 49781254,
                        ownerName: "Fluffy Owner"};
/*        //AJAX request
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open("GET", "localhost:8080/api/v1/owner/")
        ajaxRequest.onload = () => {
            if (ajaxRequest.status >= 200 && ajaxRequest < 400){
                this.setState({owners: JSON.parse(ajaxRequest.responseText)});
                //renderTable(this.state.owners);
            } else {
                console.log("Nos conectamos con el server, pero devolvió un error.");
            }
        }*/
        this.setState({owners:[owner1,owner2]});
    }

    setModalOwnerRef = (element) => {
        this.modalOwner = element;
    }

    _openModalOwner = (owner) => {
        if (this.modalOwner) this.modalOwner.openModal(owner);
    }

    render() {
        return (
            <React.Fragment>
                <div className="abm-body">
                    <div className="abm-header">
                        <h3>Clientes</h3>
                        <button id="add-client-button" type="button" className="btn btn-success" onClick={() => this._openModalOwner(null)}>Agregar</button>
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
                        <tbody>
                            {this.state.owners.map(owner => {return (<tr>
                                                                <td hidden="hidden">{owner.ownerId}</td>
                                                                <td>{owner.ownerName}</td>
                                                                <td>{owner.ownerDni}</td>
                                                                <td>
                                                                    <Link to={"/abm/client/" + owner.ownerId}>
                                                                        <button type="button" className="btn btn-warning">Ver detalles</button>
                                                                    </Link>
                                                                    <Link to={"/abm/client/0"}>
                                                                        <button type="button" className="btn btn-danger">Eliminar</button>
                                                                    </Link>
                                                                </td>
                                                              </tr>
                            );})}
                        </tbody>
                    </table>
                </div>

                <ModalOwner ref={this.setModalOwnerRef} />
            </React.Fragment>
        );
    }
}

export default ClientABM;