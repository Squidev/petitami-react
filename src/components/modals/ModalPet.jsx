import React, {Component, createRef} from "react";
import "./ModalStyle.css";
import petAvatar from "../icons/pet-avatar.png";
import ImageCropper from "../ImageCropper";
import ModalAjaxRequest from "./ModalAjaxRequest";

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
                ownerId: parseInt(this.props.ownerId)
            },
            showModal:false,
            sendingAjaxRequest: false,
        }
        this.modalImageCropper = createRef();
        //this.API_URL = "http://localhost:8080";
        this.API_URL = "https://petitami.herokuapp.com";
    }

    openModal = (pet) => {
        let openState;
        if (pet) {
            openState = {
                activePet: pet,
                showModal: true,
                sendingAjaxRequest: false
            };
        } else {
            /* Podemos trabajar con una imagen en sus 2 formas:
                    1. File: A File object inherits from Blob. In addition to Blob methods and properties, File objects also have name and lastModified properties,
                       plus the internal ability to read from filesystem. We usually get File objects from user input, like <input> or Drag’n’Drop events (ondragend).
                       Toda imagen estructuralmente es un BLOB (Binary Large Object). Cargando la imagen como file se copiará el archivo al build folder e insertará
                       links hacia él donde sea incluido.
                    2. DataURL: El contenido binario será codificado en base64, y el string resultante de esto será insertado directamente donde sea incluida
                       la imagen, por lo que no existirá un archivo por separado. Si el tamaño de la imagen es muy grande, la función que utilicemos para cargarla como
                       DataURL automáticamente la cargará como File. Este threshold en el tamaño del archivo es, por lo general, seteable.
                       Este formato no sólo se utiliza para imágenes.
                       Data URLs are composed of four parts:
                         » a prefix (data:)
                         » a MIME type indicating the type of data
                         » an optional base64 token if non-textual
                         » the data itself

                                data:[<mediatype>][;base64],<data>

                       In JavaScript there are two functions respectively for decoding and encoding base64 strings:
                       btoa(): creates a base-64 encoded ASCII string from a "string" of binary data ("btoa" should be read as "binary to ASCII").
                       atob(): decodes a base64 encoded string("atob" should be read as "ASCII to binary").

               La ventaja entre usar uno u otro:
                    A Data URL is a URI scheme that provides a way to inline data in a document as if they were external resources, and it's commonly used to embed
                    images in HTML and CSS. It is a form of file literal or here document. This technique allows normally separate elements such as images and style
                    sheets to be fetched in a single Hypertext Transfer Protocol (HTTP) request, which may be more efficient than multiple HTTP requests, and used by
                    several browser extensions to package images as well as other multimedia contents in a single HTML file for page saving.
                    Es decir, la segunda forma nos ahorra requests, al costo de incluir un paso extra de codificación/decodificación y un incremento de un 33% (propio de
                    base64) en el peso total del archivo.
                */

/*            let fileReader = new FileReader();
            fileReader.onload = (event) => {
                openState.activePet.photo = event.target.result;
            }*/
            openState = {
                activePet: {
                    id: 0,
                    uuid: "",
                    name: "",
                    photo: "",
                    description: "",
                    ownerId: parseInt(this.props.ownerId)
                },
                showModal: true,
                sendingAjaxRequest: false
            }

//            let file = new File()
            //fileReader.readAsDataURL(require("../icons/pet-avatar.png"));
        }
        this.setState(openState);
    }

    _handleClose = () => {
        let cleanState = {
            activePet:{
                id: 0,
                uuid: "",
                name: "",
                photo: "",
                description: "",
                ownerId: 0
            },
            showModal:false,
            sendingAjaxRequest: false,
        };
        this.setState(cleanState, ()=> console.log("Show ModalPet: " + this.state.showModal));
    }

    _handleSubmit = () => {
        this.setState({
            sendingAjaxRequest: true
        })
        console.log("Img:", this.state.activePet.photo);
        if (this.state.activePet.id === 0) {
            /*---------------AJAX POST call--------------*/
            fetch(this.API_URL + "/api/v1/pet/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.activePet)
            })
                .then(response => {
                    if (response.ok){
                        response.json().then(responsePet => {
                            console.log("Success:", responsePet);
                            this.props.appendPetToList(responsePet);
                            this._handleClose();
                        });
                    } else {
                        response.json().then(apiError => {
                            console.log("Error:", apiError);
                            this._handleClose();
                        });
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    this._handleClose();
                });
            //alert("AJAX outgoing, boiiii");
            /*-------------------------------------------*/
        } else {
            /*---------------AJAX PUT call---------------*/
            fetch(this.API_URL + "/api/v1/pet/" + this.state.activePet.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.activePet)
            })
                .then(response => {
                    if (response.ok){
                        response.json().then(responsePet => {
                            console.log("Success:", responsePet);
                            this.props.modifyPetFromList(responsePet);
                            this._handleClose();
                        });
                    } else {
                        response.json().then(apiError => {
                            console.log("Error:", apiError);
                            this._handleClose();
                        });
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    this._handleClose();
                });
            //alert("AJAX outgoing, boiiii");
            /*-------------------------------------------*/
        }
    }

    _handleNameChange = (event) => {
        this.setState({
            activePet:{
                id: this.state.activePet.id,
                uuid: this.state.activePet.uuid,
                name: event.target.value,
                photo: this.state.activePet.photo,
                description: this.state.activePet.description,
                ownerId: this.state.activePet.ownerId
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
                ownerId: this.state.activePet.ownerId
            }
        });
        console.log(event.target.value);
    }

    _handleSelectPetPhoto = (event) => {
        //File selected in the input, returned as a File object
        let file = event.target.files[0];
        this._openModalCropper(file);
    }

