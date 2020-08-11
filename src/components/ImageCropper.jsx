import React, {Component} from "react";
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.min.css";
import "./ImageCropper.css"

// La implementación de este componente fue básicamente seguir y aplicar la documentación de este otro https://github.com/fengyuanchen/cropperjs
class ImageCropper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: this.props.src,
            imageDestination: "",
            showModal: false
        };
        this.cropper = null;
        this.imageElement = React.createRef();
    }

    componentDidMount() {
        this.cropper = new Cropper(this.imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = this.cropper.getCroppedCanvas({width: 400, height: 400});
                this.setState({ imageDestination: canvas.toDataURL("image/png") } );
            }
        });
        console.log(this.cropper);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    openModal = (file) => {
        if (file) {
            this.setState({
                imgSrc: URL.createObjectURL(file),
                showModal: true
            }, () => this.cropper.replace(this.state.imgSrc))
        }
    }

    _handleSave = () => {
        this.props.setPhoto(this.state.imageDestination);
        this.setState({
            showModal: false
        });
    }

    _handleClose = () => {
        this.setState({
            showModal:false,
        });
    }

    render() {
        let toggledClassName = this.state.showModal ? " d-block" : " d-none";
        return (
            <div className={"modal backdrop-style" + toggledClassName}
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
                                Recortar foto
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
                            <div>
                                <div className="img-container">
                                    <img ref={this.imageElement}
                                         src={this.props.src}
                                         alt="Source"
                                         crossOrigin="true"
                                    />
                                </div>
                                <img src={this.state.imageDestination}
                                     className="img-preview d-none"
                                     alt="Destination"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={this._handleClose}>
                                Cancelar
                            </button>
                            <button type="button"
                                    className="btn btn-success float-right"
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

export default ImageCropper