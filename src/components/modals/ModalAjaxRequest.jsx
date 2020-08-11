import React, {Component} from "react";
import Loader from "react-loader-spinner";
import "./ModalStyle.css"

class ModalAjaxRequest extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.show === false) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="modal backdrop-style d-flex align-items-center modal-backdrop modal-ajax-request"
                     tabIndex="-1"
                     role="dialog"
                     aria-labelledby="staticBackdropLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <Loader type="ThreeDots" color="#AAAAAA" height="40" width="50" />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ModalAjaxRequest;