/*      El siguiente método recibe el objeto File del input, lo lee como DataURL y guarda la string base64 en el state. Queda obsoleto dado que para croppear la
        imagen cargada no es posible hacerlo en su formato codificado, por lo que deberemos croppearla ANTES de codificarla.
        _ObsoleteHandleSelectPetPhoto = (event) => {
        //File selected in the input, returned as a File object
        this.photo = event.target.files[0];
        /!*The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or
         Blob objects to specify the file or data to read.
         File objects may be obtained from a FileList object returned as a result of a user selecting files using the <input> element, from a drag and drop
         operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.*!/
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
    }*/

    _openModalCropper = (file) => {
        if (this.modalImageCropper.current) this.modalImageCropper.current.openModal(file);
    }

    setPhoto = (dataURL) => {
        let updatedPet = {...this.state.activePet, photo: dataURL};
        this.setState({
            activePet: updatedPet
        });
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
            <div className="modal backdrop-style d-block modal-backdrop modal-open"
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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="pet-id"
                                           className="col-form-label"
                                           hidden={true}>
                                        ID:
                                    </label>
                                    <input readOnly={true}
                                           type="text"
                                           className="form-control"
                                           id="pet-id"
                                           value={this.state.activePet.id}
                                           hidden={true}
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
                                    <label htmlFor="pet-description"
                                           className="col-form-label">
                                        Descripción:
                                    </label>
                                    <textarea className="form-control"
                                              id="pet-description"
                                              onChange={this._handleDescriptionChange}
                                              value={this.state.activePet.description}>
                                    </textarea>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="form-group">
                                        <label htmlFor=""
                                               className="d-flex justify-content-center col-form-label">
                                            <img id="pet-photo"
                                                 src={this.state.activePet.photo === "" ? petAvatar : this.state.activePet.photo}
                                                 height="200"
                                                 alt="Image preview..."
                                            />
                                        </label>
                                        <input type="file"
                                               className="form-control"
                                               id="pet-photo-file"
                                               accept="image/*"
                                               onChange={this._handleSelectPetPhoto}
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
                                    className="btn btn-success"
                                    onClick={this._handleSubmit}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
                <ImageCropper ref={this.modalImageCropper} src={petAvatar} setPhoto={this.setPhoto}/>
                <ModalAjaxRequest show={this.state.sendingAjaxRequest}/>
            </div>
    );}
}

export default ModalPet;