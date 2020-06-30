import React, {Component} from "react";
import "./ModalStyle.css";
import * as petAvatar from "../icons/pet-avatar.png";

class ModalPet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePet:{
                id: 0,
                uuid: "",
                name: "",
                photo: "",
                description: "",
                qrImage: ""
            },
            showModal:false
        }
        this.photo = null;
    }

    openModal = (pet) => {
        let openState;
        if (pet) {
            openState = {
                activePet: pet,
                showModal: true
            };
        } else {
            let fileReader = new FileReader();
            fileReader.onload = (event) => {
                openState.activePet.photo = event.target.result;
            //    this.setState(openState, ()=> console.log(this.state.activePet.photo));
            }
            openState = {
                activePet: {
                    id: 0,
                    uuid: "",
                    name: "",
                    photo: "",
                    description: "",
                    qrImage: ""
                },
                showModal: true
            }

//            let file = new File()
            //fileReader.readAsDataURL(petAvatar);
        }
        this.setState(openState);
    }

    _handleClose = (event) => {
        let cleanState = {
            activePet:{
                id: 0,
                uuid: "",
                name: "",
                photo: "",
                description: "",
                qrImage: ""
            },
            showModal:false
        };
        this.setState(cleanState, ()=> console.log("Show ModalPet: " + this.state.showModal));
    }

    _handleSave = (event) => {

        if (this.state.activePet.id === 0) {
            /*---------------AJAX POST call--------------*/
            alert("AJAX outgoing, boiiii");
            let mockResponsePet = {...this.state.activePet, id: 53, uuid: "f684-s6g4e8-6se5g1-6dr85-6dr4g"};
            console.log(mockResponsePet);
            /*-------------------------------------------*/

            this.props.appendPetToList(mockResponsePet);
        } else {
            /*---------------AJAX PUT call---------------*/
            alert("AJAX outgoing, boiiii");
            let mockResponsePet = {...this.state.activePet};
            console.log(mockResponsePet);
            /*-------------------------------------------*/

            this.props.modifyPetFromList(mockResponsePet);
        }
        this._handleClose();
    }

    _handleNameChange = (event) => {
        this.setState({
            activePet:{
                id: this.state.activePet.id,
                uuid: this.state.activePet.uuid,
                name: event.target.value,
                photo: this.state.activePet.photo,
                description: this.state.activePet.description
            }
        });
        console.log(event.target.value);
    }

    _handleDescriptionChange = (event) => {
        this.setState({
            activePet:{
                id: this.state.activePet.id,
                uuid: this.state.activePet.uuid,
                name: this.state.activePet.name,
                photo: this.state.activePet.photo,
                description: event.target.value,
            }
        });
        console.log(event.target.value);
    }

    _handleSelectPetPhoto = (event) => {
        //File selected in the input, returned as a File object
        this.photo = event.target.files[0];
        /*The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or
         Blob objects to specify the file or data to read.
         File objects may be obtained from a FileList object returned as a result of a user selecting files using the <input> element, from a drag and drop
         operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.*/
        let fileReader = new FileReader();
        //Callback para cuando fileReader termine de leer el file
        fileReader.onload = (event) => {
            let updatedPetWithPhoto = {...this.state.activePet, photo: event.target.result};
            this.setState({activePet: updatedPetWithPhoto}, ()=> console.log("Photo in base64 string format: " + this.state.activePet.photo));
        }
        // Ejecutamos la lectura del file. El siguiente método devuelve el contenido del archivo ya codificado en base64, ergo, representado por un string. Tener en
        // cuenta que el result contiene inicialmente la cabecera "data:image/jpeg;base64," por lo que si llegáramos a necesitar sólo el contenido raw deberemos
        // borrarla con algo como:
        //      str_replace("data:image/jpeg;base64,", "", event.target.result);
        fileReader.readAsDataURL(this.photo);
        console.log("Photo in File object format: ");
        console.log(this.photo);
    }

    _handleSelectQrImage = (event) => {
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
            let updatedPetWithQrImage = {...this.state.activePet, qrImage: event.target.result};
            this.setState({activePet: updatedPetWithQrImage});
        }
        fileReader.readAsDataURL(event.target.files[0]);
    }

    render() {
        console.log("petId de activePet: " + this.state.activePet.id);
        console.log("petUuid de activePet: " + this.state.activePet.uuid);
        console.log("petName de activePet: " + this.state.activePet.name);
        console.log("petDescription de activePet: " + this.state.activePet.description);
        // La siguiente es la React way de abrir un modal, la cual se basa en directamente incluirlo o no en el renderizado. Si analizamos el código del DOM cuando el
        // modal se encuentra "cerrado" ni siquiera lo encontraremos presente.
        if (!this.state.showModal) {
            return null;
        }
        return(
            <div className="modal backdrop-style d-block"
                 id="pet-modal"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel">
                                {this.state.activePet.id === 0 ? "Nueva mascota" : "Editar mascota"}
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
                                    <label htmlFor="pet-id-number"
                                           className="col-form-label">
                                        ID:
                                    </label>
                                    <input readOnly={true}
                                           type="text"
                                           className="form-control"
                                           id="pet-id"
                                           value={this.state.activePet.id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pet-uuid-text"
                                           className="col-form-label">
                                        UUID:
                                    </label>
                                    <input readOnly={true}
                                           type="text"
                                           className="form-control"
                                           id="pet-uuid"
                                           value={this.state.activePet.uuid}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pet-name-text"
                                           className="col-form-label">
                                        Nombre:
                                    </label>
                                    <input type="text"
                                           className="form-control"
                                           id="pet-name"
                                           value={this.state.activePet.name}
                                           onChange={this._handleNameChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pet-description-text"
                                           className="col-form-label">
                                        Descripción:
                                    </label>
                                    <textarea className="form-control"
                                              id="pet-description"
                                              onChange={this._handleDescriptionChange}
                                              value={this.state.activePet.description}>
                                    </textarea>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group">
                                        <label htmlFor="pet-photo-image"
                                               className="d-block col-form-label">
                                            Foto:
                                        </label>
                                        <img src={this.state.activePet.photo} height="200" alt="Image preview..."/>
                                        <input type="file"
                                               className="form-control"
                                               id="pet-photo"
                                               onChange={this._handleSelectPetPhoto}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pet-qr-image"
                                               className="d-block col-form-label">
                                            Código QR:
                                        </label>
                                        <img src={this.state.activePet.qrImage} height="200" alt="Image preview..."/>
                                        <input type="file"
                                               className="form-control"
                                               id="pet-qr"
                                               onChange={this._handleSelectQrImage}
                                        />
                                    </div>
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
    );}
}

export default ModalPet;