import React, {Component} from "react";
import "./ModalStyle.css";
import "./ModalCallLocate.css";

class ModalCallLocate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactMediumsToShow: [],
            showModal: false
        }
    }

    openModal = (contactMediums) => {
        this.setState({
            contactMediumsToShow: contactMediums,
            showModal: true
        })
    }

    _handleClose = () => {
        this.setState({
            contactMediumsToShow: [],
            showModal: false
        })
    }

    renderButtons = () => {
        return (
            <React.Fragment>
                {this.state.contactMediumsToShow.filter(cm => cm.type === "Teléfono")
                    .map(phoneCm => {
                        return (
                            <a href={'tel:' + phoneCm.value}>
                                <div style={{backgroundColor: "rgb(250,246,151)"}}
                                     className="border border-dark call-locate-button d-flex align-items-center">
                                    <p>
                                        {phoneCm.value}
                                    </p>
                                </div>
                            </a>
                        );
                    })
                }
                {this.state.contactMediumsToShow.filter(cm => cm.type === "Dirección")
                    .map(locationCm => {
                        let [textualAddress, coords] = locationCm.value.split(";;;");
                        return (
                            <a href={'https://maps.google.com/maps?q=' + coords}>
                                <div style={{backgroundColor:"rgb(250,246,151)"}}
                                     className="border border-dark call-locate-button d-flex align-items-center">
                                    <p>
                                        {textualAddress}
                                    </p>
                                </div>
                            </a>
                        );
                    })
                }
            </React.Fragment>
        );
    }

    render() {
        if (!this.state.showModal) {
            return null;
        }
        return (
            <div className="modal backdrop-style d-block"
                 id="delete-modal"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="staticBackdropLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
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
                            {this.renderButtons()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalCallLocate